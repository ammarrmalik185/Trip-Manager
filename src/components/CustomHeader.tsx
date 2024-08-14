import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/styles.ts";

const CustomHeader = ({ title } : any) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>

            <ImageBackground style={styles.backgroundImage} source={require("../images/uiImages/tripImages/trip.jpg")}/>
            <View style={{...styles.backgroundImage, backgroundColor: "rgba(0,0,0,0.7)"}}/>

            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image style={styles.headerMenu} source={require("../images/uiImages/menu.png")}/>
            </TouchableOpacity>

            <View style={styles.headerTitleStack}>
                {/*<Image style={styles.appIconSmall} source={require("../images/ic_launcher.png")}/>*/}
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

        </View>
    );
};

export default CustomHeader;
