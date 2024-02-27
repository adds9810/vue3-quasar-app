import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "src/boot/firebase.js";

// 로그인(구글)
export async function signInWidthGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  // test
  console.log("user:", result.user);
}
