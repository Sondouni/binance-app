import {memo} from "react";
import {Pressable, View, Text} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type HeaderProps = {
    title: string;
    backBtn?: boolean;
    onBackBtn?: () => void;
};

function Header({
                    title,
                    backBtn=true,
                    onBackBtn,
                }: HeaderProps) {
    return(
        <View
            style={{
                width: '100%',
                height: 35,
                flexDirection:'row',
                backgroundColor:'red'
            }}>
            {backBtn && (
                <Pressable
                    onPress={onBackBtn}
                    style={{
                        // position: 'absolute',
                        width: 60,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
                </Pressable>
            )}
            <View
                style={{
                    flex: 1,
                    // marginHorizontal: 60,
                    // alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{fontSize:20,fontWeight:'600'}}>{title}</Text>
            </View>
        </View>
)
}



export default memo(Header);
