import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { supabase } from '@/lib/supabase/client';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!endpointSecret) throw new Error('Missing webhook secret');
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // We would normally extract the userId from session.metadata or client_reference_id
      // const userId = session.metadata?.userId;
      // if (userId) {
      //   await supabase.from('users').update({ 
      //     subscription_status: 'active',
      //     stripe_customer_id: session.customer as string
      //   }).eq('id', userId);
      // }
      
      console.log('Checkout Session Completed:', session.id);
      break;

    case 'customer.subscription.deleted':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      // Update db status based on subscription.status ('active', 'past_due', 'canceled')
      console.log('Subscription Updated/Deleted:', subscription.id);
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
