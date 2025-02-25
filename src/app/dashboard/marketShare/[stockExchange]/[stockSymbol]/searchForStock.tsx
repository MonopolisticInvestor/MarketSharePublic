import { unstable_cache } from "next/cache";

export default async function searchForStockExchangeAndName(stock: string) {
  let cacheKey = `stockNameAndExchange_search:${stock}`;

  console.log("Checking for stock - 2");

  let api = `https://api.stockanalysis.com/api/search?q=${stock}`;

  const cachedData = unstable_cache(
    async () => {
      try {
        // Use fetch API to make a GET request
        const response = await fetch(api);
    
        // Check the response status
        if (!response.ok) {
          throw new Error(`Error fetching stock data: ${response.status}`);
        }
    
        // Parse the response as JSON
        const dataResponse = await response.json();
    
        let firstResult = dataResponse.data[0];
        
        console.log(firstResult);
        const stockExchange = firstResult.s.substring(0, firstResult.s.indexOf('/')); 
        const stockSymbol = firstResult.s.substring(firstResult.s.lastIndexOf('/') + 1); 
        const stockCompanyName = firstResult.n;
    
        console.log(stockExchange + " " + stockSymbol + " " + stockCompanyName);

        return (
          {
            "stockExchange": stockExchange,
            "stockSymbol": stockSymbol,
            "stockCompanyName": stockCompanyName
          }
        )
      } catch (error) {
        console.error(error);
      }  
    },
    [cacheKey],
    { revalidate: (10), tags: [`stockNameAndExchange_search:${stock}`] }
  )();

  return cachedData;
}