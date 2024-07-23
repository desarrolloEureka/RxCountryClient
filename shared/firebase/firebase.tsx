// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { config as configDotenv } from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
);
// const firebaseConfigPro = JSON.parse(
//     process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
// );

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
