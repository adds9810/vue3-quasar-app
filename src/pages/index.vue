<template>
  <div>
    <div class="text-h4">커뮤니티 목록</div>
    <section class="q-qutter-y-sm q-mt-lg">
      <q-card v-for="id in 100" :key="id" @click="goPostDetails(id)">
        <!--
          * @click="($event) => goPostDetails(id)"에서 '($event) =>' 가이드를 원하지 않을 경우
          .vscode -> settings.json에 "volar.inlayHints.eventArgumentInInlineHandlers": false 추가
        -->
        <q-card-section>{{ id }}번 게시글</q-card-section>
      </q-card>
    </section>
  </div>
  <!-- 
    * router.link 와 router.push를 구분해서 필요할 때 사용하자
     - router.link : href가 추가되어 seo 수집, 최적화에 좋음, 포탈에서 크롤링 하기 좋아 노출이 잘 됨
     - router.push : 노출하면 안 되는 페이지(관리자 페이지)를 연결할 때 좋음 
  -->
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goPostDetails = (id) => router.push(`/posts/${id}`);
</script>

<style lang="scss" scoped></style>
