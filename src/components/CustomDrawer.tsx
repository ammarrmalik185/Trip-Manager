import {Image, SafeAreaView, Text, View} from "react-native";
import styles from "../styles/styles.ts";
import React from "react";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";

export default function CustomDrawer(props:any) {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.item}>
                <Image
                    style={styles.appIconMedium}
                    source={require('../images/ic_launcher.png')}
                />
                <Text style={styles.subTitle}>Trip Manager</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}
