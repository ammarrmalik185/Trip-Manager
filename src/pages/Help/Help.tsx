import {Linking, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles.ts";
import InAppReview from "react-native-in-app-review";
import React from "react";

export default function Help() {
    return (
        <ScrollView style={{...styles.main, paddingHorizontal: 20}}>

            {/*<View style={{height: 20}}/>*/}
            {/*<Text style={styles.subTitle}>Help</Text>*/}
            {/*<TouchableOpacity onPress={() => {*/}

            {/*}} style={styles.horizontalStackContained}>*/}
            {/*    <Text style={styles.acceptButtonText}>Getting Started</Text>*/}
            {/*</TouchableOpacity>*/}

            <View style={{height: 20}}/>
            <Text style={styles.subTitle}>Feedback</Text>
            <TouchableOpacity onPress={() => {
                InAppReview.RequestInAppReview()
                    .then((hasFlowFinishedSuccessfully) => {
                        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
                        console.log(
                            'InAppReview in ios has launched successfully',
                            hasFlowFinishedSuccessfully,
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }} style={styles.horizontalStackContained}>
                <Text style={styles.acceptButtonText}>Rate on Store</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                Linking.openURL('mailto:ammarrmalik186@gmail.com')
            }} style={styles.horizontalStackContained}>
                <Text style={styles.acceptButtonText}>Email your feedback</Text>
            </TouchableOpacity>

            <View style={{height: 20}}/>
            <Text style={styles.subTitle}>About the app</Text>
            <Text style={styles.acceptButtonText}>Version: {require('../../../package.json').version}</Text>

        </ScrollView>
    )
}
