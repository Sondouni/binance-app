import {Pressable, View} from "react-native";
import {Text} from "@/components/Themed";
import {CoinType} from "@/constants/Types";
import {memo, useCallback} from "react";
import {Link, router} from "expo-router";
import {useSetRecoilState} from "recoil";
import {orderSymbolState} from "@/atom/orderListAtom";

function CoinListRow(props: CoinType) {

    const setOrderSymbol = useSetRecoilState(orderSymbolState);
    const onPress = useCallback(()=>{
        setOrderSymbol(props.symbol);
        router.push('/chart');
    },[]);

    return(
        <Pressable
            onPress={onPress}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                paddingVertical:10,
                paddingHorizontal:20,
                width:'100%',
                // marginTop:55
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'flex-end'
                }}
            >
                <Text
                    style={{
                        fontSize:20,
                        fontWeight:700
                    }}
                >
                    {props.name}
                </Text>
                <Text
                    style={{
                        fontSize:15,
                        color:'#858585'
                    }}
                >
                    {` /${props.symbol}`}
                </Text>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}
            >
                <Text
                    style={{
                        fontSize:20,
                        fontWeight:'600',
                    }}
                >
                    {Number(props.lastPrice)}
                </Text>
                <View
                    style={{
                        height:30,
                        width:100,
                        backgroundColor:'#0ecb81',
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:8,
                        marginLeft:15
                    }}
                >
                    <Text
                        style={{
                            fontSize:15,
                            color:'#fff'
                        }}
                    >
                        {props.priceChangePercent}
                    </Text>
                </View>

            </View>
        </Pressable>
    )
}

export default memo(CoinListRow);
