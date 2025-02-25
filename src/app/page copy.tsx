"use client";

import Image from "next/image";
import MarketShare from "./marketShareChart";
import MarketShareCharts from "./marketShareCharts";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-60">

      <div className="max-w-lg text-center p-10 flex justify-center items-center gap-10 flex-col">
        <div className="flex items-center justify-center gap-5 flex-col">
            <MarketShareCharts></MarketShareCharts>
        </div>

        <h1 className="text-4xl font-bold mb-4">Market Share Visualizer</h1>
        <h1 className="text-2xl">🔥 "Stop Guessing. See Market Share Like Never Before."</h1>
        <p className="mb-6">Get early access to our interactive market share tool.</p>
        <h2>Built by a 17-year-old investor & entrepreneur</h2>

        <Link key={"redirectToDashboard"} href="dashboard"
      className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded outline-none">
        Access app!
      </Link>
      </div>

      <div className="text-center w-8/12">
        <h1 className="text-2xl">🔎 How It Works </h1>
        <div className="flex md:flex-row flex-col gap-20">
          <div className="bg-blue-600 text-white rounded-3xl
          hover:bg-blue-700 px-10 py-20 hover:cursor-pointer">
            1. 🔎 Search for a Company - Enter <strong><b>any</b></strong> stock ticker or name.
          </div>
          <div className="bg-green-600 text-white rounded-3xl
          hover:bg-green-700 px-10 py-20 hover:cursor-pointer">
          <p>2. 📊 See Competitor Insights - Get a <strong><b>clean, interactive</b></strong> market share chart.</p>
          </div>

          <div className="bg-yellow-600 text-white rounded-3xl
          hover:bg-yellow-700 px-10 py-20 hover:cursor-pointer">
          <p>3. 🚀 Make Smarter Decisions - Understand trends in <strong><b>seconds.</b></strong></p>
          </div>
        </div>
      </div>

      <div className="max-w-lg text-center flex items-center justify-center flex-col gap-20">
        <h1>Why It's Different</h1>
        <ul>
          <li>
          <h1 className="md:text-3xl text-lg font-bold mb-4">❌ No more confusing charts</h1>
          </li>
          <li>
          <h1 className="md:text-3xl text-lg font-bold mb-4">✅ Simple, clear, and interactive visualizations</h1>
          </li>
          <li>
          <h1 className="md:text-3xl text-lg font-bold mb-4">📊 Compare any company vs. its competitors instantly</h1>
          </li>
          <li>
          <h1 className="md:text-3xl text-lg font-bold mb-4">🎯 Built for investors who hate boring data</h1>
          </li>
        </ul>
        
        <h2>
          Made by a 17-year old investor and entrepreneur, who made a humorous newsletter on investing with 1,200 subs.
        </h2>
        <h1>Proof I have a sense of humour:</h1>

        <Image
        alt="Great writeup. McDonald's racist." 
        width={350} // Adjust width as needed
        height={350}
        src="/comment1.png">
        </Image>

        <Image
        alt="Ojk. I think that makes sense hahaha" 
        width={450} // Adjust width as needed
        height={450}
        src="/comment2.jpg">
        </Image>

        <Image
        alt="I'll take it! I see your vision. Make it more digestible and understandable for us." 
        width={450} // Adjust width as needed
        height={450}
        src="/comment4.jpg">
        </Image>
      </div>

      <div className="max-w-lg flex items-center justify-center flex-col">
        <h1>Don't wait - become an ambassador of simple charts today!</h1>
        <h2>🚀 Access now!</h2>
        <form action="https://formspree.io/f/mzzdappl" method="POST" className="space-y-4">
          <input type="email" name="email" placeholder="Enter your email" required className="w-full p-3 rounded-lg text-black" />
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
            Join the conscious investors!
          </button>
        </form>
      </div>
      
      <div className="max-w-lg flex items-center justify-center flex-col p-10">
        <h2>Check out solutions for your problems:</h2>
        <a href="https://monopolisticinvestor.substack.com/">
          <h2>Monopolistic Investor</h2>
            <Image 
              src="/newsletter_logo.svg" 
              alt="Newsletter Logo" 
              width={150} // Adjust width as needed
              height={150} // Adjust height as needed 
            />
        </a>
      </div>
    </div>
  );
}
