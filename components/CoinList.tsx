import {FlatList, View} from "react-native";
import {useEffect, useState} from "react";
import {CoinType} from "@/constants/Types";
import CoinListRow from "@/components/CoinListRow";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {coinListState, searchedCoinList} from "@/atom/coinListAtom";

export function CoinList({data}: { data: CoinType[] }) {

    //todo 렌더링 최적화 방안 고려
    const setCoinList = useSetRecoilState(coinListState);
    const coinList = useRecoilValue(searchedCoinList);

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
                  const tempObj = {...item};
                  tempList.forEach((ti)=>{
                      if(tempObj.symbol === ti.s){
                          tempObj.lastPrice = ti.c;
                          tempObj.priceChangePercent = ti.P;
                      }
                  });
                  return tempObj;
              });
              return newCoinList;
          });
        }
        return () => {
          websocket.close()
        }
    }, []);

    useEffect(() => {
        // console.log(coinList.length,'?');
    }, [coinList]);

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
