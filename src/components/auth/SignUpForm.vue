<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <!-- form -->
    <!-- submit.prevent : prevent - submit 클릭시 새로고침 되는 것을 방지 -->
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <!-- 설정한 변수 바인딩 -->
      <!-- hide-bottom-space : 유효성 옵션을 추가하면 생기는 어백을 가려줌 -->
      <!-- :rules="[value => !!value || '필수값 입니다!']" -->
      <q-input
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired, validateEmail]"
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired, validatePassword]"
      />
      <q-input
        v-model="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        outlined
        dense
        hide-bottom-space
        :rules="[
          validateRequired,
          (val) => validatePasswordConfirm(form.password, val),
        ]"
      />

      <q-btn
        type="submit"
        label="가입하기"
        class="full-width"
        unelevated
        color="primary"
        :loading="isLoading"
      />

      <q-separator />
      <q-btn
        label="로그인 하기"
        class="full-width"
        unelevated
        flat
        @click="$emit('changeView', 'SignInForm')"
      />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useAsyncState } from "@vueuse/core";
import { signUpWithEmail } from "src/services"; // src/services/index.js 추가 및 내보내기로 해당 경로만으로 가져올 수 있음
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "src/utils/validate-rules";
import { getErrorMessage } from "src/utils/firebase/error-message";

const emit = defineEmits(["changeView", "closeDialog"]);

const $q = useQuasar();

const { isLoading, execute } = useAsyncState(signUpWithEmail, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify("가입을 환영합니다 :)");
    $q.notify("이메일에서 인증 링크를 확인해주세요.");
    emit("closeDialog");
  },
  onError: (err) => {
    $q.notify({
      type: "negative",
      message: getErrorMessage(err.code),
    });
  },
});

const passwordConfirm = ref("");
// 회원가입시 받을 데이터를 변수로 설정
const form = ref({
  nickname: "",
  email: "",
  password: "",
});
const handleSubmit = () => execute(1000, form.value);
// const handleSubmit = async () => {
//   console.log('handleSubmit');
//   await signUpWithEmail(form.value);
//   $q.notify('가입을 환영합니다 :)');
//   $q.notify('이메일에서 인증 링크를 확인해주세요.');
//   emit('closeDialog');
// };
</script>

<style lang="scss" scoped></style>
