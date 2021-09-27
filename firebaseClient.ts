import firebaseClient from "firebase/app";
import "firebase/auth";

/*

Copy/paste your *client-side* Firebase credentials below. 

To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.

*/
const CLIENT_CONFIG  = {
  apiKey: "AIzaSyAehcf95KXKzkjFE3hUPSxq30wqdkAfxRk",
  authDomain: "apparel-mason.firebaseapp.com",
  databaseURL: "https://apparel-mason.firebaseio.com",
  projectId: "apparel-mason",
  storageBucket: "apparel-mason.appspot.com",
  messagingSenderId: "646249915911",
  appId: "1:646249915911:web:164cb8f86b3f0d055eeca2",
  measurementId: "G-3MD0M5EZLK"
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
