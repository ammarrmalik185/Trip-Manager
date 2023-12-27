import {StyleSheet, Text, View} from "react-native";

export function TripListItem({item}: any){
    return  <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date.from} to {item.date.to}</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#5c69fa',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
    },
    date: {
        fontSize: 18,
        color: 'white',
    },
});

