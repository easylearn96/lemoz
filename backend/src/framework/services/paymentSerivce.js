import Stripe from "stripe";

export class StripeService {
    constructor() {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn("WARNING: STRIPE_SECRET_KEY is not defined in .env. Payment features will not work.");
            this._stripe = null;
        } else {
            this._stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        }
    }

    async createPaymentIntent(amount) {
        if (!this._stripe) throw new Error("Stripe service not initialized. Check your STRIPE_SECRET_KEY.");
        try {
            const paymentIntent = await this._stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: 'inr',
                metadata: {
                    integration: 'Car Rental',
                    purpose: 'Car Booking Payment',
                    timestamp: new Date().toISOString()
                },
                automatic_payment_methods: {
                    enabled: true
                }
            });

            return paymentIntent.client_secret;
        } catch (error) {
            console.error("Stripe createPaymentIntent Error:", error.message);
            throw new Error("Failed to create payment intent");
        }
    }
    async confirmPaymentIntent(paymentIntentId) {
        if (!this._stripe) throw new Error("Stripe service not initialized. Check your STRIPE_SECRET_KEY.");
        try {
            const paymentIntent = await this._stripe.paymentIntents.confirm(paymentIntentId);
            return paymentIntent;
        } catch (error) {
            console.error("Stripe confirmPaymentIntent Error:", error.message);
            throw new Error("Failed to confirm payment intent");
        }
    }

}
