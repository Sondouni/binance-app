import {SafeAreaView, ScrollView, StyleSheet, View, Text, Pressable} from 'react-native';
import {useEffect} from "react";
import {BarChartComponent} from "@/components/BarChart";
import Header from "@/components/Header";
import OrderBookList from "@/components/OrderBookList";
import Colors from "@/constants/Colors";
import {useRecoilValue} from "recoil";
import {orderSymbolState} from "@/atom/orderListAtom";
import {router} from "expo-router";
import CurCoinInfo from "@/components/CurCoinInfo";

export default function ChartScreen() {
    const orderSymbol = useRecoilValue(orderSymbolState);

    useEffect(() => {
        console.log(orderSymbol, 'orderSymbol');
    }, [orderSymbol]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title={orderSymbol}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <CurCoinInfo/>
                <BarChartComponent orderSymbol={orderSymbol}/>
                <OrderBookList symbol={orderSymbol}/>
            </ScrollView>
            <View
                style={styles.btnCon}
            >
                <Pressable
                    onPress={() => {
                        router.push('/trade')
                    }}
                    style={styles.btnB}
                >
                    <Text
                        style={styles.btnText}
                    >
                        Buy
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        router.push('/trade')
                    }}
                    style={styles.btnS}
                >
                    <Text
                        style={styles.btnText}
                    >
                        Sell
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnCon:{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 15,
        paddingHorizontal: 25
    },
    btnB:{
        backgroundColor: Colors.positive,
        width: 90,
        height: 35,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnS:{
        backgroundColor: Colors.negative,
        width: 90,
        height: 35,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText:{
        color: '#FFF',
        fontWeight: '700',
        fontSize: 17,
    }
});
