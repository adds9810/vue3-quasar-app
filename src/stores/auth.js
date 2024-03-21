import { useLocalStorage, StorageSerializers } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // const user = ref(null); // user를 담는 반응형 변수
  // useLocalStorage(key, 초기값, opt) 적용
  const user = useLocalStorage("auth/user", null, {
    serializer: StorageSerializers.object, // 입출력 데이터값을 변화해 줌
  });
  const isAuthenticated = computed(() => !!user.value); // 로그인 여부에 따른 상태값 전달
  const uid = computed(() => user.value?.uid || null); // 유저 id를 가져오는 함수

  // user의 상태를 변경할 수 있는 함수
  const setUser = (userData) => {
    console.log("userData : ", userData);
    user.value = userData;

    // 유저정보가 있는지에 따른 정보 담기/리셋 실행
    if (userData) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
      };
    } else {
      user.value = null;
    }
  };

  // 사용할 수 있도록 return
  return {
    user,
    isAuthenticated,
    uid,
    setUser,
  };
});
