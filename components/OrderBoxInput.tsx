import {memo, useRef, useState} from "react";
import {InputAccessoryView, InputAccessoryViewProps, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {Feather} from "@expo/vector-icons";
import {InputAccessory} from "@/components/InputAccessory";

type OrderBoxInputProps = {
    val:string;
    extraText:string;
    onChange: (val:string) => void;
    inputId: string;
    needCal?:boolean;
    onMinusPress?: () => void;
    onPlusPress?: () => void;
}

function OrderBoxInput(props:OrderBoxInputProps) {

    const [amount,setAmount] = useState<string>('');
    const [total,setTotal] = useState<string>('');

    const inputRef = useRef<TextInput>(null);

    return(
        <View
            style={style.container}
        >
            <InputAccessory
                text={'Done'}
                id={props.inputId}
                onPress={()=>inputRef.current?.blur()}
            />
            {props.needCal &&
                <Pressable
                    onPress={props.onMinusPress}
                    hitSlop={30}
                >
                    <Feather name={'minus'} size={20} color={'#777777'} />
                </Pressable>
            }
            <View
                style={style.inputCon}
            >
                <Text
                    style={style.text}
                >
                    {props.extraText}
                </Text>
                <TextInput
                    ref={inputRef}
                    value={props.val}
                    onChangeText={props.onChange}
                    keyboardType={'numeric'}
                    style={style.input}
                    allowFontScaling={false}
                    textAlign={'center'}
                    textAlignVertical={'center'}
                    inputAccessoryViewID={props.inputId}
                />
            </View>
            {props.needCal &&
                <Pressable
                    onPress={props.onPlusPress}
                    hitSlop={30}
                >
                    <Feather name={'plus'} size={20} color={'#777777'} />
                </Pressable>
            }
        </View>
)
}



export default memo(OrderBoxInput);

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        backgroundColor:'rgba(220,220,220,0.4)',
        borderRadius:10,
        paddingHorizontal:10
    },
    inputCon:{
        justifyContent:'center',
        paddingVertical:5,
        flex:1,
    },
    text:{
        alignSelf:'center',
        fontSize:13,
        color:'#777',
        marginBottom:5,
    },
    input:{
        alignItems:'center',
        justifyContent:'center',
        // paddingVertical:10,
        borderRadius:10,
        fontSize:15,
        padding:0,
        margin:0,
        fontWeight:'600'
    }
})
