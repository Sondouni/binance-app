import {SafeAreaView, StyleSheet} from 'react-native';

import { Text, View } from '@/components/Themed';
import {useRecoilValue} from "recoil";
import {orderSymbolState} from "@/atom/orderListAtom";
import Header from "@/components/Header";
import OrderBookShortList from "@/components/OrderBookShortList";

export default function TradeScreen() {
  const orderSymbol = useRecoilValue(orderSymbolState);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={orderSymbol}/>
      <View
        style={{
          flex:1,
          flexDirection:'row',
        }}
      >
        <View
          style={{
            flex:5.5,
          }}
        >

        </View>
        <View
          style={{
            flex:4.5,
          }}
        >
          <OrderBookShortList/>
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
