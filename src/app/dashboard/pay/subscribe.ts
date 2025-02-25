"use server";
// Import required packages

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

// Function to register a user
export const registerUser = async () => {
  // Get user's email from session
  const session = await getSession();
  const user = session?.user;
  if (!session || !session.user) {
    return false;
  }

  if (!user || !user.email) {
    console.error("Failed to retrieve user email from session");
    return; // Handle error (e.g., redirect to login)
  }
  const email = user.email;

    // Check for existing Stripe customer with the same email
    const customersWithSameEmail = await stripe.customers.search({
      query: `email:\'${email}\' `,
    });
    const customersResult = customersWithSameEmail.data;

    if (customersResult.length > 0) {
      console.log("User exists");
      // Existing customer found: Use their ID for checkout session
      const customerId = customersResult[0].id;

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        success_url: 'https://market-share-chart.sketchthread.com/dashboard/successPayment',
        line_items: [
          {
            price: 'monthly9eur',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer: customerId,
        subscription_data: {
          trial_period_days: 1,
        },
      });

      if (session !== undefined) {
        // Redirect to the Stripe checkout URL (only after session creation)
        redirect(session.url || ""); 
      }
    } else {
      // New customer
      const customer = await stripe.customers.create({
        email: email,
      });

      const customerId = customer.id;

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        success_url: 'https://market-share-chart.sketchthread.com',
        line_items: [
          {
            price: 'monthly9eur',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer: customerId,
        subscription_data: {
          trial_period_days: 30,
        },
      });

      if (session !== undefined) {
        // Redirect to the Stripe checkout URL (only after session creation)
        redirect(session.url || ""); 
      }
    }
};