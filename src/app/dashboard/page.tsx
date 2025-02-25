'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';
import Stripe from 'stripe';
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { redirect } from 'next/navigation';
import Link from 'next/link';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || ""); // Use environment variable

export default function Page() {
    const { user, error, isLoading } = useUser();
    const [isPaidUser, setIsPaidUser] = useState(false);

    useEffect(() => {
      async function fetchSubscriptionStatus() {
        const response = await fetch("/api/update-subscription-status");
        const data = await response.json();
        setIsPaidUser(data.isPaidUser);
      }
      
      fetchSubscriptionStatus();
    }, []);

    if (!user) {
        redirect("/api/auth/login");
        return null; // Important: Add a return statement to prevent further execution
    }

    if (isLoading) {
      return <div>Loading...</div>; // Display a loading message while user is loading
    }

    if (error) {
      return <div>Error: {error.message}</div>; // Display error message if any
    }

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Hello {user.name}!</h2>
            {isPaidUser ? (
                <Link href={"/dashboard/marketShare"} className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded outline-none">
                    Market Share Chart
                </Link>
            ) : (
                <p>You need a premium subscription to access the Market Share Chart.</p>
            )}
        </>
    );
}