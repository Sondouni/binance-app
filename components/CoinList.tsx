import {FlatList, View} from "react-native";
import {Text} from "@/components/Themed";

export function CoinList({data}: {data: {symbol:string,price:string,}[]}) {
  return (
      <FlatList
          data={data}
          renderItem={({item})=>
              <View
                style={{
                  flexDirection:'row',
                  justifyContent:'space-between',
                }}
              >
                <Text>
                  {item.symbol}
                </Text>
                <Text>
                  {item.price}
                </Text>
              </View>
          }
      />
  );
}
