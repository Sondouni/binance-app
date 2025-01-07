import {memo, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {useQuery} from "@tanstack/react-query";
import {ChartType} from "@/constants/Types";
import {COIN_CHART, getCoinChart, getOrderList, ORDER_BOOK} from "@/assets/apis";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {orderListState, shortOrderListState} from "@/atom/orderListAtom";
import {number} from "prop-types";
import Colors from "@/constants/Colors";
import CurPriceText from "@/components/CurPriceText";

type OrderBookShortProps = {
    symbol:string
};

function OrderBookShortList({
    symbol,
                }: OrderBookShortProps) {

    const orderList = useRecoilValue(shortOrderListState);

    return(
        <View>
            {[...orderList.asks].reverse().map((ask,ai)=>{
                return(
                    <View>
                        <Text>
                            {ask[0]}
                        </Text>
                    </View>
                )
            })}
            <View>
                <CurPriceText/>
            </View>
            {orderList.bids.map((bid,bi)=>{
                return(
                    <View>
                        <Text>
                            {bid[0]}
                        </Text>
                    </View>
                )
            })}
        </View>
)
}



export default memo(OrderBookShortList);
