<script setup lang="ts">
import { reactive } from "vue";

////////

const state = reactive({
  items: [
    {
      image: getImageUrl(`1.png`),
      yourPoint: 12,
      oppPoint: null,
    },
    {
      image: getImageUrl(`2.png`),
      yourPoint: 0,
      oppPoint: 18,
    },
    {
      image: getImageUrl(`3.png`),
      yourPoint: 6,
      oppPoint: 18,
    },
    {
      image: getImageUrl(`4.png`),
      yourPoint: 16,
      oppPoint: 4,
    },
    {
      image: getImageUrl(`5.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      image: getImageUrl(`6.png`),
      yourPoint: 4,
      oppPoint: 16,
    },
    {
      image: getImageUrl(`3x.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      image: getImageUrl(`4x.png`),
      yourPoint: 4,
      oppPoint: 1,
    },
    {
      image: getImageUrl(`full.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      image: getImageUrl(`small.png`),
      yourPoint: 30,
      oppPoint: 0,
    },
    {
      image: getImageUrl(`large.png`),
      yourPoint: 40,
      oppPoint: 40,
    },
    {
      image: getImageUrl(`yatzy.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      image: getImageUrl(`chance.png`),
      yourPoint: 0,
      oppPoint: 18,
    },
  ],
});

////////

function getImageUrl(imageFile: string) {
  return new URL(`../../../assets/images/items/${imageFile}`, import.meta.url)
    .href;
}
</script>

<template>
  <div class="board">
    <div class="board-left">
      <div
        v-for="(item, index) in state.items.slice(0, 6)"
        :key="index"
        class="board-item"
        :class="[index % 2 == 0 ? '' : 'bg-[var(--green-3)]']"
      >
        <img :src="item.image" class="h-full" />
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-4)]"
          :class="{
            '!bg-[var(--green-4)] !opacity-20': item.yourPoint != null,
          }"
        >
          <span class="text-lg font-bold text-[var(--light-1)]">{{
            item.yourPoint
          }}</span>
        </div>
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-5)]"
          :class="{ '!bg-teal-600 !opacity-20': item.oppPoint != null }"
        >
          <span class="text-lg font-bold text-[var(--light-1)]">{{
            item.oppPoint
          }}</span>
        </div>
      </div>
      <div class="board-item"></div>
    </div>
    <div class="board-right">
      <div
        v-for="(item, index) in state.items.slice(6)"
        :key="index"
        class="board-item justify-end"
        :class="[index % 2 == 0 ? '' : 'bg-[var(--green-3)]']"
      >
        <img :src="item.image" class="h-full" />
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-4)]"
          :class="{
            '!bg-[var(--green-4)] !opacity-20': item.yourPoint != null,
          }"
        >
          <span class="text-lg font-bold text-[var(--light-1)]">{{
            item.yourPoint
          }}</span>
        </div>
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-5)]"
          :class="{ '!bg-teal-600 !opacity-20': item.oppPoint != null }"
        >
          <span class="text-lg font-bold text-[var(--light-1)]">{{
            item.oppPoint
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board {
  @apply rounded-2xl border-4 border-[var(--green-1)] bg-[var(--green-2)] grid grid-cols-2 overflow-hidden;
  &-left,
  &-right {
    @apply col-span-1 flex flex-col w-full;
  }
  &-item {
    @apply p-2 w-full h-[60px] flex items-center  gap-3;
  }
}
</style>
