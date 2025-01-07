import {memo, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {ChartType} from "@/constants/Types";
import {COIN_CHART, getCoinChart, getOrderList, ORDER_BOOK} from "@/assets/apis";
import {useRecoilState, useSetRecoilState} from "recoil";
import {orderListState, orderPriceState} from "@/atom/orderListAtom";
import {number} from "prop-types";
import Colors from "@/constants/Colors";
import {OrderBookShortListRow} from "@/components/OrderBookListRow";
import {router} from "expo-router";
import {useWebSocket} from "@/hooks/useWebSocket";

type OrderBookProps = {
    symbol: string
};

function OrderBookList({
                           symbol,
                       }: OrderBookProps) {

    const [orderList, setOrderList] = useRecoilState(orderListState);
    const setOrderPrice = useSetRecoilState(orderPriceState);

    useWebSocket({
        onMessage:async (message) => {
            const result = await getOrderList(symbol);
            if (message.U < result.lastUpdateId) {
                setOrderList(state => ({
                    ...state,
                    ...result,
                }));
            }
        },
        url:`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`,
    });

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <Text
                    style={styles.ot}
                >
                    Order Book
                </Text>
            </View>
            <View
                style={styles.orderBookBox}>
                <View
                    style={styles.orderRowBox}
                >
                    <Text style={styles.orderText}>
                        Bid
                    </Text>
                    {orderList.bids.map((bid, ai) => {
                        return (
                            <OrderBookShortListRow
                                key={`bid${ai}${bid[0]}${bid[1]}`}
                                price={bid[0]}
                                amount={bid[1]}
                                isAsk={false}
                                onPress={() => {
                                    setOrderPrice(`${Number(bid[0])}`);
                                    router.push('/trade')
                                }}
                            >
                            </OrderBookShortListRow>
                        )
                    })}
                </View>
                <View
                    style={styles.orderRowBox}
                >
                    <Text style={styles.orderText}>
                        Ask
                    </Text>
                    {orderList.asks.map((ask, ai) => {
                        return (
                            <OrderBookShortListRow
                                key={`ask${ai}${ask[0]}${ask[1]}`}
                                price={ask[0]}
                                amount={ask[1]}
                                isAsk={true}
                                onPress={() => {
                                    setOrderPrice(`${Number(ask[0])}`);
                                    router.push('/trade')
                                }}
                            >
                            </OrderBookShortListRow>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}


export default memo(OrderBookList);

const styles = StyleSheet.create({
    container: {paddingHorizontal: 20,marginTop:15},
    ot:{
        fontSize: 15,
        fontWeight: '600',
        backgroundColor: 'rgba(119,119,119,0.2)',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    orderBookBox:{
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        marginTop:10
    },
    orderText:{
        fontSize:15,
        fontWeight:'400',
        color:Colors.textGray,
        marginBottom:5,
    },
    orderRowBox:{
        flex: 1,

    }
})
