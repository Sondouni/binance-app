import {Dimensions, SafeAreaView, StyleSheet, View, Text, ScrollView} from "react-native";
import {CandlestickChart} from "react-native-wagmi-charts";

export function BarChartComponent(props) {
    return (
        <View style={{ maxHeight: 400, }}>
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
