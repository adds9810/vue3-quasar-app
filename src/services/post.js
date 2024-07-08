import { db } from "boot/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
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

// 글 작성 기능 구현
export async function getPosts(params) {
  console.log("### params : ", params);
  // 1] 컬렉션에 있는 모든 문서 조회
  // const querySnapshot = await getDocs(collection(db, 'posts'));
  // // const posts = [];
  // // querySnapshot.forEach(docs => {
  // //   // doc.data() is never undefined for query doc snapshots
  // //   console.log(docs.id, ' => ', docs.data());
  // //   posts.push(docs.data());
  // // });
  // const posts = querySnapshot.docs.map(docs => {
  //   const data = docs.data();
  //   return {
  //     ...data,
  //     id: docs.id,
  //     createdAt: data.createdAt?.toDate(),
  //   };
  // });
  // console.log(posts);

  // 1] 컬렉션에 있는 문서를 쿼리해서 조회
  const conditions = [];
  if (params?.category) {
    conditions.push(where("category", "==", params?.category));
  }
  if (params?.tags && params?.tags.length > 0) {
    conditions.push(where("tags", "array-contains-any", params?.tags));
  }
  if (params?.sort) {
    conditions.push(orderBy(params.sort, "desc"));
  }

  const q = query(collection(db, "posts"), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((docs) => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  return posts;
}
