import {StyleSheet, TextInput, View} from "react-native";
import {memo} from "react";
import {useRecoilState} from "recoil";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {searchCoinState} from "@/atom/coinListAtom";

function CoinSearchInput(props:{inputRef:any}) {

    const [search, setSearch] = useRecoilState<string>(searchCoinState);

    return(
        <View
            style={style.container}
        >
            <FontAwesome5 name="search" size={20} color={'000'} />
            <TextInput
                ref={props.inputRef}
                value={search}
                onChangeText={(val)=>setSearch(val)}
                style={style.input}
                allowFontScaling={false}
                placeholder={'Search Coin Pairs'}
            />
        </View>
    )
}

export default memo(CoinSearchInput);

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(220,220,220,0.4)',
        borderRadius:10,
        paddingHorizontal:10,
        // height:30,
        marginHorizontal:20,
        paddingVertical:10
    },
    input:{
        // paddingVertical:10,
        borderRadius:10,
        fontSize:15,
        padding:0,
        margin:0,
        fontWeight:'600',
        flex:1,
        marginLeft:10
    }
})
