"use client";
import { SetStateAction, useEffect, useState } from "react";
import styles from './marketShare.module.css';
import MarketShare from "./marketShareChart";

export default function MarketShareCharts() {
const [activeSlide, setActiveSlide] = useState(1);
  const [showLoader, setShowLoader] = useState(true);

  const handleSlideChange = (index: SetStateAction<number>) => {
    setActiveSlide(index);
    setShowLoader(true); // Show loader on slide change
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false); 
    }, 2000); // Hide loader after 2 seconds

    return () => clearTimeout(timeoutId);
  }, [activeSlide]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={() => handleSlideChange(1)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          1
        </button>
        <button 
          onClick={() => handleSlideChange(2)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          2
        </button>
        <button 
          onClick={() => handleSlideChange(3)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          3
        </button>
      </div>

      <div className="w-120 h-120 overflow-hidden flex flex-col justify-center items-center">
        {showLoader && (
          <div className="flex justify-center items-center h-full">
            <div className={styles.loader}></div> 
          </div>
        )}

        {activeSlide === 1 && !showLoader && <MarketShare stockData={[
    {
        "stockName": "MSFT",
        "FYRevenueMLN": 245122,
        "stockExchange": "NASDAQ"
    },
    {
        "stockName": "ORCL",
        "FYRevenueMLN": 52961,
        "stockExchange": ""
    },
    {
        "stockName": "NOW",
        "FYRevenueMLN": 8971,
        "stockExchange": ""
    },
    {
        "stockName": "FTNT",
        "FYRevenueMLN": 5305,
        "stockExchange": ""
    },
    {
        "stockName": "AXON",
        "FYRevenueMLN": 1563,
        "stockExchange": ""
    },
    {
        "stockName": "CVLT",
        "FYRevenueMLN": 839.25,
        "stockExchange": ""
    },
    {
        "stockName": "QLYS",
        "FYRevenueMLN": 554.46,
        "stockExchange": ""
    },
    {
        "stockName": "AI",
        "FYRevenueMLN": 310.58,
        "stockExchange": ""
    },
    {
        "stockName": "PRGS",
        "FYRevenueMLN": 694.44,
        "stockExchange": ""
    },
    {
        "stockName": "CRM",
        "FYRevenueMLN": 34857,
        "stockExchange": ""
    },
    {
        "stockName": "SAP",
        "FYRevenueMLN": 31207,
        "stockExchange": ""
    }
]}></MarketShare>}
        {activeSlide === 2 && !showLoader && <MarketShare stockData={[
    {
        "stockName": "V",
        "FYRevenueMLN": 35926,
        "stockExchange": "NYSE"
    },
    {
        "stockName": "MA",
        "FYRevenueMLN": 25098,
        "stockExchange": ""
    },
    {
        "stockName": "ADP",
        "FYRevenueMLN": 19203,
        "stockExchange": ""
    },
    {
        "stockName": "FI",
        "FYRevenueMLN": 19093,
        "stockExchange": ""
    },
    {
        "stockName": "PAYX",
        "FYRevenueMLN": 5278,
        "stockExchange": ""
    },
    {
        "stockName": "FIS",
        "FYRevenueMLN": 9821,
        "stockExchange": ""
    },
    {
        "stockName": "GPN",
        "FYRevenueMLN": 9654,
        "stockExchange": ""
    },
    {
        "stockName": "BR",
        "FYRevenueMLN": 6507,
        "stockExchange": ""
    },
    {
        "stockName": "JKHY",
        "FYRevenueMLN": 2216,
        "stockExchange": ""
    },
    {
        "stockName": "G",
        "FYRevenueMLN": 4477,
        "stockExchange": ""
    },
    {
        "stockName": "EXLS",
        "FYRevenueMLN": 1631,
        "stockExchange": ""
    }
]}></MarketShare>}
        {activeSlide === 3 && !showLoader && <MarketShare stockData={[
    {
        "stockName": "NVDA",
        "FYRevenueMLN": 60922,
        "stockExchange": "NASDAQ"
    },
    {
        "stockName": "AVGO",
        "FYRevenueMLN": 35819,
        "stockExchange": ""
    },
    {
        "stockName": "TXN",
        "FYRevenueMLN": 17519,
        "stockExchange": ""
    },
    {
        "stockName": "MU",
        "FYRevenueMLN": 25111,
        "stockExchange": ""
    },
    {
        "stockName": "ADI",
        "FYRevenueMLN": 12306,
        "stockExchange": ""
    },
    {
        "stockName": "MRVL",
        "FYRevenueMLN": 5508,
        "stockExchange": ""
    },
    {
        "stockName": "INTC",
        "FYRevenueMLN": 54228,
        "stockExchange": ""
    },
    {
        "stockName": "MPWR",
        "FYRevenueMLN": 1821,
        "stockExchange": ""
    },
    {
        "stockName": "MCHP",
        "FYRevenueMLN": 7634,
        "stockExchange": ""
    },
    {
        "stockName": "FSLR",
        "FYRevenueMLN": 3319,
        "stockExchange": ""
    },
    {
        "stockName": "SWKS",
        "FYRevenueMLN": 4178,
        "stockExchange": ""
    }
]}></MarketShare>}
      </div>
    </div>
  );
}