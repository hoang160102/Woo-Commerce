import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Example: handling a simple message event
    socket.on("postReview", (review) => {
      io.emit("reviewPosted", review)
    })

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event: any) {
      // Handle incoming requests for socket.io
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        // Instead of accessing peer._internal.nodeReq,
        // you can manage the connection directly.
        console.log("WebSocket connection opened:", peer.id);

        // Send a welcome message
        peer.send("Welcome to the WebSocket server!");
      }
    }
  }));
});
