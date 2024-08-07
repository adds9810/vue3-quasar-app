import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthStore } from "src/stores/auth";

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
const db = getFirestore(app);

// 인증을 외부에서도 사용하게 하기 위해 내보내기
export { auth, db };

export default boot(async (/* { app, router, ... } */) => {
  // onAuthStateChanged - 로그인/로그아웃시 사용자의 정보를 가져옴
  onAuthStateChanged(auth, (user) => {
    const authStore = useAuthStore();
    console.log("user : ", user);
    authStore.setUser(user);
  });
});
