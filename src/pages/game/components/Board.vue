<script setup lang="ts">
import { appStore } from "src/stores/app";
import { computed, reactive, toRaw } from "vue";

////////

const store = appStore();
const state = reactive({
  selectedItem: null,
});

////////

const generatedItems = computed(() => {
  const items = [
    {
      id: 1,
      image: getImageUrl(`1.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 2,
      image: getImageUrl(`2.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 3,
      image: getImageUrl(`3.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 4,
      image: getImageUrl(`4.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 5,
      image: getImageUrl(`5.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 6,
      image: getImageUrl(`6.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 7,
      image: getImageUrl(`3x.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 8,
      image: getImageUrl(`4x.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 9,
      image: getImageUrl(`full.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 10,
      image: getImageUrl(`small.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 11,
      image: getImageUrl(`large.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 12,
      image: getImageUrl(`yatzy.png`),
      yourPoint: null,
      oppPoint: null,
    },
    {
      id: 13,
      image: getImageUrl(`chance.png`),
      yourPoint: null,
      oppPoint: null,
    },
  ];

  for (let player of store.game.players) {
    for (let score of player.scores) {
      if (store.activePlayer.userid == player.userid) {
        //this is you, so we need to set the point on "yourPoint"
        items[score.type - 1].yourPoint = score.value;
      } else {
        //this is your opponent
        items[score.type - 1].oppPoint = score.value;
      }
    }
  }

  return items;
});

////////

function getImageUrl(imageFile: string) {
  return new URL(`../../../assets/images/items/${imageFile}`, import.meta.url)
    .href;
}

function itemClick(id: any) {
  if (id == store.selectedItem) {
    store.selectedItem = null;
  } else {
    store.selectedItem = id;
  }
}

// تابع محاسبه امتیاز با توجه به شماره خانه و تاس‌ها
let dices: number[] = [];
function calculateYatzyScore(type: number) {
  // تاس‌ها را از کوچک به بزرگ مرتب کنید
  dices = structuredClone(toRaw(store.game.dices));
  dices = dices.sort((a: number, b: number) => a - b);

  switch (type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return countOccurrences(type) * type;

    case 7:
      // Three of a Kind (سه عدد یکسان)
      if (hasThreeOfAKind()) {
        return calculateSum();
      }
      return 0;

    case 8:
      // Four of a Kind (چهار عدد یکسان)
      if (hasFourOfAKind()) {
        return calculateSum();
      }
      return 0;

    case 9:
      // Full House (دو عدد و سه عدد یکسان)
      if (isFullHouse()) {
        return 25;
      }
      return 0;

    case 10:
      // Small Straight (ترتیب 3 عدد پشت سر هم)
      if (isSmallStraight()) {
        return 30;
      }
      return 0;

    case 11:
      // Large Straight (ترتیب 4 عدد پشت سر هم)
      if (isLargeStraight()) {
        return 40;
      }
      return 0;

    case 12:
      // Yatzy (5 عدد یکسان)
      if (isYatzy()) {
        return 50;
      }
      return 0;

    case 13:
      // Chance (شانس)
      return calculateSum();
  }
}

// تعداد تاس‌های مشخصی را بشمارد
function countOccurrences(number: number) {
  console.log("dices ===>", store.game.dices);

  console.log(
    `nnumber ${number} ==>`,
    dices.filter((die: number) => die === number).length
  );

  return dices.filter((die: number) => die === number).length;
}

// سه تاس با یک شماره یکسان و دو تاس با یک شماره دیگر یکسان
function isFullHouse() {
  const counts = new Map();
  for (let die of dices) {
    counts.set(die, (counts.get(die) || 0) + 1);
  }
  return (
    counts.size === 2 &&
    [...counts.values()].every((count) => count === 2 || count === 3)
  );
}

// 1-2-3 یا 2-3-4 یا 3-4-5 یا 4-5-6
function isSmallStraight() {
  const uniqueDice: any = [...new Set(dices)];
  return (
    (uniqueDice.length === 3 &&
      Math.max(...uniqueDice) - Math.min(...uniqueDice) === 2) ||
    (uniqueDice.length === 4 &&
      Math.max(...uniqueDice) - Math.min(...uniqueDice) === 3)
  );
}

// 1-2-3-4 یا 2-3-4-5 یا 3-4-5-6
function isLargeStraight() {
  return (
    [...new Set(dices)].length === 5 &&
    Math.max(...dices) - Math.min(...dices) === 4
  );
}

// پنج تاس با یک شماره یکسان
function isYatzy() {
  return countOccurrences(dices[0]) === 5;
}

// حداقل سه تاس با یک شماره یکسان
function hasThreeOfAKind() {
  for (let die of dices) {
    if (countOccurrences(die) >= 3) {
      return true;
    }
  }
  return false;
}

// حداقل چهار تاس با یک شماره یکسان
function hasFourOfAKind() {
  for (let die of dices) {
    if (countOccurrences(die) >= 4) {
      return true;
    }
  }
  return false;
}

// مجموع تمام تاس‌ها
function calculateSum() {
  return dices.reduce((total: number, die: number) => total + die, 0);
}
</script>

<template>
  <div class="board">
    <div class="board-left">
      <div
        v-for="(item, index) in generatedItems.slice(0, 6)"
        :key="index"
        class="board-item"
        :class="[index % 2 == 0 ? '' : 'bg-[var(--green-3)]']"
      >
        <img :src="item.image" class="h-full" />
        <!-- you -->
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-4)]"
          :class="{
            '!bg-[var(--green-2)] border-2 border-green-600':
              item.yourPoint != null,
            'border-2 border-green-500': store.selectedItem == item.id,
            'hover:cursor-pointer': item.yourPoint == null,
          }"
          @click="itemClick(item.id)"
        >
          <span
            v-if="item.yourPoint != null"
            class="text-lg font-bold text-[var(--light-1)]"
          >
            {{ item.yourPoint }}
          </span>
          <span
            v-else-if="store.game.dices.length"
            class="text-lg font-bold text-emerald-400"
          >
            {{ calculateYatzyScore(item.id) }}
          </span>
        </div>
        <!-- apponent -->
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-5)]"
          :class="{
            'border-2 border-cyan-400': item.oppPoint != null,
            'opacity-10': store.game.players.length != 2,
          }"
        >
          <span class="text-lg font-bold text-[var(--light-1)]">
            {{ item.oppPoint }}
          </span>
        </div>
      </div>
      <div class="board-item"></div>
    </div>
    <div class="board-right">
      <div
        v-for="(item, index) in generatedItems.slice(6)"
        :key="index"
        class="board-item justify-end"
        :class="[index % 2 == 0 ? '' : 'bg-[var(--green-3)]']"
      >
        <img :src="item.image" class="h-full" />
        <!-- you -->
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-4)]"
          :class="{
            '!bg-[var(--green-2)] border-2 border-green-600':
              item.yourPoint != null,
            'border-2 border-green-500': store.selectedItem == item.id,
            'hover:cursor-pointer': item.yourPoint == null,
          }"
          @click="itemClick(item.id)"
        >
          <span
            v-if="item.yourPoint != null"
            class="text-lg font-bold text-[var(--light-1)]"
          >
            {{ item.yourPoint }}
          </span>
          <span
            v-else-if="store.game.dices.length"
            class="text-lg font-bold text-emerald-400"
          >
            {{ calculateYatzyScore(item.id) }}
          </span>
        </div>
        <!-- apponent -->
        <div
          class="w-[45px] h-[45px] flex-center rounded-lg bg-[var(--green-5)]"
          :class="{
            'border-2 border-cyan-400': item.oppPoint != null,
            'opacity-10': store.game.players.length != 2,
          }"
        >
          <span class="text-lg font-bold text-[var(--light-1)]">
            {{ item.oppPoint }}
          </span>
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
