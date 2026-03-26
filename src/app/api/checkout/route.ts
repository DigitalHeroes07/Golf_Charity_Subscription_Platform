import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const { interval } = await req.json(); // "monthly" or "yearly"
    
    // In a real implementation:
    // 1. Get the authenticated user via supabase server side component
    // 2. Map 'monthly' / 'yearly' to actual Stripe Price IDs
    
    // TODO: Map 'monthly' / 'yearly' dynamically to product definitions in database
    console.log(`Creating Stripe checkout session for: ${interval}`);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `ImpactGolf ${interval === 'monthly' ? 'Monthly' : 'Yearly'} Membership`,
            },
            unit_amount: interval === 'monthly' ? 149900 : 1499900,
            recurring: {
              interval: interval === 'monthly' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/dashboard?payment=success&plan=${interval}`,
      cancel_url: `${req.headers.get('origin')}/dashboard?payment=cancelled&plan=${interval}`,
      // metadata: { userId: user.id }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
