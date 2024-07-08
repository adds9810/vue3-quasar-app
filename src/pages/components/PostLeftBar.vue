<template>
  <StickySideBar>
    <q-card flat bordered>
      <!-- :active="true" - 활성화 되었을때 파란색으로 표시됨 -->
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          :active="category === null"
          @click="changeCategory(null)"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="cate in categories"
          :key="cate.value"
          clickable
          v-ripple
          :active="category === cate.value"
          @click="changeCategory(cate.value)"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from "src/components/StickySideBar.vue";
import { getCategories } from "src/services/category";

// 카테고리 데이터 받기
defineProps({
  category: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:category"]);

const changeCategory = (value) => {
  emit("update:category", value);
};

const categories = getCategories();
</script>
