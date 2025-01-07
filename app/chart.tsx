import {SafeAreaView, ScrollView, StyleSheet, View, Text, Pressable} from 'react-native';
import {Bar, CartesianChart, Line, useChartTransformState} from "victory-native";
import {useQuery} from "@tanstack/react-query";
import {COIN_CHART, COIN_LIST, getCoinChart, getCoinList} from "@/assets/apis";
import {useEffect} from "react";
import {useFont} from "@shopify/react-native-skia";
import aa from "../assets/fonts/SpaceMono-Regular.ttf"
import {useSharedValue} from "react-native-reanimated";
import {BarChartComponent} from "@/components/BarChart";
import {ChartType} from "@/constants/Types";
import Header from "@/components/Header";
import OrderBookList from "@/components/OrderBookList";
import Colors from "@/constants/Colors";
import {useRecoilValue} from "recoil";
import {orderListState, orderSymbolState} from "@/atom/orderListAtom";
import {router} from "expo-router";
import CurPriceText from "@/components/CurPriceText";

export default function ChartScreen(params) {
    const orderSymbol = useRecoilValue(orderSymbolState);

    useEffect(() => {
        console.log(orderSymbol,'orderSymbol');
    }, [orderSymbol]);

    //todo 캐싱된 데이터 지워주기
    const {data,isLoading,error} = useQuery<ChartType[]>({
        queryKey:[COIN_CHART],
        queryFn:()=>getCoinChart(orderSymbol,'1M')
    });


  return (
    <SafeAreaView style={styles.container}>
      <Header title={orderSymbol}/>
        <CurPriceText/>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {data &&
            <BarChartComponent data={data}/>
        }
        <OrderBookList symbol={orderSymbol}/>
      </ScrollView>
        <View
            style={{
                height:50,
                flexDirection:'row',
                justifyContent:'flex-end',
                alignItems:'center',
                gap:15,
                paddingHorizontal:25
            }}
        >
            <Pressable
                onPress={()=>{
                    router.push('/trade')
                }}
                style={{
                    backgroundColor:Colors.positive,
                    width:90,
                    height:35,
                    borderRadius:10,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Text
                    style={{
                        color:'#FFF',
                        fontWeight:'700',
                        fontSize:17,
                    }}
                >
                    Buy
                </Text>
            </Pressable>
            <View
                style={{
                    backgroundColor:Colors.negative,
                    width:90,
                    height:35,
                    borderRadius:10,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Text
                    style={{
                        color:'#FFF',
                        fontWeight:'700',
                        fontSize:17,
                    }}
                >
                    Sell
                </Text>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
