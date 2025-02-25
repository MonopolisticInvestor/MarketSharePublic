"use server";

interface StockData {
  stockName: string;
  FYRevenueMLN: any;
  stockExchange: any;
}

const cheerio = require('cheerio');
import { unstable_cache } from 'next/cache'
import searchForStockExchangeAndName from './searchForStock';

export const getCompetitors = async (stockName: string, stockExchange: string) => {
  let stockCompanyName = "";
  const cacheKey = `get-competitors2:${stockExchange}:${stockName}`;

  console.log("Getting competitors");
  const cachedData = unstable_cache(
    async () => {
      try {
        let competitorsResult1;
        let checkedFirstResult = false;

        console.log("stockCompanyName: " + stockCompanyName);
         
        const url = `https://www.marketbeat.com/stocks/${stockExchange}/${stockName}/competitors-and-alternatives/`;

        const response = await fetch(url);
        const html = await response.text();
        const $ = await cheerio.load(html);
        const table = await $("#competitors-table");
        const rows = table.find('tr');

        let competitors: string[] = []; 

        rows.each((index: any, row: any) => {
          const rowData: any[] = [];
          $(row).find('td').each((i: any, cell: any) => { 
            const tickerArea = $(cell).find('.ticker-area');
            if (tickerArea.length > 0) {
              rowData.push(tickerArea.text().trim()); 
            }
          });

          if (rowData.length > 0 && rowData[0] && rowData[0] !== stockName) { 
            competitors.push(rowData[0]); 
          }
        });

        competitorsResult1 = competitors;

        console.log("competitors result 1: " + competitorsResult1);

        checkedFirstResult = true;

        const competitorDataPromises = await competitors?.map(async (competitor) => {
          const stockCompetitorData = await searchForStockExchangeAndName(competitor);
          let searched_stockExchange = await stockCompetitorData?.stockExchange;
          let searched_stockName = await stockCompetitorData?.stockCompanyName;
          let searched_stockSymbol = await stockCompetitorData?.stockSymbol;
  
          return {
            "stockCompanyName": searched_stockName,
            "stockExchange": searched_stockExchange,
            "stockName": searched_stockSymbol 
          };
        });
  
        const competitorData = await Promise.all(competitorDataPromises);

        console.log("competitors result 1: " + competitorData);
        if (checkedFirstResult == true && (competitorsResult1.length == 0 || stockCompanyName !== "")) {
          const url2 = "https://www.obermatt.com/en/stocks/stock-research-home.html";

          try {
            const response = await fetch(url2);

            const html = await response.text();

            const $ = await cheerio.load(html);

            // Select the container div using its class
            const containerDiv = await $('div.container'); // Adjust the selector if needed

            if (containerDiv) {
              console.log("Found list of stocks");
              // Extract anchor elements within the container
              const stockLinks = await containerDiv.find('a');

              console.log("StockLinks: " + typeof stockLinks);

              let stockLinkText = "";
              let stockLinkHref = "";
              containerDiv.find('a').each((_: any, element: any) => {
                const text = $(element).text().trim();
                if (text.includes(stockCompanyName)) {
                  stockLinkText = text;
                  stockLinkHref = $(element).attr('href');
                  return false; // Exit the loop after finding the first match
                }
              });

              let countOfI = 0;
              let changedStockLink = "";
              for (let i = 0; i < stockLinkHref.length; i++) {
                if (stockLinkHref[i] == "/") {
                  countOfI++;
                }
                if (countOfI == 3)  {
                  changedStockLink = stockLinkHref.substring(0, i + 1);
                }
              }

              changedStockLink += "/similar-stocks.html"

              console.log("changedStockLink: " + changedStockLink);

              let stockCompetitorsData2 = await getStockCompetitors2(changedStockLink);

              console.log("stockCompetitors: " + stockCompetitorsData2);
              
              if (stockCompetitorsData2 !== undefined) {
                console.log("Getting stockExchange data for each competitor");
              
              const competitorDataPromises = await stockCompetitorsData2?.map(async (competitor) => {
                const stockCompetitorData = await searchForStockExchangeAndName(competitor);
                let searched_stockExchange = await stockCompetitorData?.stockExchange;
                let searched_stockName = await stockCompetitorData?.stockCompanyName;
                let searched_stockSymbol = await stockCompetitorData?.stockSymbol;
        
                return {
                  "stockCompanyName": searched_stockName,
                  "stockExchange": searched_stockExchange,
                  "stockName": searched_stockSymbol 
                };
              });
        
              const competitorData = await Promise.all(competitorDataPromises);console.log("getCompetitors: CompetitorsData2: " + competitorData);
              if (competitorData !== undefined && competitorData.length > 0) {
                console.log("Returning not an empty competitor list");
                return competitorData;
              }
            } else {
              console.log("getCompetitors: CompetitorsData2: " + competitorData);

              console.log("Fetching competitors - 3")
              const url3 = `https://stockanalysis.com/quote/${stockExchange}/${stockName}/revenue/`;

              const response = await fetch(url3);
              const html = await response.text();
              const formattedHTML = await cheerio.load(html.toString(), {
                recognizeSelfClosing: true
              });
            
              const relatedStocksHeader = await formattedHTML("h3.mb-2");
              const siblings = relatedStocksHeader.siblings();

              const container = relatedStocksHeader.closest('div'); 
              const table = container.find('table'); 

              // siblings.each((i: any, item_E: any) => {
              //   console.log(formattedHTML(item_E).html());
              // });
            
              // // Check if table is found
              if (!table.length) {
                console.log("Table not found for the given URL.");
                return ["Error finding stock"];
              }
            
              const rows = table.find('tr');
              const competitorLinks = [];
            
              for (let i = 1; i < rows.length; i++) { 
                const companyCell = rows.eq(i).find('td:nth-child(1)'); 
                const link = companyCell.find('a').attr('href'); 
            
                if (link) {
                  const linkParts = link.split('/');
                  let stockName = '';
                  let stockExchange = '';
            
                  if (linkParts[1] === 'stocks') {
                    stockName = linkParts[2]; 
                  } else if (linkParts[1] === 'quote') {
                    stockExchange = linkParts[2]; 
                    stockName = linkParts[3]; 
                  }
            
                  competitorLinks.push({
                    "stockName": stockName, 
                    "stockExchange": stockExchange 
                  });
                }
              }

              console.log(competitorLinks);

              return competitorLinks;
              }
              
            }
          } catch (error2) {
            console.log(error2);
          }
        } else {
          return competitorData;
        }
        } catch (error) {
          console.log(error);
        }
        },
      [cacheKey],
      { revalidate: (3600 * 24 * 30), tags: [`competitors2:${stockExchange}:${stockName}`] }
    )(); 

  return cachedData;
};


// add a stockExchange parameter, so that a user can access non US-based companies
export const getFYRevenue = async (stockName: string, stockExchange: string) => {
  console.log(`getFYRevenue for  ${stockExchange}:${stockName}`);

  if (stockExchange == "") {
    console.log("StockExchange is empty");
  }

  const cacheKey = `getFYRevenue:${stockExchange}:${stockName}`;

  const cachedData = unstable_cache(
    async () => { 
      if (stockExchange == "" || stockExchange.toUpperCase() == "NYSE" || stockExchange.toUpperCase() == "NASDAQ") {
        try {
          const url = `https://stockanalysis.com/stocks/${stockName}/financials/`;

          const response = await fetch(url);
  
          const html = await response.text();
  
          const $ = await cheerio.load(html);
  
          const table = $("#main-table");
  
          const rows = table.find('tr'); // Select all table rows
  
          const data: any[][] = [];
          rows.each((index: any, row: any) => {
            const rowData: any[] = [];
            $(row).find('td').each((i: any, cell: any) => { 
              rowData.push($(cell).text().trim()); 
            });
            data.push(rowData);
          });
  
          let FYRevenueMLN_text = "";
          let FYRevenueMLN_N = 0;
  
          if (data !== undefined) {
             data.forEach((item) => {
              if (item[0] == "Revenue" || item[0] == "Total Revenue") {
                console.log(item);
              }
              
              if (item[0] !== undefined && (item[0] == "Revenue" 
                || item[0] == "Total Revenue" || item[0].includes("Total Revenue"))) {
                  console.log(stockName + ": " + item[0] + " " + item[2]);
                FYRevenueMLN_text = item[2];
              }
            });
  
            FYRevenueMLN_N = parseFloat(FYRevenueMLN_text?.replace(/,/g, ''));
  
            return FYRevenueMLN_N;
          } else {
            return "N/A";
          }
        } catch (error) {
          console.log(error);
          return "N/A";
        }
        } else {
        try {
          const url = `https://stockanalysis.com/quote/${stockExchange}/${stockName}/financials/?p=trailing`;

          const response = await fetch(url);

          const html = await response.text();

          const $ = await cheerio.load(html);

          const table = $("#main-table");

          const rows = table.find('tr'); // Select all table rows

          const data: any[][] = [];
          rows.each((index: any, row: any) => {
            const rowData: any[] = [];
            $(row).find('td').each((i: any, cell: any) => { 
              rowData.push($(cell).text().trim()); 
            });
            data.push(rowData);
          });

          let FYRevenueMLN_text = "";
          let FYRevenueMLN_N = 0;

          if (data !== undefined) {
              data.forEach((item) => {
              if (item[0] == "Revenue" || item[0] == "Total Revenue") {
                console.log(item);
              }
              
              if (item[0] !== undefined && (item[0] == "Revenue" 
                || item[0] == "Total Revenue" || item[0].includes("Total Revenue"))) {
                  console.log(stockName + ": " + item[0] + " " + item[2]);
                FYRevenueMLN_text = item[2];
              }
            });

            FYRevenueMLN_N = parseFloat(FYRevenueMLN_text?.replace(/,/g, ''));

            if (FYRevenueMLN_N == null || FYRevenueMLN_N == undefined) {
              return 0;
            } else {
              return FYRevenueMLN_N;
            }
          }
          
          } catch (error) {
            return "N/A";
          }
      }
    },
      [cacheKey],
      { revalidate: (3600 * 24 * 30), tags: [`FYRevenue:${stockExchange}:${stockName}`] }
    )();

    return cachedData;
}
export const getStockCompetitors2 = async (changedStockLink: string) => {
  try {
    const response2 = await fetch("https://www.obermatt.com" + changedStockLink);

    const html = await response2.text();

    const $ = await cheerio.load(html);

    const [tableWrapper ,table] = await Promise.all([
      $(".container_table"),
    $(".stock")]);

    const rows = table.find('tr'); // Select all table rows

    const data: any[][] = [];
    rows.each((index: any, row: any) => {
      if (index < 30) {
        const rowData: any[] = [];
        $(row).find('td').each((i: any, cell: any) => { 
          rowData.push($(cell).text().trim()); 
        });
        data.push(rowData);
        index++;
      }
    });

    let industryText = "";
    if (tableWrapper.length > 0) {
      tableWrapper.find('p').each((index: any, element: any) => {
        if ($(element).text().toLowerCase().includes('industry')) {
          industryText = $(element).html(); 

          console.log("industryText: " + industryText);
          return false;
        }
      });

      let industry = getIndustry(industryText);

      console.log("Industry: " + industry);

      let competitors: any[] = [];
      
      let dataAmount = data.length;

      for (const item of data) {
        console.log(item[0]);
        if (item[0] !== undefined && item[0].includes(industry)) {
          let indexOfNumber = item[0].indexOf(".");
          let indexOfSecondSpace = 0;
          let countOfSpaces = 0;

          for (let i = indexOfNumber; i < item[0].length; i++) {
            if (item[0][i] == " ") {
              countOfSpaces++;

              if (countOfSpaces == 2) {
                indexOfSecondSpace = i;
                break;
              }
            }
          }

          let formattedCompetitorName = item[0].substring(indexOfNumber + 1, indexOfSecondSpace).trim();
          console.log("formattedCompetitorName: " + formattedCompetitorName); // Log here
          competitors.push(formattedCompetitorName);
        }
      }

      console.log("Returning the competitors");

      // Create a Set to store unique values
      const uniqueSet = new Set(competitors);

      // Convert the Set back to an array - all repeat competitor stocks are removed
      const uniqueCompetitors = Array.from(uniqueSet);

      console.log(uniqueCompetitors);
      return uniqueCompetitors;
    }
  } catch (error) {
    console.log(error);
    return ([
      "Can't find industry"
    ]);
  }
}

function getIndustry(industryText: string) {
  // Find the start of the industry name
  const startIndex = industryText.indexOf("industry, "); 

  if (startIndex !== -1) {
    // Get the substring from "industry, " to the end of the sentence
    const industrySubstring = industryText.substring(startIndex + "industry, ".length); 

    // Find the end of the industry name (usually before the comma or the end of the string)
    const endIndex = industrySubstring.indexOf(","); 
    const endIndex2 = industrySubstring.indexOf("."); 

    let end = endIndex !== -1 ? endIndex : endIndex2; 

    if (end !== -1) {
      return industrySubstring.substring(0, end).trim(); 
    } else {
      return industrySubstring.trim(); 
    }
  } else {
    return ""; 
  }
}

export const getValuationMetrics = async (stockName: string, stockExchange: string) => {
  const cacheKey = `getValuationMetrics:${stockExchange}:${stockName}`;
  const cachedData = unstable_cache(
    async () => { 
      const url = `https://stockanalysis.com/stocks/${stockName}/financials/ratios/`;

      try {
        const response = await fetch(url);

        const html = await response.text();

        const $ = await cheerio.load(html);

        const marginsH2 = $('h2:contains("Valuation Ratios")');

        let PE;
        let PE_forward;
        let PS;
        let PS_forward;

        // If the h2 element is found, proceed to find the statistics table
        if (marginsH2.length) {
          const parent = marginsH2.parent();

          // Check if a statistics table is found next to the h2
          const table = parent.find('table.w-full[data-test="statistics-table"]'); 

          if (table.length > 0) {
            const rows = table.find('tr');
            const data: any[][] = []; 

            rows.each((index: any, row: any) => {
              const rowData: any[] = [];
              $(row).find('td').each((i: any, cell: any) => { 
                rowData.push($(cell).text().trim()); 
              });
              data.push(rowData);
            });

            if (data !== undefined) {
              data.forEach((item) => {
                if (item[0] == "PE Ratio") {
                  PE = item[1];
                } else if (item[0] == "Forward PE"){
                  PE_forward = item[1];
                } else if (item[0] == "PS Ratio") {
                  PS = item[1];
                } else if (item[0] == "Forward PS") {
                  PS_forward = item[1];
                }
              });

              console.log("Found PE and PS");

              return {
                "PE": PE,
                "PE_forward": PE_forward,
                "PS": PS,
                "PS_forward": PS_forward
              }
            } else {
              console.log("Can't find PE and PS");
              return "Can't find PE or PS";
            }
            
          } else {
            console.log("Valuation statistics table not found next to Margins h2.");
          }
        }
      } catch (error) {
        console.log(error);
        return [`Error_Fetching_valuation_Metrics`]; 
      }
    },
    [cacheKey],
    { revalidate: (3600 * 24), tags: [`ValuationMetrics:${stockExchange}:${stockName}`] }
  )();

  return cachedData;
};

// export async function getMarketShareData(stockName: string, stockExchange: string) {
//   let competitors = await getCompetitors(stockName, stockExchange);

//   console.log("Market Share");

//   let totalMarketShare: { stockName: any; FYRevenueMLN: any; }[] = [];

//   console.log(competitors);
  
//   if (competitors !== undefined && competitors.length >= 1) {
//     competitors.forEach(async (item: any) => {
//       let competitorStock = item;
//       try {
//         let competitorRevenue = JSON.parse(JSON.stringify(await getFYRevenue(competitorStock, stockExchange)));
//         let serializedRevenue = {
//           "stockName": competitorStock,
//           "FYRevenueMLN": competitorRevenue
//         };

//         //console.log(serializedEfficiency);
//         totalMarketShare.push(serializedRevenue);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//     let stockRevenue = JSON.parse(JSON.stringify(await getFYRevenue(stockName, stockExchange)));
//     let serializedStockNowRevenue = {
//       "stockName": stockName,
//       "FYRevenueMLN": stockRevenue
//     };

//     console.log(totalMarketShare);
//     totalMarketShare.push(serializedStockNowRevenue);
//     return totalMarketShare;
//   } else {
//     return ["Error creating market share chart"];
//   }
// }

export async function getMarketShareData(stockName: string, stockExchange: string, companyName: string) {
  const cacheKey = `getMarketShare:${stockExchange}:${stockName}:${companyName}`;

  console.log("Market Share Data 2:");

  const cachedData = unstable_cache(
    async () => {
      console.log("MarketShareData: ");
      let competitors = await getCompetitors(stockName, stockExchange);

      console.log("getMarketShareData");

      let totalMarketShare: any[] = [];

      if (competitors !== undefined && competitors.length > 0) {
        // let competitorRevenuePromises: Promise<{ stockName: string; FYRevenueMLN: any; stockExchange: any }>[] = []; 
        // competitors.forEach(async (item: any) => {

        //   console.log(await item);
          
        //   console.log("Added revenue to competitors:");
        //   competitorRevenuePromises.push(
        //     (async () => {
        //       let competitorStockName = item.stockName;
        //       let competitorStockExchange = item.stockExchange;

        //       console.log(`Getting revenue for ${competitorStockExchange}:${competitorStockName}`);

        //       const FYRevenueMLN = await getFYRevenue(competitorStockName, competitorStockExchange);
        //       return { 
        //         stockName: competitorStockName, 
        //         FYRevenueMLN: FYRevenueMLN,
        //         stockExchange: competitorStockExchange 
        //       };
        //     })()
        //   );
        // });
        // const competitorsRevenues = await Promise.all(competitorRevenuePromises);
        // totalMarketShare = competitorsRevenues;

        // let FYRevenueMLN_1 = await getFYRevenue(stockName, stockExchange);
        
        // let serializedStockRevenue = {
        //   stockName: stockName,
        //   stockExchange: stockExchange,
        //   FYRevenueMLN: FYRevenueMLN_1
        // };

        // totalMarketShare.push(serializedStockRevenue);
        // console.log(totalMarketShare);
        
        // return totalMarketShare;
        let competitorRevenuePromises: StockData[] = [];

        for (const item of competitors) {
          console.log(item);

          console.log("Added revenue to competitors:");
         const competitorStockName =
  typeof item === "object" && "stockName" in item ? item.stockName : "";
const competitorStockExchange =
  typeof item === "object" && "stockExchange" in item ? item.stockExchange : "";
          console.log(`Getting revenue for ${competitorStockExchange}:${competitorStockName}`);

          const FYRevenueMLN = await getFYRevenue(competitorStockName, competitorStockExchange);

          competitorRevenuePromises.push({
            stockName: competitorStockName,
            FYRevenueMLN,
            stockExchange: competitorStockExchange,
          });
        }
        
        let FYRevenueMLN_1 = await getFYRevenue(stockName, stockExchange);

        let serializedStockRevenue = {
          stockName: stockName,
          FYRevenueMLN: FYRevenueMLN_1,
          stockExchange: stockExchange
        };
        
        totalMarketShare.push(serializedStockRevenue);

        // Wait for all competitor revenue promises to resolve
        const competitorsRevenues = await Promise.all(competitorRevenuePromises);

        // Add competitor revenue data to totalMarketShare
        competitorsRevenues.forEach((serializedCompetitorRevenue) => {
          totalMarketShare.push(serializedCompetitorRevenue);
        });

        console.log(totalMarketShare);

        return totalMarketShare;
      }
  },
  [cacheKey],
  {revalidate: (3600 * 24 * 30), tags: [`marketShare:${stockExchange}:${stockName}:${companyName}`]}
)();

  return cachedData;
}