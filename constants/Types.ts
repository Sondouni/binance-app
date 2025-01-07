export type CoinType = {
    symbol: string;
    name: string;
    lastPrice: string;
    priceChangePercent: string;
}

export type ChartType = {
    timestamp:number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export type OrderType = {
    timestamp:number;
    open: number;
    high: number;
    low: number;
    close: number;
}
