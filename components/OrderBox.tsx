import {memo, useRef, useState} from "react";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
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
            style={style.container}
        >
            <View>
                <View
                    style={{
                        gap:10
                    }}
                >
                    <View
                        style={style.toggle}
                    >
                        <Pressable
                            style={[{
                                backgroundColor:isBuy?Colors.positive:'#FFF',

                            },style.toggleL]}
                            onPress={()=>setIsBuy(true)}
                        >
                            <Text
                                style={[{
                                    color:isBuy?'#FFF':'#777',

                                },style.toggleT]}
                            >
                                Buy
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[{
                                backgroundColor:!isBuy?Colors.negative:'#FFF',
                            },style.toggleR]}
                            onPress={()=>setIsBuy(false)}
                        >
                            <Text
                                style={[{
                                    color:!isBuy?'#FFF':'#777',
                                },style.toggleT]}
                            >
                                Sell
                            </Text>
                        </Pressable>
                    </View>
                    <View
                        style={style.limitV}
                    >
                        <Text
                            style={style.limitT}
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
                        onMinusPress={()=>{
                            setOrderPrice(state=>{
                                const num = Number(state);
                                return num>0?`${num-1}`:`${num}`
                            })
                        }}
                        onPlusPress={()=>{
                            setOrderPrice(state=>{
                                const num = Number(state);
                                return num>0?`${num+1}`:`1`
                            })
                        }}
                        needCal={true}
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
                        onMinusPress={()=>{
                            setAmount(state=>{
                                const num = Number(state);
                                return num>0?`${num-1}`:`${num}`
                            })
                        }}
                        onPlusPress={()=>{
                            setAmount(state=>{
                                const num = Number(state);
                                return num>0?`${num+1}`:`1`
                            })
                        }}
                        needCal={true}
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
                />
            </View>
            <Pressable
                style={style.loginV}
            >
                <Text
                    style={style.loginT}
                >
                    Log In
                </Text>
            </Pressable>
        </View>
)
}



export default memo(OrderBox);

const style = StyleSheet.create({
    container: {
        justifyContent:'space-between',
        height:'100%',
        paddingHorizontal:15
    },
    toggle:{
        height:30,
        borderColor:'rgba(119,119,119,0.5)',
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
    },
    toggleL:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height:'100%',
        borderRadius:10,
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
    },
    toggleR:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height:'100%',
        borderRadius:10,
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
    },
    toggleT:{
        fontSize:18,
        fontWeight:'600'
    },
    limitV:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:7,
        backgroundColor:'rgba(220,220,220,0.4)',
        borderRadius:10
    },
    limitT:{
        fontSize:17,
        fontWeight:'600',
    },
    loginV:{
        backgroundColor:Colors.positive,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    loginT:{
        fontSize:18,
        fontWeight:'600',
        color:'#FFF'
    }
})
