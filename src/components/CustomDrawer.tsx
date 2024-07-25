import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import React from "react";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {palette} from "../styles/colors.ts";

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
            {/*<View style={{*/}
            {/*    // borderTopWidth: 1,*/}
            {/*    // borderTopColor: palette.border,*/}
            {/*    paddingVertical: 10,*/}
            {/*    position: 'absolute',*/}
            {/*    bottom: 0,*/}
            {/*    width: '100%',*/}
            {/*}}><DrawerItem label={"⚙️ Settings"} onPress={() => {}}/></View>*/}
        </SafeAreaView>
    );
}
