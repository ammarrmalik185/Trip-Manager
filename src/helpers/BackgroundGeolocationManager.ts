import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';
import Geolocation from "react-native-geolocation-service";
import {requestBGLocationPermission} from "./PermissionsHelper.ts";
import {Logger} from "./Logger.ts";
import {trip} from "../types/trip.ts";
import {geoLog} from "../types/geoLog.ts";


export class BackgroundGeolocationManager {

    static startBackgroundTracking(currentTrip: trip) {

        requestBGLocationPermission().then((permissionGranted) => {
            BackgroundGeolocationManager.configure(currentTrip);
            if (permissionGranted) {
                BackgroundFetch.start();

                PushNotification.localNotification({
                    channelId: "location-tracking",
                    title: "Tracking Location",
                    message: "Your location is being tracked for the trip: " + currentTrip.title,
                    invokeApp: true,
                    autoCancel: false,
                });
            }
        });


    }


    static configure(currentTrip: trip) {

        PushNotification.createChannel(
            {
                channelId: "location-tracking", // (required)
                channelName: "Location Tracking", // (required)
            },
            (created: any) => console.log(`createChannel returned '${created}'`)
        );

        BackgroundFetch.configure(
            {
                minimumFetchInterval: 5,
                stopOnTerminate: false,
                startOnBoot: true,
                enableHeadless: true,

            },
            async (taskId) => {
                Geolocation.getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    console.log({lat: latitude, lng: longitude});
                    currentTrip.geoLogs.push(new geoLog(new Date(Date.now()), latitude, longitude));
                    currentTrip.saveTrip();
                    console.log(currentTrip)
                }, (error) => {
                    Logger.error(error.message);
                }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
                BackgroundFetch.finish(taskId);
            },
            (error) => {
                console.error('Background Fetch failed:', error);
            },
        );
        BackgroundFetch.status((status) => {
            switch (status) {
                case BackgroundFetch.STATUS_RESTRICTED:
                    console.log("BackgroundFetch restricted");
                    break;
                case BackgroundFetch.STATUS_DENIED:
                    console.log("BackgroundFetch denied");
                    break;
                case BackgroundFetch.STATUS_AVAILABLE:
                    console.log("BackgroundFetch is enabled");
                    break;
            }
        });

        PushNotification.configure({
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                if (notification.action === "Stop") {
                    BackgroundGeolocationManager.stopBackgroundTracking()
                }
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                if (notification.action === "Stop") {
                    console.log("Stop action triggered");
                    BackgroundGeolocationManager.stopBackgroundTracking()
                }
            },
        });
    }

    static stopBackgroundTracking() {
        PushNotification.cancelAllLocalNotifications();
        BackgroundFetch.stop().then(console.log).catch(console.error);
    }

}
