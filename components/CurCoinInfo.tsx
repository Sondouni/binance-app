import {memo} from "react";
import {Pressable, View, Text} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {TextProps} from "@/components/Themed";
import {useRecoilValue} from "recoil";
import {curCoinPriceState} from "@/atom/coinListAtom";
import {number} from "prop-types";


function CurCoinInfo(props: TextProps) {

    const {price,percent} = useRecoilValue(curCoinPriceState);

    return(
        <Text {...props}>
            {Number(price)}
        </Text>
)
}



export default memo(CurCoinInfo);
