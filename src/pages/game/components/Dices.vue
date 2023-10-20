<script setup lang="ts">
import GameState from "src/enums/GameState";
import ApiService from "src/services/ApiService";
import { appStore } from "src/stores/app";
import { ref } from "vue";
import { inject } from "vue";

////////

const store = appStore();
const $eventBus: any = inject("$eventBus");
const dice: any = ref(null);

////////

$eventBus.on("roll", async () => {
  //set animation class
  if (dice.value) {
    for (let item of dice.value) {
      console.log();
      if (!item.classList.contains("active")) {
        item.classList.add("dice-animation");
      }
    }
  }
  try {
    await ApiService.roll();
    //remove animation class
    setTimeout(() => {
      for (let item of dice.value) {
        item.classList.remove("dice-animation");
      }
      store.rollLoading = false;
    }, 2000);
  } catch (error) {
    console.log("error in roll ==>", error);
    store.rollLoading = false;
  }
});

////////

function getImageUrl(imageFile: string) {
  return new URL(`../../../assets/images/dices/${imageFile}`, import.meta.url)
    .href;
}

function checkLock(number: number) {
  return store.game.locks.includes(number);
}

async function selectDice(index: number) {
  try {
    if (checkLock(index)) {
      // if was locked so unlock it
      await ApiService.unlockDice(index);
    } else {
      //if was not locked so lock it
      await ApiService.lockDice(index);
    }
  } catch (error) {
    console.log("selec dice error ====>", error);
  }
}
</script>

<template>
  <div v-if="store.game.state != GameState.Finished" class="dices">
    <div
      v-for="(item, index) in store.game.dices"
      :key="index"
      class="dices-item"
      :class="{ active: checkLock(index) }"
      @click="selectDice(index)"
      ref="dice"
    >
      <img :src="getImageUrl(`${item}.png`)" alt="" />
      <span v-if="checkLock(index)" class="active-lock">
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
        class="w-[57px] h-[57px] bg-[var(--green-3)] bg-opacity-30 rounded-xl"
      ></div>
    </div>
  </div>
  <div v-else-if="store.game.players.length > 1" class="dices">
    <span class="text-white text-2xl font-bold"
      >Winner: {{ store.winner }}
    </span>
  </div>
  <div v-else class="dices">
    <span class="text-white text-2xl font-bold">Finished</span>
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
  .dice-animation {
    transform: rotate(2700deg);
    transition: transform 1.5s ease-in-out;
  }
}
</style>
