import {atom, selector} from "recoil";

export const orderListState = atom({
    key:'orderList',
    default:{
        symbol:'',
        lastUpdateId:0,
        bids:[],
        asks:[],
    },
});

export const orderPriceState = atom<string>({
    key:'orderPrice',
    default:''
})

export const shortOrderListState = selector({
    key: 'orderShortList',
    get: ({get}) => {
        const orderList = get(orderListState);
        const limit = 7;
        return {
            bids:orderList.bids.length>limit?orderList.bids.slice(0,limit):orderList.bids,
            asks:orderList.asks.length>limit?orderList.asks.slice(0,limit):orderList.asks,
        }
        //10개 끊어서 리턴
    },
});

export const orderSymbolState = selector({
    key: 'orderSymbol',
    get: ({get}) => {
        return get(orderListState).symbol;
    },
    set: ({set}, newValue) =>
        set(
            orderListState,
            {
                symbol:newValue,
                lastUpdateId:0,
                bids:[],
                asks:[],
            }
        )
});
