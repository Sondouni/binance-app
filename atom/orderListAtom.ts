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

export const shortOrderListState = selector({
    key: 'orderShortList',
    get: ({get}) => {
        const orderList = get(orderListState);
        return {
            bids:orderList.bids.length>10?orderList.bids.slice(0,10):orderList.bids,
            asks:orderList.asks.length>10?orderList.asks.slice(0,10):orderList.asks,
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
