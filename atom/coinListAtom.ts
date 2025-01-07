import {atom, selector} from "recoil";
import {CoinType} from "@/constants/Types";
import {orderListState} from "@/atom/orderListAtom";


export const coinListState = atom<CoinType[]>({
    key:'coinList',
    default:[]
});

export const curCoinPriceState = selector({
    key: 'curCoinPrice',
    get: ({get}) => {
        const coinList = get(coinListState);
        const symbol = get(orderListState).symbol;
        let price = '';
        let percent = '';
        let lp = '';
        let hp = '';
        let volume = '';
        coinList.forEach((item,index)=>{
            if(item.symbol===symbol){
                price = item.lastPrice;
                percent = item.priceChangePercent;
                lp = item.lowPrice;
                hp = item.highPrice;
                volume = item.volume;
            }
        })
        return {price,percent};
    },
});

