import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "src/boot/firebase";
const DEFAULT_PHOTO_URL =
  "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=";

// 로그인 (구글)
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
}

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
  // console.log("user: ", user);
  sendVerificationEmail(); // 상단까지만 정상 동작하면 실행되도록 await를 추가하지 않음
}

// 기본 이미지 설정
export function generateDefaultPhotoURL(uid) {
  return `${DEFAULT_PHOTO_URL}${uid}`;
}

// 로그인(이메일)
export async function signInWithEmail({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

// 비밀번호 초기화
export async function sendPasswordReset(email) {
  await sendPasswordResetEmail(auth, email);
}

// 비밀번호 변경
export async function updateUserPassword(newPassword) {
  await updatePassword(auth.currentUser, newPassword);
}

// 인증메일 보내기
export async function sendVerificationEmail() {
  await sendEmailVerification(auth.currentUser);
}

// 프로필 변경
export async function updateUserProfile(displayName) {
  await updateProfile(auth.currentUser, {
    displayName,
  });
}

// 이메일 변경
export async function updateUserEmail(email) {
  await updateEmail(auth.currentUser, email);
}
