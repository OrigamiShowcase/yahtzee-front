<script setup lang="ts">
import GameState from "src/enums/GameState";
import ApiService from "src/services/ApiService";
import { appStore } from "src/stores/app";
import { inject } from "vue";

////////

const store = appStore();
const $eventBus: any = inject("$eventBus");

////////

async function roll() {
  store.rollLoading = true;
  $eventBus.emit("roll", null);
}
async function assign() {
  try {
    await ApiService.assign(store.selectedItem as number);
    store.selectedItem = null;
  } catch (error) {
    console.log("error in assining ===>", error);
  }
}
</script>

<template>
  <div class="actions">
    <div
      v-if="store.game.state == GameState.Finished"
      class="flex items-center justify-evenly w-full"
    >
      <div
        class="w-1/3 flex flex-col items-center text-xl font-bold text-white p-3 rounded-xl bg-[var(--green-1)]"
      >
        <span>You</span>
        <span> {{ store.yourPoint }} </span>
      </div>
      <div
        class="w-1/3 flex flex-col items-center text-xl font-bold text-white p-3 rounded-xl bg-[var(--green-1)]"
      >
        <span>Opponent</span>
        <span> {{ store.oppPoint }} </span>
      </div>
    </div>
    <template v-else-if="store.isUserTurn">
      <q-btn
        :disable="store.game.count == 3"
        color="green-6"
        size="lg"
        glossy
        :label="`Roll (${3 - store.game.count})`"
        class="full-width"
        push
        :loading="store.rollLoading"
        @click="roll"
      />
      <q-btn
        color="blue-6"
        size="lg"
        glossy
        label="Assign"
        class="full-width"
        push
        :disable="!store.game.dices.length"
        @click="assign"
      />
    </template>
    <span v-else class="text-center text-white text-2xl mx-auto mb-3">
      Opponent Turn: ({{ 3 - store.game.count }})
    </span>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  @apply mt-5 flex items-center gap-2;
}
</style>
