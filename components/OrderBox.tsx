import {memo, useCallback, useRef, useState} from "react";
import {InputAccessoryView, Pressable, Text, TextInput, View} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {Feather} from "@expo/vector-icons";
import {InputAccessory} from "@/components/InputAccessory";
import OrderBoxInput from "@/components/OrderBoxInput";
import {useRecoilState} from "recoil";
import {orderPriceState} from "@/atom/orderListAtom";
import Colors from "@/constants/Colors";


function OrderBox() {

    const [orderPrice, setOrderPrice] = useRecoilState(orderPriceState);
    const [amount,setAmount] = useState<string>('');
    const [total,setTotal] = useState<string>('');
    const [isBuy,setIsBuy] = useState<boolean>(true);

    const priceInputID = 'priceInput';
    const amountInputID = 'amountInput';
    const totalInputID = 'totalInput';

    const amIpRef = useRef<TextInput>(null);

    return(
        <View
            style={{
                justifyContent:'space-between',
                height:'100%',
                paddingHorizontal:15
            }}
        >
            <View>
                <View
                    style={{
                        gap:10
                    }}
                >
                    {/*todo reanimated로 삼각형 및 컬러체인지?*/}
                    <View
                        style={{
                            height:30,
                            borderColor:'rgba(119,119,119,0.5)',
                            borderWidth:1,
                            flexDirection:'row',
                            alignItems:'center',
                            borderRadius:10,
                        }}
                    >
                        <Pressable
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                flex:1,
                                backgroundColor:isBuy?Colors.negative:'#FFF',
                                height:'100%',
                                borderRadius:10,
                                borderTopRightRadius:50,
                                borderBottomRightRadius:50,
                            }}
                            onPress={()=>setIsBuy(true)}
                        >
                            <Text
                                style={{
                                    color:isBuy?'#FFF':'#777',
                                    fontSize:18,
                                    fontWeight:'600'
                                }}
                            >
                                Buy
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                flex:1,
                                backgroundColor:!isBuy?Colors.positive:'#FFF',
                                height:'100%',
                                borderRadius:10,
                                borderTopLeftRadius:50,
                                borderBottomLeftRadius:50,
                            }}
                            onPress={()=>setIsBuy(false)}
                        >
                            <Text
                                style={{
                                    color:!isBuy?'#FFF':'#777',
                                    fontSize:18,
                                    fontWeight:'600'
                                }}
                            >
                                Sell
                            </Text>
                        </Pressable>
                    </View>
                    <View
                        style={{
                            alignItems:'center',
                            justifyContent:'center',
                            paddingVertical:7,
                            backgroundColor:'rgba(220,220,220,0.4)',
                            borderRadius:10
                        }}
                    >
                        <Text
                            style={{
                                fontSize:17,
                                fontWeight:'600',
                            }}
                        >
                            Limit
                        </Text>
                    </View>
                    <OrderBoxInput
                        inputId={priceInputID}
                        val={orderPrice}
                        onChange={(val)=>{
                            if(/\d/.test(val)){
                                setOrderPrice(val)
                            }else if(val===''){
                                setOrderPrice('');
                            }
                        }}
                        extraText={'Price (USDT)'}
                        onMinusPress={()=>{}}
                        onPlusPress={()=>{}}
                    />
                    <OrderBoxInput
                        inputId={amountInputID}
                        val={amount}
                        onChange={(val)=>{
                            if(/\d/.test(val)){
                                setAmount(val)
                            }else if(val===''){
                                setAmount('');
                            }
                        }}
                        extraText={'Amount'}
                        onMinusPress={()=>{}}
                        onPlusPress={()=>{}}
                    />
                </View>
                <View
                    style={{
                        backgroundColor:'rgba(188,188,188,0.5)',
                        height:1,
                        marginVertical:20
                    }}
                >
                </View>
                <OrderBoxInput
                    inputId={totalInputID}
                    val={total}
                    onChange={(val)=>{
                        if(/\d/.test(val)){
                            setTotal(val)
                        }else if(val===''){
                            setTotal('');
                        }
                    }}
                    extraText={'Total (USDT)'}
                    onMinusPress={()=>{}}
                    onPlusPress={()=>{}}
                />
            </View>
            <Pressable
                style={{
                    backgroundColor:Colors.positive,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:10
                }}
            >
                <Text
                    style={{
                        fontSize:18,
                        fontWeight:'600',
                        color:'#FFF'
                    }}
                >
                    Log In
                </Text>
            </Pressable>
        </View>
)
}



export default memo(OrderBox);
