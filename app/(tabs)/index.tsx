import {FlatList, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {Link} from "expo-router";
import {useEffect} from "react";
import {COIN_LIST, getCoinList} from "@/assets/apis";
import {useQuery} from "@tanstack/react-query";
import {SafeAreaView} from "react-native-safe-area-context";
import {CoinList} from "@/components/CoinList";

export default function TabOneScreen() {

  const {data,isLoading,error} = useQuery({
    queryKey:[COIN_LIST],
    queryFn:getCoinList
  });

  useEffect(() => {
    console.log(data?.length,'data');
  }, [data]);

  useEffect(() => {
    console.log(isLoading,'isLoading');
  }, [isLoading]);

  useEffect(() => {
    console.log(error,'error');
  }, [error]);

  return (
    <SafeAreaView>
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
          <CoinList data={data}/>
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
