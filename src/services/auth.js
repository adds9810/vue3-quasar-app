import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "src/boot/firebase";

const DEFAULT_PTOTO_URL =
  "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=";

// 로그인 (구글)
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  console.log("user: ", result.user);
  return user;
}

// 로그아웃 (구글)
export async function logout() {
  await signOut(auth);
}

// 회원가입
export async function signUpWithEmail({ email, password, nickname }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: nickname,
    photoURL: generateDefaultPhotoURL(user.uid),
  });
  console.log("user: ", user);
}

// 기본 이미지 설정
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PTOTO_URL}${uid}`;
}

// 로그인(이메일)
export async function signInWithEmail({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
