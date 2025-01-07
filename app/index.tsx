import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

import {Text, View} from '@/components/Themed';
import {useEffect, useRef} from "react";
import {COIN_LIST, getCoinList} from "@/assets/apis";
import {useQuery} from "@tanstack/react-query";
import {CoinList} from "@/components/CoinList";
import {useSetRecoilState} from "recoil";
import {coinListState} from "@/atom/coinListAtom";
import CoinSearchInput from "@/components/CoinSearchInput";

export default function TabOneScreen() {

  const setCoinList = useSetRecoilState(coinListState);
  const inputRef = useRef<TextInput>(null);

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
    <SafeAreaView style={{backgroundColor:'#FFF',flex:1}}>
      {isLoading &&
          <View style={styles.loadingContainer}>
            <Text>
              Please wait...
            </Text>
          </View>
      }
      {error &&
          <View style={styles.loadingContainer}>
            <Text>
              Please re-open the app.
            </Text>
          </View>
      }
      {!isLoading && data &&
          <View style={{flex:1}}>
            <CoinSearchInput inputRef={inputRef}/>
            <CoinList inputRef={inputRef}/>
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
