<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <!-- 필요한 위치에 컴포넌트 추가 -->
      <PostLeftBar class="col-grow" />
      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>
      <PostRightBar class="col-3" @open-write-dialog="openWriteDialog" />
    </div>
    <PostWriteDialog v-model="postDialog" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
// components 연결
import PostList from "src/components/apps/post/PostList.vue";
import PostHeader from "src/pages/components/PostHeader.vue";
import PostLeftBar from "src/pages/components/PostLeftBar.vue";
import PostRightBar from "src/pages/components/PostRightBar.vue";
import PostWriteDialog from "src/components/apps/post/PostWriteDialog.vue";

const router = useRouter();
// const goPostDetails = (id) => router.push(`/posts/${id}`);

// 반복문을 사용해 만들기
const posts = Array.from(Array(20), (_, index) => ({
  id: "A" + index,
  title: "Vue3 Firebase 강의 " + index,
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed temporibus magnam nostrum illum sunt quo exercitationem repellendus eaque hic, aliquid labore consequuntur, natus itaque porro dolorem error esse facere ipsum.",
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  tags: ["html", "css", "javascript"],
  uid: "uid",
  category: "카테고리" + index,
}));

const postDialog = ref(true);
const openWriteDialog = () => {
  postDialog.value = true;
};
</script>

<style lang="scss" scoped></style>
