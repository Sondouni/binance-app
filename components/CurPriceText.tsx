import {memo} from "react";
import {Text} from "react-native";
import {TextProps} from "@/components/Themed";
import {useRecoilValue} from "recoil";
import {curCoinPriceState} from "@/atom/coinListAtom";


function CurPriceText(props: TextProps) {

    const {price,percent} = useRecoilValue(curCoinPriceState);

    return(
        <Text {...props}>
            {Number(price)}
        </Text>
)
}



export default memo(CurPriceText);
