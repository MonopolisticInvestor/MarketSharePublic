import MarketShare from "./marketShareChart";
import { getMarketShareData } from "./stockData";

export default async function Page({
params,
  }: {
    params: Promise<{stockSymbol: string, stockExchange: string}>
}) {
    if (params !== undefined) {
        console.log(params);
        const stockSymbol = (await params).stockSymbol;
        const stockExchange = (await params).stockExchange;

        let fetchedMarketShareData = await getMarketShareData(stockSymbol, stockExchange, "");
        console.log(stockExchange + " " + stockSymbol);

        return (
            <MarketShare stockData={fetchedMarketShareData}></MarketShare>
        )
    }
}