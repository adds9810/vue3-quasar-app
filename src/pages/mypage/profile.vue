<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleSubmitProfile">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경</div>
          <q-input v-model="displayName" outlined dense label="닉네임" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary" />
        </q-card-actions>
      </q-form>
    </BaseCard>
    <BaseCard>
      <q-form @submit.prevent="handleSubmitEmail">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">이메일 변경</div>
          <q-input v-model="email" outlined dense label="이메일" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary" />
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useQuasar } from "quasar";
import { updateUserEmail, updateUserProfile } from "src/services";
import { useAuthStore } from "src/stores/auth";
import BaseCard from "src/components/base/BaseCard.vue";

const authStore = useAuthStore();
const $q = useQuasar();

const displayName = ref("");
const handleSubmitProfile = async () => {
  await updateUserProfile(displayName.value);
  $q.notify("프로필 수정 완료!");
};

const email = ref("");
const handleSubmitEmail = async () => {
  await updateUserEmail(email.value);
  $q.notify("이메일 수정 완료!");
};

// 사용자의 정보를 실시간으로 pinia에서 가져와 보여지도록 함
// 옵셔널 체이닝(?.)으로 데이터가 없을 경우의 에러를 해결가능
// watchEffect : 반응형 데이터의 상태 변화 감지하여 실시간으로 바꿈
watchEffect(() => {
  displayName.value = authStore.user?.displayName;
  email.value = authStore.user?.email;
});
</script>

<style lang="scss" scoped></style>
