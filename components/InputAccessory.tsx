import {Text} from './Themed';
import {InputAccessoryView, Pressable, View} from "react-native";

type InputAccessoryProps = {
  id: string;
  text: string;
  onPress: () => void;
}

export function InputAccessory(props: InputAccessoryProps) {
  return <InputAccessoryView
      nativeID={props.id}
  >
    <View
        style={{
          height:35,
          backgroundColor:'rgb(230,230,230)',
          alignItems:'flex-end',
          justifyContent:'center',
          paddingHorizontal:20,
        }}
    >
      <Pressable
          onPress={props.onPress}
      >
        <Text
            style={{
              fontSize:18,
              fontWeight:'600'
            }}
        >
          {props.text}
        </Text>
      </Pressable>
    </View>
  </InputAccessoryView>;
}
