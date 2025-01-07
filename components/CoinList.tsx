import {FlatList, ListRenderItem, Text, View} from "react-native";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CoinType} from "@/constants/Types";
import CoinListRow from "@/components/CoinListRow";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {coinListState, searchedCoinList} from "@/atom/coinListAtom";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "@/constants/Colors";

export function CoinList({data,inputRef}: { data: CoinType[],inputRef:any }) {

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


    const renderItem:ListRenderItem<CoinType> = useCallback(({item,index}) => {
        return (
            <CoinListRow {...item} />
        )
    },[]);

    const onEmptyComponent = useMemo(()=>{
        return (
            <View
                style={{
                    flex:1,
                    backgroundColor:'#fff',
                    paddingTop:80,
                    alignItems:'center',
                }}
            >
                <MaterialCommunityIcons name={'file-search-outline'} size={100}/>
                <Text style={{color:Colors.textGray,fontSize:17,fontWeight:'500',marginTop:15}}>
                    No Records Found
                </Text>
            </View>
        )
    },[])

    return (
        <FlatList
            keyExtractor={item => item.symbol}
            data={coinList}
            renderItem={renderItem}
            onScrollBeginDrag={()=>{
                inputRef.current?.blur()
            }}
            ListEmptyComponent={onEmptyComponent}
            contentContainerStyle={{
                flexGrow:1,
                backgroundColor:'#FFF',
                paddingTop:10
            }}
            showsVerticalScrollIndicator={false}
        />
    );
}
