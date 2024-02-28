<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <!-- form -->
    <!-- submit.prevent : prevent - submit 클릭시 새로고침 되는 것을 방지 -->
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <!-- 설정한 변수 바인딩 -->
      <q-input v-model="form.nickname" placeholder="닉네임" outlined dense />
      <q-input v-model="form.email" placeholder="이메일" outlined dense />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자 조합 8자 이상)"
        outlined
        dense
      />
      <q-btn
        type="submit"
        label="가입하기"
        class="full-width"
        unelevated
        color="primary"
      />
      <q-separator />
      <q-btn
        label="로그인하기"
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
import { signUpWithEmail } from "src/services"; // src/services/index.js 추가 및 내보내기로 해당 경로만으로 가져올 수 있음

const emit = defineEmits(["changeView", "closeDialog"]);
const $q = useQuasar();

// 회원가입시 받을 데이터를 변수로 설정
const form = ref({
  nickname: "",
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await signUpWithEmail(form.value);
  $q.notify("가입을 환영합니다 :)");
  emit("closeDialog");
};
</script>

<style lang="scss" scoped></style>
