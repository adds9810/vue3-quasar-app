import { db } from "boot/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// 글 작성 완료 후 상세 페이지로 넘어갈 수 있도록 구현
export async function createPost(data) {
  // id 지정 - setDoc
  // await setDoc(
  //   doc(db, 'posts', 'post-id'),
  //   {
  //     title: 'hello world!',
  //     // ...data,
  //     // readCount: 0,
  //     // likeCount: 0,
  //     // commentCount: 0,
  //     // bookmarkCount: 0,
  //     // createdAt: serverTimestamp(),
  //   },
  //   {
  //     merge: true,
  //   },
  // );

  // 객체와 데이터를 넣을 함수 addDoc 구현
  // collection(파이어베이스 컬렉션 인스턴스 - db / 컬렉션 패스), 데이터
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
