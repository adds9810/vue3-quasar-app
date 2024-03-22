<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-pa-md q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <!-- select는 placeholder가 안됨.. 그래서 아래와 같이 사용 -->
      <q-select
        v-model="categoryModel"
        outlined
        :options="categories"
        emit-value
        map-options
        hide-bottom-space
        :rules="[validateRequired]"
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptapEditor v-model="contentModel" />
      <!-- <q-input
        v-model="contentModel"
        type="textarea"
        outlined
        placeholder="내용을 작성해주세요~!"
      /> -->
      <q-input
        outlined
        placeholder="태그를 입력해주세요~! (입력 후 Enter)"
        prefix="#"
        @keypress.enter.prevent="onRegistTag"
      />
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        outline
        dense
        color="teal"
        removable
        @remove="removeTag(index)"
        >{{ tag }}</q-chip
      ></q-card-section
    >
    <q-separator />
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn
          type="submit"
          flat
          label="저장하기"
          color="primary"
          :loading="loding"
        />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref, computed } from "vue";
import { getCategories } from "src/services/category";
import { useQuasar } from "quasar";
import { validateRequired } from "src/utils/validate-rules";
import TiptapEditor from "src/components/tiptap/TiptapEditor.vue";

$q = useQuasar;

const props = defineProps({
  title: { type: String },
  category: { type: String },
  content: { type: String },
  tags: { type: Array, default: () => [] },
  loding: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:title",
  "update:category",
  "update:content",
  "update:tags",
  "submit",
]);

const titleModel = computed({
  get: () => props.title,
  set: (val) => emit("update:title", val),
});
const categoryModel = computed({
  get: () => props.category,
  set: (val) => emit("update:category", val),
});
const contentModel = computed({
  get: () => props.content,
  set: (val) => emit("update:content", val),
});

// 태그추가 이벤트
const onRegistTag = (e) => {
  const tagValue = e.target.value.replace(/ /g, ""); // 공백 처리
  if (!tagValue) {
    return;
  }
  if (props.tags.length >= 10) {
    $q.notify("태그는 10개 이상 등록할 수 없습니다.");
    return;
  }
  if (props.tags.includes(tagValue) === false) {
    // 등록되어 있는, 중복 태그는 제거하고 등록
    emit("update:tags", [...props.tags, tagValue]);
  }
  e.target.value = ""; // 초기화
};

// 태그 삭제 이벤트
// 삭제 버튼에 저장된 index 넘버로 데이터 찾아서 삭제
const removeTag = (index) => {
  const model = [...props.tags]
  model.splice(index,1)
  emit('update:tags',model)
};

const categories = getCategories();

const handleSubmit = () => {
  if (!contentModel.value) {
    $q.notify("내용을 작성하세요.");
    return;
  }
  emit("submit");
};
</script>

<style lang="scss" scoped></style>
