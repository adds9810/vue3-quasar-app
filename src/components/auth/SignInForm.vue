<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <!-- form -->
    <q-form class="q-gutter-y-md" @submit.prevent="handleSignInEmail">
      <q-input v-model="form.email" placeholder="이메일" outlined dense />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
      />
      <DisplayError :code="error?.code" />

      <div>
        <q-btn
          type="submit"
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
          :loading="isLoding"
        />
        <div class="flex justify-between">
          <q-btn
            label="비밀번호 찾기"
            flat
            dense
            color="secondary"
            size="13px"
            @click="$emit('changeView', 'FindPassword')"
          />
          <q-btn
            label="이메일 가입하기"
            flat
            dense
            color="secondary"
            size="13px"
            @click="$emit('changeView', 'SignUpForm')"
          />
        </div>
      </div>
      <q-separator />
      <q-btn
        label="구글 계정으로 로그인"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click="handleSignInGoogle"
      />
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle, signInWithEmail } from "src/services";
import { useQuasar } from "quasar";
import { ref } from "vue";
import DisplayError from "../DisplayError.vue";
const emit = defineEmits(["changeView", "closeDialog"]);

const $q = useQuasar();

// 에러관련 변수선언
const isLoding = ref(false);
const error = ref(null);

// 이메일 로그인
const form = ref({
  email: "",
  password: "",
});
const handleSignInEmail = async () => {
  // 에러처리
  try {
    // 정상 수신 되었을 경우
    isLoding.value = true;
    await signInWithEmail(form.value);
    $q.notify("환영합니다 :)");
    emit("closeDialog");
  } catch (err) {
    // 에러 발생시
    error.value = err;
  } finally {
    // 처리 끝난 후 초기화
    isLoding.value = false;
  }
};

// 로그인(구글)
const handleSignInGoogle = async () => {
  await signInWithGoogle();
  $q.notify("환영합니다~! :)");
  emit("closeDialog");
};
</script>

<style lang="scss" scoped></style>
