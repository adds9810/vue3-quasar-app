<template>
  <!-- @hide="onHide" 닫기 버튼 클릭시 초기화 되도록 -->
  <q-dialog
    persistent
    v-bind="$attrs"
    @hide="onHide"
    transition-show="none"
    transition-hide="none"
  >
    <q-card :style="{ minWidth: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
      />
    </q-card>
  </q-dialog>
</template>

<!-- <script>
export default {
  inheritAttrs: false,
};
</script> -->
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
import PostForm from "./PostForm.vue";

const form = ref(getInitialForm());

// 창 닫으면 초기화 되는 이벤트
const onHide = () => {
  form.value = getInitialForm();
};
</script>

<style lang="scss" scoped></style>
