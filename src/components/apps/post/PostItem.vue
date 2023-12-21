<template>
  <!-- 상세에 넘길 link 입력 -->
  <!-- list 커스텀 -->
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${id}`">
    <q-item-section avatar top>
      <!-- 프포필 이미지 -->
      <q-avatar rounded>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>닉네임&nbsp;&middot;&nbsp;3일전</span>
        <!-- 프로필 이미지 -->
        <q-chip class="q-ml-sm" color="primary" text-color="white">
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h5 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-cation">
        <span v-for="tag in tags" :key="tag" class="q-mr-sm">#{{ tag }}</span>
      </div>
      <!-- 2줄시 ... 되도록 ellipsis-2-lines 추가  -->
      <div class="text-gray-6 q-my-sm ellipsis-2-lines">{{ content }}</div>
      <div class="row item-center">
        <div class="col-3">
          <div class="flex flex-center">
            <q-icon name="sym_o_visibility" color="gray" size="xs" />
            <span class="text-gray q-ml-xs text-body2">{{ readCount }}</span>
            <q-tooltip :offset="[0.4]">조회수</q-tooltip>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-icon name="sym_o_sms" color="gray" size="xs" />
            <span class="text-gray q-ml-xs text-body2">{{ commentCount }}</span>
            <q-tooltip :offset="[0.4]">댓글수</q-tooltip>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <!-- 클릭 이벤트 추가 및 이벤트 전파 차단 @click.prevent -->
            <q-btn class="full-width" flat dense @click.prevent>
              <q-icon name="sym_o_favorite" color="gray" size="xs" />
              <span class="text-gray q-ml-xs text-body2">{{ likeCount }}</span>
              <q-tooltip :offset="[0.4]">좋아요</q-tooltip></q-btn
            >
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <q-icon name="sym_o_bookmark" color="gray" size="xs" />
              <span class="text-gray q-ml-xs text-body2">{{
                bookmarkCount
              }}</span>
              <q-tooltip :offset="[0.4]">북마크</q-tooltip></q-btn
            >
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
// 받을 값 입력
defineProps({
  id: { type: String },
  title: { type: String },
  content: { type: String },
  readCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  bookmarkCount: { type: Number, default: 0 },
  category: { type: String },
  createTime: { type: Date },
  tags: { type: Array, default: () => {} },
  uid: { type: String },
});
</script>

<style lang="scss" scoped></style>
