<template>
  <!-- 아이콘명 name 바인딩해서 받아올 수 있도록 -->
  <q-icon :name="name" color="grey" size="xs" v-bind="$attrs" />
  <span v-if="label" class="text-grey q-ml-xs text-body2">{{ label }}</span>
  <q-tooltip v-if="tooltip" :offset="[0, 4]">{{ tooltip }}</q-tooltip>
</template>

<script setup>
// label과 tooltip은 필요하면 가져오기
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: [String, Number],
  },
  tooltip: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
