"use client";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import React from 'react';
import Link from 'next/link';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MarketShare(stockData: any) {
    if (stockData !== undefined && !stockData["stockData"].includes("Error")) {
        console.log(stockData);
    let actualStockData = stockData["stockData"];
    let stockLabels: any[] = [];
    let formattedStockRevenues: number[] = [];
    let chartStockData: number[] = [];
    let totalRevenue = 0;

    if (actualStockData[0] !== undefined && (actualStockData[0].stockName !== undefined && 
        actualStockData[0].FYRevenueMLN !== undefined)) {
        actualStockData.forEach((item: any) => {
            let itemFYRevenueMLN = "" + item.FYRevenueMLN;
            console.log(item.FYRevenueMLN);
            if (item.FYRevenueMLN == null || item.FYRevenueMLN == undefined ||
                item.FYRevenueMLN == "-" ||Number.isNaN(item.FYRevenueMLN)
            ) {
                item.FYRevenueMLN = "0";
            }
            let formattedRevenue = (parseFloat(itemFYRevenueMLN.replace(/,/g, '')));
            totalRevenue += formattedRevenue;
            formattedStockRevenues.push(formattedRevenue);
        });

        let stockI = 0;
        formattedStockRevenues.forEach((item: any) => {
            console.log(item);
            if (Number.isNaN(item)) {
                item = 0;
            }
            let revenueAsPercent = ((item / totalRevenue) * 100).toFixed(2);
            chartStockData.push(parseFloat(revenueAsPercent));
            stockLabels.push(actualStockData[stockI].stockName + " " + revenueAsPercent+ "%");
            stockI++;
        });

        const data = {
            labels: stockLabels,
            datasets: [{
            label: 'Market Share',
            data: chartStockData,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 222)',
                'rgb(128, 128, 128)' 
            ],
            hoverOffset: 4
            }]
        };
        
        const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Market Share',
            },
        },
        };
        return (
            <div className='w-80 h-80'>
            <Pie data={data} />
            </div>
        );
        } else {
            let jokesOnInvesting = [
                "Why don't scientists trust atoms? Because they make up everything! ⚛️",
                "What do you call a lazy kangaroo? A pouch potato. 🦘",
                "Why don't scientists trust atoms? Because they make up everything! ⚛️",
                "What do you call a lazy kangaroo? A pouch potato. 🦘",
                "I told my wife I wanted to start investing in cryptocurrency. She said, 'That sounds risky.' I said, 'Don't worry, I'm diversifying. I'm also looking into NFTs.' 💸",
                "I tried to explain blockchain to my grandma. She just kept asking me about her bingo night. 👵",
                "Heard a rumor that Warren Buffett is buying a lot of bananas. Monkey see, monkey do! 🐒",
                "Investing in the stock market is like playing poker with professionals. You either go home broke or learn a valuable lesson. 🃏",
                "I asked my financial advisor for some investment tips. He said, 'Diversify.' I said, 'Okay, I'll buy stocks and bonds.' He said, 'No, I meant your investments, not your attention.' 📈📉",
                "My therapist said I have a gambling problem. I told him, 'But I only invest in the stock market!' He said, 'That's even worse.' 🤑",
                "I tried to explain to my dog the concept of compound interest. He just wagged his tail and asked for a treat. 🐶",
                "I told my wife I wanted to invest in a company that makes self-driving cars. She said, 'That sounds dangerous.' I said, 'Don't worry, I'll only buy the stock.' 🚗",
                "I invested all my money in a company that makes self-folding laundry. Now I'm waiting for my riches to pile up. 🧺",
                "I tried to explain to my cat the importance of long-term investing. He just looked at me with disdain and batted my hand away. 🐈",
                "I asked my friend for investment advice. He said, 'Follow the herd.' I said, 'But what if they're all running off a cliff?' 🐂",
                "I'm so bad at investing, I once tried to short-sell a lemonade stand. 🍋",
                "I told my wife I was going to invest in a company that makes anti-aging products. She said, 'That's a waste of money.' I said, 'But think of the long-term benefits!' ⏳",
                "I tried to explain to my goldfish the concept of risk and reward. He just kept swimming in circles. 🐠",
                "I invested all my money in a company that makes self-cleaning toilets. Now I'm waiting for my dividends to flush in. 🚽",
                "I tried to explain to my parrot the concept of market volatility. He just kept repeating, 'Money, money, money!' 🦜",
                "I'm so bad at investing, I once tried to buy a put option on a sinking ship. 🚢",
                "I told my wife I was going to invest in a company that makes invisibility cloaks. She said, 'That's impossible.' I said, 'That's the point!' 🔮",
                "I tried to explain to my turtle the concept of patience in investing. He just kept staring at me with his head poking out of his shell. 🐢",
                "I invested all my money in a company that makes self-lacing shoes. Now I'm waiting for my profits to tie themselves together. 👟",
                "I tried to explain to my hamster the concept of diversification. He just kept running on his wheel. 🐹",
                "I'm so bad at investing, I once tried to buy a call option on a falling leaf. 🍂",
                "I told my wife I was going to invest in a company that makes teleportation devices. She said, 'That's science fiction.' I said, 'But think of the commute!' 💫",
                "I tried to explain to my goldfish the concept of dollar-cost averaging. He just kept staring at the bubbles. 🐠",
                "I invested all my money in a company that makes self-cleaning windows. Now I'm waiting for my dividends to rain down. 🌧️",
                "I tried to explain to my cat the concept of value investing. He just looked at me and yawned. 🐈",
                "I'm so bad at investing, I once tried to buy a put option on a rising tide. 🌊",
                "I told my wife I was going to invest in a company that makes flying cars. She said, 'That's never going to happen.' I said, 'That's why it's a good investment!' ✈️",
                "I tried to explain to my dog the concept of market timing. He just kept barking at squirrels. 🐶",
                "I invested all my money in a company that makes self-watering plants. Now I'm waiting for my profits to grow on trees. 🌳",
                "I tried to explain to my parrot the concept of risk tolerance. He just kept squawking, 'Polly want a cracker!' 🦜",
                "I'm so bad at investing, I once tried to buy a call option on a dying flower. 🥀",
                "I told my wife I was going to invest in a company that makes anti-gravity shoes. She said, 'That's impossible.' I said, 'But imagine the possibilities!' 👟",
                "I tried to explain to my turtle the concept of long-term growth. He just kept slowly making his way across the floor. 🐢",
                "I invested all my money in a company that makes self-cleaning ovens. Now I'm waiting for my dividends to bake themselves. 🥧",
                "I tried to explain to my hamster the concept of portfolio rebalancing. He just kept stuffing his cheeks with food. 🐹",
                "I'm so bad at investing, I once tried to buy a put option on a rising sun. ☀️",
                "I told my wife I was going to invest in a company that makes telepathic devices. She said, 'That's crazy.' I said, 'But think of the insider trading opportunities!' 🧠",
                "I tried to explain to my goldfish the concept of asset allocation. He just kept swimming in circles. 🐠",
                "I invested all my money in a company that makes self-driving lawnmowers. Now I'm waiting for my profits to mow themselves."];
    
                let randomJoke = Math.floor(Math.random() * jokesOnInvesting.length);
                console.log();
                
                return (
                    <>
                        <div className='flex flex-col gap-2 items-center justify-center'>
                            <div className='bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded outline-none flex justify-center items-center'>
                                {jokesOnInvesting[randomJoke]} -
                                Sorry, the stock doesn't exist!
                            </div>
                            <Link href="/dashboard/marketShare" className='bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded outline-none flex justify-center items-center w-fit'>Try again</Link>
                        </div>
                    </>
                )
        }
    }
};