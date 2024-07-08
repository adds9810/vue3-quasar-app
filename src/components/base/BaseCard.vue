<template>
  <!-- v-bind="$attrs" : q-card가 갖고 있는 이벤트나 props를 외부에서도 사용할 수 있게함-->
  <q-card :flat="flat" :bordered="bordered" v-bind="$attrs">
    <!--
      q-card는 디폴트 밖에 없지만 여러개의 슬롯이 있을 수 있음,
      여러 슬롯을 넣을 수 있도록 내장객체 $slots를 for문으로 받을 수 있도록 구현
      $slots는 내장객체라 name을 뒤로 받을 수 있음
    -->

    <template v-for="(_, name) in $slots" :key="name">
      <!-- 외부에서 받은 name을 넣을 수 있도록 함 -->
      <slot :name="name"></slot>
    </template>
  </q-card>
</template>

<script setup>
defineProps({
  flat: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped></style>
