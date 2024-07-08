<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <!-- 필요한 위치에 컴포넌트 추가 -->
      <PostLeftBar class="col-grow" v-model:category="params.category" />
      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="posts" />
      </section>
      <PostRightBar
        class="col-3"
        v-model:tags="params.tags"
        @open-write-dialog="openWriteDialog"
      />
    </div>
    <!-- :model-value="postDialog"
    @update:model-value="val => (postDialog = val)" -->
    <PostWriteDialog
      v-model="postDialog"
      @complete="completeRegistrationPost"
    />
    <!--<section class="q-qutter-y-sm q-mt-lg">
      <q-card v-for="id in 100" :key="id" @click="goPostDetails(id)">

          * @click="($event) => goPostDetails(id)"에서 '($event) =>' 가이드를 원하지 않을 경우
          .vscode -> settings.json에 "volar.inlayHints.eventArgumentInInlineHandlers": false 추가

        <q-card-section>{{ id }}번 게시글</q-card-section>
      </q-card> -->
    <!--컴포넌트 및 props 연결
      <PostList :items="posts" />
    </section> -->
  </q-page>
  <!--
    * router.link 와 router.push를 구분해서 필요할 때 사용하자
     - router.link : href가 추가되어 seo 수집, 최적화에 좋음, 포탈에서 크롤링 하기 좋아 노출이 잘 됨
     - router.push : 노출하면 안 되는 페이지(관리자 페이지)를 연결할 때 좋음
  -->
</template>

<script setup>
// 상태를 나타낼 변수를 불러오게 함
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import { getPosts } from "src/services";
import { useAsyncState } from "@vueuse/core";
// components 연결
import PostList from "src/components/apps/post/PostList.vue";
import PostHeader from "./components/PostHeader.vue";
import PostLeftBar from "./components/PostLeftBar.vue";
import PostRightBar from "./components/PostRightBar.vue";
import PostWriteDialog from "src/components/apps/post/PostWriteDialog.vue";

const router = useRouter();
// 조건 params 변수 생성
const params = ref({
  category: null,
  tags: [],
  sort: "createdAt",
});
// const goPostDetails = (id) => router.push(`/posts/${id}`);

// 반복문을 사용해 만들기
// const posts = Array.from(Array(20), (_, index) => ({
//   id: "A" + index,
//   title: "Vue3 Firebase 강의 " + index,
//   content:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed temporibus magnam nostrum illum sunt quo exercitationem repellendus eaque hic, aliquid labore consequuntur, natus itaque porro dolorem error esse facere ipsum.",
//   readCount: 1,
//   commentCount: 2,
//   likeCount: 3,
//   bookmarkCount: 4,
//   tags: ["html", "css", "javascript"],
//   uid: "uid",
//   category: "카테고리" + index,
// }));

const { state: posts, execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
});
watch(params, () => execute(0, params.value), {
  deep: true,
  immediate: true,
});

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};
const completeRegistrationPost = () => {
  postDialog.value = false;
  execute(0, params.value);
};
</script>

<style lang="scss" scoped></style>
