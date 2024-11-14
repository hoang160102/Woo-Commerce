import Stripe from "stripe";
import { defineEventHandler, readBody } from "h3";
import Product from "~/models/Product.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const items = body.items;
  const shippingPrice = body.shippingPrice;
  let shipping = "";
  if (shippingPrice === 10) {
    shipping = "Standard Shipping";
  } else {
    shipping = "Express Shipping";
  }
  const products = await Product.find();
  const itemProducts = items.map((item: any) => {
    const product = products.find((prod: any) => {
      return prod["_id"].toString() === item.id;
    });
    return {
      ...item,
      imageUrl: product?.product_images[0],
      name: product?.name,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: itemProducts.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: `Size: ${item.size}, Color: ${item.color}`,
            images: [item.imageUrl],
          },
          unit_amount: Math.round((item.price - item.price * item.sale / 100) * 100),
        },
        quantity: item.qty,
      })),
      mode: "payment",
      metadata: {
        cartId: body.cartId,
        items: JSON.stringify(itemProducts.map((item: any) => ({ id: item.id, qty: item.qty })))
      },
      success_url: `${process.env.BASE_URL}/checkout/success`,
      cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingPrice * 100, // Also in cents
              currency: "usd",
            },
            display_name: shipping,
          },
        },
      ],
    });
    return {
      url: session.url,
    };
  } catch (error) {
    console.error("Stripe checkout session creation error:", error);
    throw error;
  }
});
