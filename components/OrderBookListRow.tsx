import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "@/constants/Colors";

type orderBookShortListRowProps = {
    price:string;
    amount:string;
    isAsk:boolean;
    setOrderPrice:any;
}

export function OrderBookShortListRow(props:orderBookShortListRowProps) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 3,
            }}
        >
            <Text
                style={{
                    color: props.isAsk?Colors.positive:'#000'
                }}
            >
                {props.isAsk?Number(props.price):Number(props.amount)}
            </Text>
            <Text
                style={{
                    color: props.isAsk?'#000':Colors.negative
                }}
            >
                {props.isAsk?Number(props.amount):Number(props.price)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text:{
        fontSize:15,
        fontWeight:'400',
    }
})
