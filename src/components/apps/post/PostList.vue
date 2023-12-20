<template>
  <!-- list 컴포넌트 사용한 기본 list html -->
  <q-list bordered separator>
    <PostItem v-for="item in items" :key="item.id" v-bind="item" />
    <!-- v-bind : 본체 바인딩 -->
  </q-list>
</template>

<script setup>
import PostItem from "./PostItem.vue";
defineProps({ items: Array, default: () => {} });
</script>

<style lang="scss" scoped></style>
