import { useEffect, useState } from "react";
  
let investorJokes = [
  "Why did the investor take a nap? He wanted to sleep on his investments!",
  "What’s a stockbroker’s favorite snack? Buy-low sandwiches!",
  "Why did the business student bring a ladder to class? He wanted to climb the corporate ladder!",
  "What do you call a dinosaur that invests? A Tyrannosaurus Stocks!",
  "Why did the piggy bank go to therapy? It had too many withdrawals!",
  "What’s the richest fish in the sea? A goldfish!",
  "Why don’t bankers ever get lost? They always follow the interest rates!",
  "Why was the entrepreneur always calm? Because he had capital control!",
  "What did the dollar bill say to the coin? ‘You make no cents!’",
  "Why did the bank teller get promoted? She had a lot of interest in her work!",
  "What do you call a group of investors at a party? A bull market!",
  "Why did the money go to school? To make more cents!",
  "Why did the investor open a bakery? He wanted to make some dough rise!",
  "What did the penny say to the dollar? ‘You make me feel so small!’",
  "Why did the computer invest in the stock market? It wanted better ‘returns’!",
  "What do you call an alligator who invests? An investa-gator!",
  "Why did the apple invest in stocks? It wanted to grow its core business!",
  "What’s an investor’s favorite type of dog? A Bull-dog or a Bear-dog!",
  "Why did the vending machine invest in stocks? It wanted to see more returns!",
  "What did the entrepreneur say when his startup failed? ‘Well, that was an *interest*ing experience!’"
];

export default function InvestorJokes({ keepShowingInvestingJokes }: { keepShowingInvestingJokes: boolean }) {
    const [currentJoke, setCurrentJoke] = useState(investorJokes[0]);
  
    useEffect(() => {
      if (!keepShowingInvestingJokes) return; // Stop updating jokes when isLoadingPayment becomes false
  
      const jokeInterval = setInterval(() => {
        const randomJoke = investorJokes[Math.floor(Math.random() * investorJokes.length)];
        setCurrentJoke(randomJoke);
      }, 5000); 
  
      return () => clearInterval(jokeInterval); // Cleanup interval on unmount
    }, [keepShowingInvestingJokes]);
  
    return (
      <div className="text-center mt-4">
        <h2>{currentJoke}</h2>
      </div>
    );
}
  