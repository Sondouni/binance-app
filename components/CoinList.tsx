import {FlatList, View} from "react-native";
import {useEffect, useState} from "react";
import {CoinSp} from "@/constants/Types";
import CoinListRow from "@/components/CoinListRow";

export function CoinList({data}: { data: CoinSp[] }) {

    //todo 렌더링 최적화 방안 고려
    const [coinList,setCoinList] = useState(data);
    useEffect(() => {
        const websocket = new WebSocket('wss://stream.binance.com:9443/stream?streams=!ticker@arr')
        websocket.onopen = () => {
          console.log('connected');
        }
        websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          // console.log(data,'data');
          //   data.data.forEach((item,index)=>{
          //       if(item.s==='BTCUSDT'){
          //           console.log(item,'??');
          //       }
          //   });
          const tempList = data.data.filter((item)=>item.s.slice(-4) === 'USDT');
          // console.log(tempList.length,'??');
          setCoinList(state=>{
              const newCoinList = state.map((item,index)=>{
                  tempList.forEach((ti)=>{
                      if(item.symbol === ti.s){
                          item.lastPrice = ti.c;
                          item.priceChangePercent = ti.P;
                      }
                  });
                  return item;
              });
              return newCoinList;
          });
        }
        return () => {
          websocket.close()
        }
    }, []);

    const renderItem = ({item,index}) => {
        return (
            <CoinListRow {...item} />
        )
    }

    return (
        <FlatList
            keyExtractor={item => item.symbol}
            data={coinList}
            renderItem={renderItem}
        />
    );
}
