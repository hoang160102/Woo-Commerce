import Stripe from "stripe";
import { defineEventHandler, readRawBody, H3Event } from 'h3';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export default defineEventHandler(async (event: H3Event) => {
  const rawBody = await readRawBody(event);
  const sig = event.req.headers['stripe-signature'];

  try {
    const webhookEvent = stripe.webhooks.constructEvent(
      rawBody!,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    if (webhookEvent.type === 'checkout.session.completed') {
      const session: any = webhookEvent.data.object as Stripe.Checkout.Session;
      // Assuming you have a way to associate the Stripe session with a user
      const items = JSON.parse(session.metadata.items)
      console.log(items)
      const cartId = session.metadata.cartId; 
      await $fetch(`/api/cart/${cartId}`, {
        method: 'delete'
      })
    //   const response: any = await $fetch(`/api/products/${items.id}`, {
    //     method: 'put'
    //   })
    }

    return { received: true };
  } catch (err) {
    console.error('Error processing webhook:', err);
    throw new Error('Webhook Error');
  }
});