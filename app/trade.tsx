import {Dimensions, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {Text, View} from '@/components/Themed';
import {useRecoilValue} from "recoil";
import {orderPriceState, orderSymbolState} from "@/atom/orderListAtom";
import Header from "@/components/Header";
import OrderBookShortList from "@/components/OrderBookShortList";
import OrderBox from '@/components/OrderBox';
import {curCoinPriceState} from "@/atom/coinListAtom";
import Colors from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const windowHeight = Dimensions.get('window').height;

export default function TradeScreen() {
    const orderSymbol = useRecoilValue(orderSymbolState);
    const curPercent = useRecoilValue(curCoinPriceState).percent;

    return (
        <SafeAreaView style={styles.container}>
            <Header title={orderSymbol}/>

            <ScrollView
            >
                <View
                    style={styles.perView}
                >
                    <Text
                        style={styles.perText}
                    >
                        {curPercent}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            flex: 6,
                        }}
                    >
                        <OrderBox/>
                    </View>
                    <View
                        style={{
                            flex: 4,
                        }}
                    >
                        <OrderBookShortList/>
                    </View>
                </View>
                <View
                    style={styles.extraView}
                >
                    <Text
                        style={styles.ett1}
                    >
                        Open Orders (0)
                    </Text>
                    <View style={{height: 1, backgroundColor: 'rgba(119,119,119,0.2)'}}/>
                    <View
                        style={styles.extraView2}
                    >
                        <MaterialCommunityIcons name={'file-search-outline'} size={70}/>
                        <Text
                            style={styles.ett2}
                        >
                            No open orders
                        </Text>
                        <Text
                            style={styles.ett3}
                        >
                            Let Top Traders Trade for you
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    perView:{
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    perText:{
        fontSize: 16,
        fontWeight: '500',
        color: Colors.positive

    },
    extraView:{
        //todo header값 + indicator값 빼주기
        height: windowHeight - 150,
        paddingTop: 35,
    },
    ett1:{
        fontSize: 17,
        fontWeight: '600',
        paddingHorizontal: 15,
        marginBottom: 14
    },
    extraView2:{
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    ett2:{
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10
    },
    ett3:{
        fontSize: 17,
        fontWeight: '300',
        color: 'rgba(119,119,119,0.7)',
        marginTop: 10
    }
});
