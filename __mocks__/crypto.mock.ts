  export interface ICryptoData {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    percent_change_1h: string;
    percent_change_7d: string;
    price_btc: string;
    market_cap_usd: string;
    volume24: number;
    volume24a: number;
    csupply: string;
    tsupply: string;
    msupply: string;
  }
  
  export interface ICryptoInfo {
    coins_num: number;
    time: number;
  }
  
  export interface ICryptoAPIResponse {
    data: ICryptoData[];
    info: ICryptoInfo;
  }
  
  export const cryptoMockData: ICryptoAPIResponse = {
    data: [
      {
        id: "80",
        symbol: "ETH",
        name: "Ethereum",
        nameid: "ethereum",
        rank: 2,
        price_usd: "2185.05",
        percent_change_24h: "-7.21",
        percent_change_1h: "-0.97",
        percent_change_7d: "-2.99",
        price_btc: "0.053306",
        market_cap_usd: "267395607015.03",
        volume24: 15056191016.68043,
        volume24a: 7937987810.329084,
        csupply: "122375302.00",
        tsupply: "122375302",
        msupply: ""
      }
    ],
    info: {
      coins_num: 11506,
      time: 1702320723
    }
  };
  