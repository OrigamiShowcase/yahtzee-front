<script setup lang="ts">
import { appStore } from "src/stores/app";

////////

const store = appStore();

////////

function getImageUrl(imageFile: string) {
  return new URL(`../../../assets/images/dices/${imageFile}`, import.meta.url)
    .href;
}
</script>

<template>
  <div class="dices">
    <div
      v-for="(item, index) in store.game.dices"
      :key="index"
      class="dices-item"
    >
      <img :src="getImageUrl(`${item}.png`)" alt="" />
      <span class="active-lock">
        <i class="fa fa-lock text-xs"></i>
      </span>
    </div>
    <div
      v-if="!store.game.dices.length"
      class="flex items-center justify-evenly gap-2"
    >
      <div
        v-for="(item, index) in 5"
        :key="index"
        class="w-[60px] h-[60px] bg-[var(--green-3)] bg-opacity-30 rounded-xl"
      ></div>
    </div>
    <!-- <div class="dices-item">
      <img src="~/assets/images/dices/6.png" alt="" />
    </div>
    <div class="dices-item">
      <img src="~/assets/images/dices/4.png" alt="" />
    </div>
    <div class="dices-item">
      <img src="~/assets/images/dices/6.png" alt="" />
    </div>
    <div class="dices-item">
      <img src="~/assets/images/dices/3.png" alt="" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.dices {
  @apply flex items-center justify-evenly;
  &-item {
    @apply w-[55px] cursor-pointer;
  }
  .active {
    @apply border-2 border-red-500 rounded-xl relative #{!important};
    &-lock {
      @apply w-[20px] h-[20px] absolute -right-2 -top-2 text-red-500 bg-white border-2 border-red-500 rounded-full  flex-center;
    }
  }
}
</style>
