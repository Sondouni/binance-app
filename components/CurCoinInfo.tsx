import {memo} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useRecoilValue} from "recoil";
import {curCoinPriceState} from "@/atom/coinListAtom";
import Colors from "@/constants/Colors";


function CurCoinInfo() {

    const {price,percent,lp,hp,volume,count} = useRecoilValue(curCoinPriceState);

    return(
        <View
            style={styles.container}
        >
            <View>
                <Text style={styles.price}>
                    {Number(price)}
                </Text>
                <Text style={[styles.percent,{color:Number(percent)>0?Colors.positive:Colors.negative}]}>
                    {`${Number(percent)>0?'+':'-'}${Number(percent)}%`}
                </Text>
            </View>
            <View style={{gap:15,flexDirection:'row'}}>
                <View
                    style={styles.infoBox}
                >
                    <View>
                        <Text style={styles.infoT}>
                            {'24h High'}
                        </Text>
                        <Text style={styles.infoText}>
                            {Number(hp)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.infoT}>
                            {'24h Low'}
                        </Text>
                        <Text style={styles.infoText}>
                            {Number(lp)}
                        </Text>
                    </View>
                </View>
                <View
                    style={styles.infoBox}
                >
                    <View>
                        <Text style={styles.infoT}>
                            {'24h Count'}
                        </Text>
                        <Text style={styles.infoText}>
                            {Number(count)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.infoT}>
                            {'24h Vol(USDT)'}
                        </Text>
                        <Text style={styles.infoText}>
                            {Number(volume)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
)
}



export default memo(CurCoinInfo);

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        // marginVertical:15
        height:100
    },
    price:{
        fontSize:30,
        fontWeight:'600'
    },
    percent:{
        fontSize:20,
        fontWeight:'500'
    },
    infoBox:{
        // flexDirection:'row',
        alignItems:'flex-start',
        gap:15,

    },
    infoT:{
        fontSize:13,
        color:Colors.textGray,
    },
    infoText:{
        fontSize:13,
        marginTop:3
    }
})
