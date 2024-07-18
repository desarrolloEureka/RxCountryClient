// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { config as configDotenv } from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC2yJFccHS8v9EFAuhJNS3XT5kFY2znL38",
    authDomain: "rxcountry-backoffice.firebaseapp.com",
    projectId: "rxcountry-backoffice",
    storageBucket: "rxcountry-backoffice.appspot.com",
    messagingSenderId: "150291031577",
    appId: "1:150291031577:web:0b17b2757cecf3f6a6ac88",
    measurementId: "G-NVG2EXRMDV",
    backendBaseUrl:
        "https://us-central1-rxcountry-backoffice.cloudfunctions.net/api",
};

const firebaseConfigDev = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
);
const firebaseConfigPro = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
);

// const firebaseConfig =
//     process.env.NODE_ENV === "production"
//         ? firebaseConfigPro
//         : firebaseConfigDev;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db, firebaseConfig };
