//코인리스트 가져오기
import {ChartType, CoinSp} from "@/constants/Types";

export const COIN_LIST = 'COIN_LIST';
export const COIN_CHART = 'COIN_CHART';

export const getCoinList = async () => {
    const coinList = await fetch('https://api.binance.com/api/v3/ticker/24hr').then((response) => response.json());
    // usdt 찾기
    const usdtList:CoinSp[] = [];
    coinList.forEach((item) => {
        if(item.symbol.slice(-4) === 'USDT'){
            item.name = item.symbol.replaceAll('USDT', '');
            usdtList.push(item);
        }
    });
    return usdtList;
};

export const getCoinChart = async (s:string,i:string) => {
    const chartList = await fetch(`https://api.binance.com/api/v3/klines?symbol=${s}&interval=${i}&limit=50`).then((response) => response.json());
    const calCharList:ChartType[] = chartList.map((item,index) => {
        return {
            timestamp:Number(item[0]),
            open: Number(item[1]),
            high: Number(item[2]),
            low: Number(item[3]),
            close: Number(item[4]),
        }
    })
    return calCharList;
};
