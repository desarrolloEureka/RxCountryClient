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
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

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
