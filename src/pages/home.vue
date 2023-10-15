<template>
  <div>
    <div class="text-h4">Home</div>
    <div>
      {{ $route.name }}<br />
      {{ $route.meta }}
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

<route lang="yaml">
name: home-page
meta:
  requiresAuth: true
</route>
