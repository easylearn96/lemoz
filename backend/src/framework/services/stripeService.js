import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

export class StripeService {
  async createPaymentIntent(amount) {
    console.log(amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount:Math.round(amount * 100), 
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });
   console.log(paymentIntent.client_secret,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    return paymentIntent.client_secret
  }
}
