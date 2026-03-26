import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('Stripe secret key is missing. Ensure STRIPE_SECRET_KEY is defined in environment variables.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  // @ts-ignore - Stripe NPM modules strictly lock union api versions. Ignore to support local compilation.
  apiVersion: '2023-10-16',
  typescript: true,
  appInfo: {
    name: 'Golf Charity Subscription Platform',
    version: '1.0.0',
  },
});
