import {Text, View} from "react-native";

function TripHome({route}:any) {
    return (
        <View>
            <Text>{route.params.title}</Text>
        </View>
    )
}

export default TripHome;
