import checkUserSubscription from "./check";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const isPaidUser = await checkUserSubscription();

    return new Response(JSON.stringify({ isPaidUser }), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to check subscription" }), { status: 500 });
  }
}