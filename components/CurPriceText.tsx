import {memo} from "react";
import {Pressable, View, Text} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {TextProps} from "@/components/Themed";
import {useRecoilValue} from "recoil";
import {curCoinPriceState} from "@/atom/coinListAtom";
import {number} from "prop-types";


function CurPriceText(props: TextProps) {

    const curCoinPrice = useRecoilValue(curCoinPriceState);

    return(
        <Text {...props}>
            {Number(curCoinPrice)}
        </Text>
)
}



export default memo(CurPriceText);
