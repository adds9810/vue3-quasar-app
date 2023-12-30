<template>
  <!-- @hide="onHide" 닫기 버튼 클릭시 초기화 되도록 -->
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ width: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>
      <q-separator />
      <q-form class="q-pa-md q-gutter-y-sm">
        <q-input v-model="form.title" outlined placeholder="제목" />
        <!-- select는 placeholder가 안됨.. 그래서 아래와 같이 사용 -->
        <q-select v-model="form.category" outlined :options="categories">
          <template v-if="!form.category" #selected>
            <span class="text-grey-7">카테고리를 선택하세요.</span>
          </template>
        </q-select>
        <q-input
          v-model="form.content"
          type="textarea"
          outlined
          placeholder="내용을 작성해주세요~!"
        />
        <q-input
          v-model="tagField"
          outlined
          placeholder="태그를 입력해주세요~! (입력 후 Enter)"
          prefix="#"
        />
        <q-chip outline dense color="teal" removable @remove="removeTag"
          >vuejs</q-chip
        >
      </q-form>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn type="submit" flat label="저장하기" color="primary" />
      </q-card-actions>
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
import { getCategories } from "src/services/category";

const categories = getCategories();

const form = ref(getInitialForm());
const tagField = ref("");

// 태그 삭제 이벤트
const removeTag = () => {
  console.log("removeTag");
};
// 창 닫으면 초기화 되는 이벤트
const onHide = () => {
  form.value = getInitialForm();
  // tagField따로 초기화
  tagField.value = "";
};
</script>

<style lang="scss" scoped></style>
