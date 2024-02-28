<template>
  <!-- 03. q-dialog에 받을 값이 true가 되면 dialog를 열고 닫을 수 있음 받고 update해 내보낼 값 지정 -->
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(val) => $emit('modelValue', val)"
    transition-show="none"
    transition-hide="none"
    @hide="changeViewMode('SignInForm')"
  >
    <!-- transition show/hide 설정 끄기 -->
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space /><!-- 우측 정렬 방법 q-space 혹은 class .justify-end -->
        <!--
            닫기 버튼 커스텀
            v-close-popup : 퀘이사에서 지원하는 팝업 닫기 이벤트 메소드(??)
        -->
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <!-- v-if 조건부 랜더링 -->
        <!-- 02. FindPassword 연결 테스트 -->
        <!-- 05. 상황에 따라 form 이 보여지도록 연결 -->
        <!-- <SignInForm
          v-if="viewMode === 'SignInForm'"
          @change-view="changeViewMode"
        />
        <SignUpForm
          v-else-if="viewMode === 'SignUpForm'"
          @change-view="changeViewMode"
        />
        <FindPassword v-else @change-view="changeViewMode" /> -->
        <!-- 동적 컴포넌트 : prop나 이벤트가 어느정도 일치하면 관라히기 쉬움 -->
        <component
          :is="authViewComponents[viewMode]"
          @change-view="changeViewMode"
          @close-dialog="closeDialog"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
// 01. SignInForm, SignUpForm, FindPassword 연결
// import SignInForm from "./SignInForm.vue";
// import SignUpForm from "./SignUpForm.vue";
// import FindPassword from "./FindPassword.vue";
// 06-1. defineAsyncComponent 사용선언
import { defineAsyncComponent, ref } from "vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

// 04. 상황에 맞는 form이 보여지도록 조건부 상태를 관리할 반응형 함수 추가
const viewMode = ref("SignInForm"); // SignInForm, SignUpForm, FindPassword
const changeViewMode = (mode) => (viewMode.value = mode);

// 05. 컴포넌트를 관리하기 위한 객체 선언
// const authViewComponents = {
//   SignInForm,
//   SignUpForm,
//   FindPassword,
// };
// 06-2. defineAsyncComponent()를 사용해 지연된 로딩 실행
const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import("./SignInForm.vue")),
  SignUpForm: defineAsyncComponent(() => import("./SignUpForm.vue")),
  FindPassword: defineAsyncComponent(() => import("./FindPassword.vue")),
};

const closeDialog = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped></style>
