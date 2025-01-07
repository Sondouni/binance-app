import {memo} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {orderPriceState, shortOrderListState} from "@/atom/orderListAtom";
import Colors from "@/constants/Colors";
import CurPriceText from "@/components/CurPriceText";
import {OrderBookShortListRow} from "@/components/OrderBookShortListRow";


function OrderBookShortList() {

    const orderList = useRecoilValue(shortOrderListState);
    const setOrderPrice = useSetRecoilState(orderPriceState);

    return(
        <View
            style={{
                paddingRight:15
            }}
        >
            <View
                style={styles.infoView}
            >
                <View>
                    <Text style={styles.infoText}>
                        Price
                    </Text>
                    <Text style={styles.infoText}>
                        (USDT)
                    </Text>
                </View>
                <View>
                    <Text style={styles.infoText}>
                        Amount
                    </Text>
                    <Text style={styles.infoText}>
                        (BTC)
                    </Text>
                </View>
            </View>
            {[...orderList.asks].reverse().map((ask,ai)=>{
                return(
                    <OrderBookShortListRow key={`${ask[0]}${ask[1]}${ai}`} price={ask[0]} amount={ask[1]} isAsk={true} setOrderPrice={setOrderPrice}/>
                )
            })}
            <View
                style={{
                    alignItems:'center',
                    paddingVertical:10,
                }}
            >
                <CurPriceText
                    style={{
                        fontSize:20,
                        fontWeight:'600'
                    }}
                />
            </View>
            {orderList.bids.map((bid,bi)=>{
                return(
                    <OrderBookShortListRow key={`${bid[0]}${bid[1]}${bi}`} price={bid[0]} amount={bid[1]} isAsk={false} setOrderPrice={setOrderPrice}/>
                )
            })}
        </View>
)
}

export default memo(OrderBookShortList);

const styles = StyleSheet.create({
    infoText:{
        color:Colors.textGray,
        fontSize:13
    },
    infoView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5,
    }
})
