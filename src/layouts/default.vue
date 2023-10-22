<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-4">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense to="/">
          <q-toolbar-title>
            <q-avatar>
              <img src="/logo.png" />
            </q-avatar>
            짐코딩클립
          </q-toolbar-title>
        </q-btn>
        <!--  -->
        <q-space />
        <!-- to : 내부링크 / href : 외부링크 -->
        <q-btn stretch flat label="Home" to="/home" />
        <q-btn
          stretch
          flat
          label="수강하기"
          href="https://naver.com"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="온라인 강의"
          href="https://naver.com"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="유튜브"
          href="https://naver.com"
          target="_blank"
        />
        <q-separator dark vertical />
        <q-btn unelevated rounded color="primary" label="로그인 / 회원가입" />
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyle">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router"; // meta 속성을 가져와야 하기 때문에 추가

const route = useRoute();
console.dir(route); // 객체 찍기
const pageContainerStyle = computed(() => ({
  maxWidth: route.meta?.width || "1080px", // 각 화면에 지정된 너비가 있으면 그걸로, 없으면 1080px 적용
  margin: "0 auto",
}));
</script>
