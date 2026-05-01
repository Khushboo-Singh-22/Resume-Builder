// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyBDl_HjtmxoeRR0DajhTRT2sKw88xmKpD8",
  authDomain: "resumebuilder-985e6.firebaseapp.com",
  projectId: "resumebuilder-985e6",
  storageBucket: "resumebuilder-985e6.firebasestorage.app",
  messagingSenderId: "889515248652",
  appId: "1:889515248652:web:8322682dccb28f55ccf229",
  measurementId: "G-CTVS5NF0DV"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configure Facebook provider with proper parameters
facebookProvider.setCustomParameters({
  display: 'popup'
});

// Add required scopes for Facebook login
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Add additional scopes if needed
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');