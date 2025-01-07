import {Pressable, StyleSheet, Text} from "react-native";
import Colors from "@/constants/Colors";

type orderBookShortListRowProps = {
    price:string;
    amount:string;
    isAsk:boolean;
    setOrderPrice:any;
}

export function OrderBookShortListRow(props:orderBookShortListRowProps) {
    return (
        <Pressable
            onPress={()=>props.setOrderPrice(`${Number(props.price)}`)}
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                backgroundColor:props.isAsk?Colors.negativeBack:Colors.positiveBack,
                paddingVertical:4
            }}
        >
            <Text style={[styles.text,{color:props.isAsk?Colors.negative:Colors.positive}]}>
                {Number(props.price)}
            </Text>
            <Text style={styles.text}>
                {Number(props.amount)}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text:{
        fontSize:15,
        fontWeight:'400',
    }
})
