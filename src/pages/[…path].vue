<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>
      <div class="text-h4">
        {{ $route.params }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
// 404화면이 잘 안됨... 나중에 찾아보자..
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
