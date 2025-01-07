import {memo, useRef, useState} from "react";
import {InputAccessoryView, InputAccessoryViewProps, Pressable, Text, TextInput, View} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {Feather} from "@expo/vector-icons";
import {InputAccessory} from "@/components/InputAccessory";

type OrderBoxInputProps = {
    val:string;
    extraText:string;
    onChange: (val:string) => void;
    inputId: string;
    onMinusPress: () => void;
    onPlusPress: () => void;
}

function OrderBoxInput(props:OrderBoxInputProps) {

    const [amount,setAmount] = useState<string>('');
    const [total,setTotal] = useState<string>('');

    const inputRef = useRef<TextInput>(null);

    return(
        <View>
            <InputAccessory
                text={'Done'}
                id={props.inputId}
                onPress={()=>inputRef.current?.blur()}
            />
            <View
                style={{
                    backgroundColor:'rgba(220,220,220,0.4)',
                    justifyContent:'center',
                    borderRadius:10,
                    paddingVertical:5
                }}
            >
                <Text
                    style={{
                        alignSelf:'center',
                        fontSize:13,
                        color:'#777',
                        marginBottom:5,
                    }}
                >
                    {props.extraText}
                </Text>
                <TextInput
                    ref={inputRef}
                    value={props.val}
                    onChangeText={props.onChange}
                    keyboardType={'numeric'}
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        // paddingVertical:10,
                        borderRadius:10,
                        fontSize:15,
                        padding:0,
                        margin:0,
                        fontWeight:'600'
                    }}
                    allowFontScaling={false}
                    textAlign={'center'}
                    textAlignVertical={'center'}
                    inputAccessoryViewID={props.inputId}
                />

                <Pressable
                    style={{
                        position:'absolute',
                        left:10,
                    }}
                    onPress={props.onMinusPress}
                >
                    <Feather name={'minus'} size={20} color={'#777777'} />
                </Pressable>
                <Pressable
                    style={{
                        position:'absolute',
                        right:10,
                    }}
                    onPress={props.onPlusPress}
                >
                    <Feather name={'plus'} size={20} color={'#777777'} />
                </Pressable>
            </View>
        </View>
)
}



export default memo(OrderBoxInput);
