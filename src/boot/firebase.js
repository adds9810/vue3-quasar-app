import { boot } from "quasar/wrappers";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpIRmDuVXDUxli27zE_OA2Fwti1tgo9C4",
  authDomain: "vue3-firebace-app.firebaseapp.com",
  projectId: "vue3-firebace-app",
  storageBucket: "vue3-firebace-app.appspot.com",
  messagingSenderId: "412776797753",
  appId: "1:412776797753:web:592f31ee8dc05f1ccedfe8",
  measurementId: "G-4F7F5C3CZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
