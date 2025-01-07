import {memo, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {ChartType} from "@/constants/Types";
import {COIN_CHART, getCoinChart, getOrderList, ORDER_BOOK} from "@/assets/apis";
import {useRecoilState, useSetRecoilState} from "recoil";
import {orderListState} from "@/atom/orderListAtom";
import {number} from "prop-types";
import Colors from "@/constants/Colors";

type OrderBookProps = {
    symbol:string
};

function OrderBookList({
    symbol,
                }: OrderBookProps) {

    useEffect(() => {
        console.log(symbol,'symbol');
    }, []);

    const [orderList,setOrderList] = useRecoilState(orderListState);
    const [ol,setOl] = useState([]);

    // const {data,isLoading,error} = useQuery<[]>({
    //     queryKey:[ORDER_BOOK],
    //     queryFn:()=>getOrderList(symbol)
    // });

    useEffect(() => {
        const websocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`)
        websocket.onopen = () => {
            console.log('connected');
        }
        websocket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const result = await getOrderList(symbol);
            if(data.U < result.lastUpdateId){
                setOrderList(state=> ({
                    ...state,
                    ...result,
                }));
            }
        }
        return () => {
            websocket.close()
        }
    }, []);

    return(
        <View
            style={{
                flexDirection:'row',
                width:'100%',
                paddingHorizontal:20,
                gap:10
            }}>
            <View
                style={{
                    flex:1,
                }}
            >
                <Text>
                    Bid
                </Text>
                {orderList.bids.map((ask,ai)=>{
                    return(
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingVertical:3,
                            }}
                            key={`ask${ai}${ask[0]}${ask[1]}`}
                        >
                            <Text>
                                {Number(ask[1])}
                            </Text>
                            <Text
                                style={{
                                    color:Colors.positive
                                }}
                            >
                                {Number(ask[0])}
                            </Text>
                        </View>
                    )
                })}
            </View>
            <View
                style={{
                    flex:1,
                }}
            >
                <Text>
                    Ask
                </Text>
                {orderList.asks.map((ask,ai)=>{
                    return(
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingVertical:3,
                            }}
                            key={`ask${ai}${ask[0]}${ask[1]}`}
                        >
                            <Text
                                style={{
                                    color:Colors.negative
                                }}
                            >
                                {Number(ask[0])}
                            </Text>
                            <Text>
                                {Number(ask[1])}
                            </Text>
                        </View>
                    )
                })}
            </View>
        </View>
)
}



export default memo(OrderBookList);
