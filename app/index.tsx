import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

import { Text, View } from '@/components/Themed';
import {useEffect} from "react";
import {COIN_LIST, getCoinList} from "@/assets/apis";
import {useQuery} from "@tanstack/react-query";
import {CoinList} from "@/components/CoinList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {useSetRecoilState} from "recoil";
import {coinListState} from "@/atom/coinListAtom";

export default function TabOneScreen() {

  const setCoinList = useSetRecoilState(coinListState);

  const {data,isLoading,error} = useQuery({
    queryKey:[COIN_LIST],
    queryFn:getCoinList
  });

  useEffect(() => {
    if(data){
      setCoinList(data);
    }
  }, [data]);

  return (
    <SafeAreaView style={{backgroundColor:'#FFF'}}>
      {isLoading &&
          <View style={styles.loadingContainer}>
            <Text>
              잠시만 기다려 주세요...
            </Text>
          </View>
      }
      {error &&
          <View style={styles.loadingContainer}>
            <Text>
              에러발생. 앱을 다시시작 해주세요.
            </Text>
          </View>
      }
      {!isLoading && data &&
          <View>
            <View
              style={{
                padding:20,
              }}
            >
              <View
                style={{
                  flexDirection:'row',
                  backgroundColor:'rgba(213,213,213,0.5)',
                  alignItems:'center',
                  padding:5,
                  borderRadius:10
                }}
              >
                <FontAwesome5 name="search" size={20} color={'000'} />
                <Text>
                  Search Coin Pairs
                </Text>
              </View>
            </View>
            <CoinList data={data}/>
          </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
