"use client"
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import React from 'react';
import Image from 'next/image';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MarketShare(stockData: any) {
    let actualStockData = stockData["stockData"];
    let stockLabels: any[] = [];
    let formattedStockRevenues: number[] = [];
    let chartStockData: any[] = [];
    let totalRevenue = 0;

    if (actualStockData !== undefined) {
        actualStockData.forEach((item: any) => {
            console.log(item + " " + (typeof item.FYRevenueMLN));
            if (typeof item.FYRevenueMLN == "string" && item.FYRevenueMLN !== null) {
                let FYRevenueMLN = parseFloat(item.FYRevenueMLN.replace(/,/g, ''));
                item.FYRevenueMLN = FYRevenueMLN;
            } else if (typeof item.FYRevenueMLN == "number") {
                totalRevenue += item.FYRevenueMLN;
                formattedStockRevenues.push(item.FYRevenueMLN);
            }
        });

        let stockI = 0;
        formattedStockRevenues.forEach((item: any) => {
            let revenueAsPercent = ((actualStockData[stockI].FYRevenueMLN / totalRevenue) * 100).toFixed(2);
            chartStockData.push(revenueAsPercent);
            stockLabels.push(actualStockData[stockI].stockName + " " + revenueAsPercent+ "%");
            stockI++;
        });

        const data = {
            labels: stockLabels,
            datasets: [{
            label: '',
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
                position: 'top' as const,
            },
            title: {
            display: true,
            text: 'Market Share Chart',
            },
        },
        };
        return (
            <div className='flex flex-col gap-10 justify-center items-center'>
                <h2 className='text-2xl font-bold'>Market share of {stockLabels[0]}</h2>
                <div className='w-80 h-80'>
                <Pie data={data} options={options} />
                </div>
            </div>
        );
    }
};