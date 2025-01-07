import {FlatList, ListRenderItem, Text, View} from "react-native";
import {useCallback, useMemo} from "react";
import {CoinType} from "@/constants/Types";
import CoinListRow from "@/components/CoinListRow";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {coinListState, searchedCoinList} from "@/atom/coinListAtom";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors from "@/constants/Colors";
import {useWebSocket} from "@/hooks/useWebSocket";

export function CoinList({inputRef}: { inputRef:any }) {

    useWebSocket({
        onMessage:(message) => {
            const tempList = message.data.filter((item:any)=>item.s.slice(-4) === 'USDT');
            setCoinList(state=>{
                const newCoinList = state.map((item,index)=>{
                    const tempObj = {...item};
                    tempList.forEach((ti:any)=>{
                        if(tempObj.symbol === ti.s){
                            tempObj.lastPrice = ti.c;
                            tempObj.priceChangePercent = ti.P;
                        }
                    });
                    return tempObj;
                });
                return newCoinList;
            });
        },
        url:'wss://stream.binance.com:9443/stream?streams=!ticker@arr',
    });

    const setCoinList = useSetRecoilState(coinListState);
    const coinList = useRecoilValue(searchedCoinList);

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
