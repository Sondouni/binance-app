//코인리스트 가져오기
import {ChartType, CoinType} from "@/constants/Types";

export const COIN_LIST = 'COIN_LIST';
export const COIN_CHART = 'COIN_CHART';
export const ORDER_BOOK = 'ORDER_BOOK';

export const getCoinList = async () => {
    const coinList = await fetch('https://api.binance.com/api/v3/ticker/24hr').then((response) => response.json());
    // usdt 찾기
    const usdtList:CoinType[] = [];
    coinList.forEach((item:any) => {
        if(item.symbol.slice(-4) === 'USDT'){
            item.name = item.symbol.replaceAll('USDT', '');
            usdtList.push(item);
        }
    });
    return usdtList;
};

export const getCoinChart = async (s:string,i:string) => {
    const chartList = await fetch(`https://api.binance.com/api/v3/klines?symbol=${s}&interval=${i}&limit=50`).then((response) => response.json());

    let minPrice = 0;
    let maxPrice = 0;

    const calCharList:ChartType[] = chartList.map((item:any,index:any) => {
        if(index===0){
            minPrice = Number(item[3]);
        }
        if(minPrice> Number(item[3])){
            minPrice = Number(item[3]);
        }
        if(maxPrice< Number(item[2])){
            maxPrice = Number(item[2]);
        }
        return {
            timestamp:Number(item[0]),
            open: Number(item[1]),
            high: Number(item[2]),
            low: Number(item[3]),
            close: Number(item[4]),
        }
    })

    let middleMinPrice = (maxPrice - minPrice)/3 + minPrice ;
    let middleMaxPrice = (maxPrice - minPrice)/3*2 + minPrice;

    return {calCharList, minPrice, maxPrice, middleMinPrice, middleMaxPrice};
};

export const getOrderList = async (s:string) => {
    const orderList = await fetch(`https://api.binance.com/api/v3/depth?symbol=${s}&limit=50`).then((response) => response.json());
    return orderList;
};
