import Stripe from "stripe";
import { getSession } from '@auth0/nextjs-auth0';
import { unstable_cache } from "next/cache";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export default async function checkUserSubscription(revalidateSubscription: any = false) {
  const session = await getSession();
  if (!session || !session.user) {
    return false;
  }
  
  const email = session?.user.email;
  const cacheKey = `getPaidUser:${email}`;


  const cachedData = unstable_cache(
    async () => { 
    try {
      const email = session.user.email;

      // Find Stripe customer by email
      const customersWithSameEmail = await stripe.customers.search({
        query: `email:'${email}'`,
      });

      if (customersWithSameEmail.data.length === 0) {
        return false;
      }

      const customerId = customersWithSameEmail.data[0].id;

      // console.log(customerId);
      
      // Fetch active entitlements for the user
      // const activeEntitlements = await stripe.entitlements.activeEntitlements.list({
      //   customer: customerId,
      // });

      const subscriptionData = (await stripe.subscriptions.list({limit: 10})).data;

      let customerHasPaid = false;
      subscriptionData.forEach((item: any) => {
        if (item.customer == customerId) {
          console.log("Customer has subscription");
          customerHasPaid = true;
        }
      });

      if (customerHasPaid) {
        return subscriptionData.length > 0;
      }
      // return activeEntitlements.data.length > 0;
    } catch (error) {
      console.error("Error checking subscription status:", error);
      return false;
    }
  },
  [cacheKey],
      { revalidate: ((revalidateSubscription == true ? 10 : 3600 * 24 * 2)), tags: [`paidUser:${email}`] }
    )();

    return cachedData;
}
