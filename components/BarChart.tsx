import {Dimensions, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {CandlestickChart} from "react-native-wagmi-charts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {COIN_CHART, getCoinChart} from "@/assets/apis";
import Colors from "@/constants/Colors";
import {useEffect, useState} from "react";

const windowWidth = Dimensions.get('window').width;

const timeList:string[] = ['1m','5m','15m','1h','4h','1d','1M']

export function BarChartComponent(props:{orderSymbol:string}) {

    const queryClient = useQueryClient();

    const [time,setTime] = useState<string>('1M');

    //todo 이렇게 refetch를 하면 안될것같은데... 확인하기
    const {data,isLoading,error} = useQuery<any>({
        queryKey:[COIN_CHART,time],
        queryFn:(t)=>getCoinChart(props.orderSymbol,time)
    });

    useEffect(() => {
        return () => {
            queryClient.removeQueries({ queryKey: [COIN_CHART] });
        }
    }, []);

    return (
        <View
            style={{
                height:450,
            }}
        >
            <ScrollView
                horizontal={true}
                bounces={false}
            >
                <View style={styles.timeCon}>
                    <Text
                        style={styles.timeText}
                    >
                        Time
                    </Text>
                </View>
                {timeList.map((t,ti)=>{
                    return(
                        <Pressable onPress={()=>setTime(t)} key={t} style={styles.timeCon}>
                            <Text style={[styles.timeText,t===time?{color: '#000',fontWeight: '600'}:{}]}>
                                {t}
                            </Text>
                        </Pressable>
                    )
                })}
            </ScrollView>
            {data &&
                <View style={{ flexDirection:'row' }}>
                    <CandlestickChart.Provider data={data.calCharList}>
                        <CandlestickChart
                            width={windowWidth-80}
                            height={400}
                        >
                            <CandlestickChart.Candles />
                            <CandlestickChart.Crosshair>
                                <CandlestickChart.Tooltip />
                            </CandlestickChart.Crosshair>
                        </CandlestickChart>
                    </CandlestickChart.Provider>
                    <View
                        style={styles.textContainer}
                    >
                        <View
                            style={styles.textBox}
                        >
                            <Text style={styles.text}>
                                {data.maxPrice}
                            </Text>
                        </View>

                        <View
                            style={styles.textBox}
                        >
                            <Text style={styles.text}>
                                {data.middleMaxPrice}
                            </Text>
                        </View>
                        <View
                            style={styles.textBox}
                        >
                            <Text style={styles.text}>
                                {data.middleMinPrice}
                            </Text>
                        </View>
                        <View
                            style={styles.textBox}
                        >
                            <Text style={styles.text}>
                                {data.minPrice}
                            </Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    textContainer:{
        // width:80,
        height:'100%',
        justifyContent:'space-between',
        // paddingVertical:10,
        position:'absolute',
        width:'100%',
    },
    textBox:{
        borderColor:'rgba(174,174,174,0.5)',
        borderBottomWidth:0.5,
        width:'100%',
        paddingHorizontal:10,
        alignItems:'flex-end',
    },
    text:{
        color:Colors.textGray,
        fontSize:12,
    },
    timeCon:{
        paddingVertical:5,
        paddingHorizontal:10,
    },
    timeText:{
        fontSize:15,
        fontWeight:'400',
        color:Colors.textGray,
    }
})
