<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense to="/">
          <q-toolbar-title>
            <q-avatar>
              <img src="/logo.png" />
            </q-avatar>
            짐코딩 클럽
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <!-- to : 내부링크 / href : 외부링크 -->
        <q-btn stretch flat label="Home" to="/home" />
        <q-btn
          stretch
          flat
          label="수강하기"
          href="https://google.com"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="온라인 강의"
          href="https://edu.gymcoding.co"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="유튜브"
          href="https://youtube.com/@gymcoding"
          target="_blank"
        />
        <q-separator class="q-my-md q-mr-md" vertical />
        <!-- AuthDialog 4. 열기 이벤트 세팅-->
        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevated
          rounded
          color="primary"
          label="로그인 / 회원가입"
          @click="openAuthDialog"
        />
        <q-btn v-if="authStore.isAuthenticated" round flat>
          <q-avatar>
            <img
              :src="
                authStore.user.photoURL ||
                generateDefaultPhotoURL(authStore.user.uid)
              "
            />
            <!-- 로그인한 유저의 썸네일 -->
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 140px">
              <q-item
                v-if="authStore.user.emailVerified"
                clickable
                v-close-popup
                to="/mypage/profile"
              >
                <q-item-section>프로필</q-item-section>
              </q-item>
              <q-item v-else clickable v-close-popup>
                <q-item-section class="text-red" @click="verifyEmail"
                  >이메일을 인증해주세요.</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
    <!-- AuthDialog 2. AuthDialog 불러오기 및 상태연결  -->
    <AuthDialog v-model="authDialog" />
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router"; // meta 속성을 가져와야 하기 때문에 추가
import { useAuthStore } from "src/stores/auth";
// AuthDialog 1. AuthDialog컴포넌트 불러오기
import {
  logout,
  generateDefaultPhotoURL,
  sendVerificationEmail,
} from "src/services";

import AuthDialog from "src/components/auth/AuthDialog.vue";

const $q = useQuasar();

const authStore = useAuthStore();

const route = useRoute();
// debugger;
// console.dir(route); 객체 찍기
const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || "1080px", // 각 화면에 지정된 너비가 있으면 그걸로, 없으면 1080px 적용
  margin: "0 auto",
}));

// AuthDialog 3. authDialog 상태관리 설정
const authDialog = ref(false);
// AuthDialog 4. 열기 이벤트 세팅
const openAuthDialog = () => (authDialog.value = true);
const handleLogout = async () => {
  await logout();
  $q.notify("로그아웃 되었습니다.");
};

const verifyEmail = async () => {
  await sendVerificationEmail();
  $q.notify("이메일을 확인해주세요!");
};
</script>
