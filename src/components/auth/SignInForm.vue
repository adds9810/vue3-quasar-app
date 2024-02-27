<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <!-- form -->
    <q-form class="q-gutter-y-md">
      <q-input placeholder="이메일" outlined dense />
      <q-input placeholder="비밀번호" outlined dense />
      <div>
        <q-btn
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
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
import { signInWidthGoogle } from "src/services/auth";
defineEmits(["changeView"]);

// 로그인(구글)
const handleSignInGoogle = async () => {
  await signInWidthGoogle();
};
</script>

<style lang="scss" scoped></style>
