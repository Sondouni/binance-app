//코인리스트 가져오기
import {CoinSp} from "@/constants/Types";

export const COIN_LIST = 'COIN_LIST';
export const getCoinList = async () => {
    const coinList = await fetch('https://api.binance.com/api/v3/ticker/price').then((response) => response.json());
    // usdt 찾기
    const usdtList:CoinSp[] = [];
    coinList.forEach((item) => {
        if(item.symbol.slice(-4) === 'USDT'){
            item.symbol = item.symbol.replaceAll('USDT', '');
            usdtList.push(item);
        }
    });
    return usdtList;
};
