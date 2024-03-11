<template>
  <q-page>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        @submit.prevent
      >
        <!-- 버튼 커스텀 연습 -->
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn type="submit" flat label="수정" color="primary" />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
</template>

<script>
// 초기화 함수, 일반 script에 추가해도 무관
const getInitialForm = () => ({
  title: "",
  category: "",
  content: "",
  tags: [],
});
</script>
<script setup>
import { ref } from "vue";
import BaseCard from "src/components/base/BaseCard.vue";
import PostForm from "src/components/apps/post/PostForm.vue";

const form = ref(getInitialForm());
</script>

<style lang="scss" scoped></style>
<route lang="yaml">
meta: width:800px
</route>
