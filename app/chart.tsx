import {SafeAreaView, StyleSheet} from 'react-native';
import {Bar, CartesianChart, Line, useChartTransformState} from "victory-native";
import {useQuery} from "@tanstack/react-query";
import {COIN_CHART, COIN_LIST, getCoinChart, getCoinList} from "@/assets/apis";
import {useEffect} from "react";
import {useFont} from "@shopify/react-native-skia";
import aa from "../assets/fonts/SpaceMono-Regular.ttf"
import {useSharedValue} from "react-native-reanimated";
import {BarChartComponent} from "@/components/BarChart";
import {ChartType} from "@/constants/Types";

export default function ChartScreen(params) {
  //todo screen params 확인
  const symbol = 'BTCUSDT';


    const {data,isLoading,error} = useQuery<ChartType[]>({
        queryKey:[COIN_CHART],
        queryFn:()=>getCoinChart(symbol,'1M')
    });


  return (
    <SafeAreaView style={styles.container}>
        {data &&
            <BarChartComponent data={data}/>
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
