import {Dimensions, SafeAreaView, StyleSheet, View, Text, ScrollView} from "react-native";
import {CandlestickChart} from "react-native-wagmi-charts";
import {Bar, CartesianChart} from "victory-native";
import aa from "../assets/fonts/SpaceMono-Regular.ttf"
import {useFont} from "@shopify/react-native-skia";

export function BarChartComponent(props) {
    const screenWidth = Dimensions.get("window").width;
    const aaa = useFont(aa,15)
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <View style={{ flex: 1, maxHeight: 400, }}>
                    <CandlestickChart.Provider data={props.data}>
                        <CandlestickChart>
                            <CandlestickChart.Candles />
                            <CandlestickChart.Crosshair>
                                <CandlestickChart.Tooltip />
                            </CandlestickChart.Crosshair>
                        </CandlestickChart>
                        {/*<CandlestickChart.PriceText type="open" />*/}
                        {/*<CandlestickChart.PriceText type="high" />*/}
                        {/*<CandlestickChart.PriceText type="low" />*/}
                        {/*<CandlestickChart.PriceText type="close" />*/}
                        {/*<CandlestickChart.DatetimeText />*/}
                    </CandlestickChart.Provider>
                </View>
                {/*<View*/}
                {/*    style={{*/}
                {/*        flex:1,*/}
                {/*        height:100,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <CartesianChart*/}
                {/*        data={props.data}*/}
                {/*        xKey="timestamp"*/}
                {/*        yKeys={["close"]}*/}
                {/*    >*/}
                {/*        /!* 👇 render function exposes various data, such as points. *!/*/}
                {/*        {({ points,chartBounds }) => (*/}
                {/*            // 👇 and we'll use the Line component to render a line path.*/}
                {/*            <Bar points={points.close} color="red" chartBounds={chartBounds} />*/}
                {/*            // <Line points={points.price} color="red" strokeWidth={3} />*/}
                {/*        )}*/}
                {/*    </CartesianChart>*/}
                {/*</View>*/}
                <View
                    style={{
                        backgroundColor:'red',
                        height:500
                    }}
                >

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    currentPrice: {
        color: "white",
        fontSize: 30,
        fontWeight: "600",
        letterSpacing: 1,
    },
    name: {
        color: "white",
        fontSize: 15,
    },
    priceContainer: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    priceChange: {
        color: "white",
        fontSize: 17,
        fontWeight: "500",
    },
    input: {
        flex: 1,
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        padding: 10,
        fontSize: 16,
        color: "white",
    },
    filtersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2B2B2B",
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 20
    },
    candleStickText: {
        color: "white",
        fontWeight: "700",
    },
    candleStickDataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginTop: 20,
    },
    candleStickTextLabel: {
        color: 'grey',
        fontSize: 13
    }
});
