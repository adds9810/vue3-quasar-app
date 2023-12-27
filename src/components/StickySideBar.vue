<template>
  <aside class="sticky-side-bar">
    <slot></slot>
  </aside>
</template>

<script setup></script>

<style lang="scss" scoped>
.sticky-side-bar {
  position: sticky;
  top: 66px;
  z-index: 2;
  overflow-y: auto; //  overflow-y: scroll; 강의대로 하면 문제되어서 바꿈..
  height: fit-content !important;
}
</style>
