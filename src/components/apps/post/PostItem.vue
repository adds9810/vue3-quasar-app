<template>
  <!-- 상세에 넘길 link 입력 -->
  <!-- list 커스텀 -->
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${id}`">
    <q-item-section avatar top>
      <!-- 프포필 이미지 -->
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span
          >닉네임&nbsp;&middot;&nbsp;{{
            date.formatDate(createdAt, "YY/MM/DD HH:mm:ss")
          }}</span
        >
        <!-- 프로필 이미지 -->
        <q-chip class="q-ml-md" dense color="primary" text-color="white">
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in tags" :key="tag" class="q-mr-sm">#{{ tag }}</span>
      </div>
      <!-- 2줄시 ... 되도록 ellipsis-2-lines 추가  -->
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ content }}</div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon name="sym_o_sms" :label="commentCount" tooltip="댓글수" />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <!-- 클릭 이벤트 추가 및 이벤트 전파 차단 @click.prevent -->
            <q-btn class="full-width" flat dense @click.prevent>
              <PostIcon
                name="sym_o_favorite"
                :label="likeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <PostIcon
                name="sym_o_bookmark"
                :label="bookmarkCount"
                tooltip="북마크"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { date } from "quasar"; // 퀘이사 유팅 활용
import PostIcon from "./PostIcon.vue";

// 받을 값 입력
defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  readCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  bookmarkCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  uid: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
