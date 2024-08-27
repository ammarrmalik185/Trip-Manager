import PushNotification, {Importance} from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';
import Geolocation from "react-native-geolocation-service";
import {requestBGLocationPermission} from "./PermissionsHelper.ts";
import {Logger} from "./Logger.ts";
import {trip} from "../types/trip.ts";
import {geoLog} from "../types/geoLog.ts";

export enum ReturnCode{
    Success,
    Failure,
    PermissionDenied
}

export class BackgroundGeolocationManager {

    static startBackgroundTracking(currentTrip: trip) {

        requestBGLocationPermission().then((permissionGranted) => {
            if (permissionGranted) {
                BackgroundGeolocationManager.configure(currentTrip);

                BackgroundFetch.start();

                PushNotification.localNotification({
                    channelId: "location-tracking",
                    title: "Tracking Location",
                    message: "Your location is being tracked for the trip: " + currentTrip.title,
                    invokeApp: true,
                    autoCancel: false,
                    // actions: ["Stop"],
                });
            }
        });
    }

    static configure(currentTrip: trip) {

        PushNotification.createChannel(
            {
                channelId: "location-tracking", // (required)
                channelName: "Location Tracking", // (required)
            }, () => {}
        );

        PushNotification.createChannel(
            {
                channelId: "location-tracked", // (required)
                channelName: "Location Point Added", // (required)
                playSound: false,
                vibrate: false,
                importance: Importance.LOW
            }, () => {}
        );

        BackgroundFetch.configure(
            {
                minimumFetchInterval: 5,
                stopOnTerminate: false,
                enableHeadless: true,
                forceAlarmManager: false,
            },
            async (taskId) => {
                Geolocation.getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    currentTrip.geoLogs.push(new geoLog(new Date(Date.now()), latitude, longitude));
                    currentTrip.saveTrip();
                    PushNotification.localNotification({
                        channelId: "location-tracked",
                        title: "Location Point Added",
                        message: "Location point added to the trip: " + currentTrip.title,
                        autoCancel: true,
                        priority: "low",
                        playSound: false,
                    })
                }, Logger.error, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
                BackgroundFetch.finish(taskId);
            },
            (error) => {
                console.error('Background Fetch failed:', error);
            },
        );

        PushNotification.configure({
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                if (notification.action === "Stop") {
                    BackgroundGeolocationManager.stopBackgroundTracking()
                }
            },
        });
    }

    static stopBackgroundTracking() {
        PushNotification.cancelAllLocalNotifications();
        BackgroundFetch.stop();
    }

}
