import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {Logger} from './Logger';  // Adjust import path if necessary

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL!,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.REACT_APP_FIREBASE_APP_ID!,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

class FirebaseManager {

  basePath;
  database;
  auth;
  storage;

  constructor() {
    this.basePath = 'userData';
    this.database = database();
    this.auth = auth();
    this.storage = storage();
    this.initGoogleSignin();
  }

  initGoogleSignin() {
    Logger.log("Setting up google login: " + process.env.GOOGLE_SIGNIN_WEBCLIENT_ID)
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_SIGNIN_WEBCLIENT_ID, // Replace with your web client ID from Firebase console
    });
  }

  async signInWithGoogle() {
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        Logger.log("1")
        const result = await GoogleSignin.signIn();
        Logger.log("2")
        const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
        Logger.log("3")
        await auth().signInWithCredential(googleCredential);
        Logger.log('User signed in with Google');
      } catch (error: any) {
        Logger.error('Firebase Google Sign-In Error: ' + error.message);
      }
  }

  async saveJsonUserdata(json: any) {
    if (this.auth.currentUser) {
      try {
        const userId = this.auth.currentUser.uid;
        const expenseRef = this.database.ref(`${this.basePath}/${userId}`);
        await expenseRef.set(json);
        Logger.log('Firebase Data saved!');
      } catch (error) {
        Logger.error('Firebase Error saving data: ' + error);
      }
    } else {
      Logger.error('Firebase User is not logged in');
    }
  }

  async getJsonUserdata() : Promise<any>{
    if (this.auth.currentUser) {
      try {
        const userId = this.auth.currentUser.uid;
        const expenseRef = this.database.ref(`${this.basePath}/${userId}`);
        let data : any;
        await expenseRef.once("value", snapshot => {
          data = snapshot.val()
        });
        Logger.log('Firebase Data Retrieved!');
        return data;
      } catch (error) {
        Logger.error('Firebase Error saving data: ' + error);
      }
    } else {
      Logger.error('Firebase User is not logged in');
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
      Logger.log('User signed out');
    } catch (error) {
      Logger.error('Firebase Sign-Out Error: ' + error);
      console.error(error)
    }
  }

  onAuthStateChanged(callback: any) {
    return this.auth.onAuthStateChanged(callback);
  }
}

export default new FirebaseManager();

