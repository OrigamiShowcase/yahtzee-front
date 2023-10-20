<script setup lang="ts">
import { PlayerModel } from "src/models/GameModel";
import { appStore } from "src/stores/app";
import { computed } from "vue";
import { useRouter } from "vue-router";

////////

const store = appStore();
const router = useRouter();

////////

async function logout() {
  window.localStorage.removeItem("token");
  router.push({ name: "login" });
}
</script>

<template>
  <div
    class="profile w-full p-2 bg-[var(--green-3)] !bg-opacity-75 flex items-center justify-between"
  >
    <div>
      <q-btn
        size="sm"
        padding="5px"
        icon="fa-solid fa-trash"
        color="red"
        unelevated
        glossy
      ></q-btn>
    </div>
    <div>
      <div class="flex items-center text-xs text-gray-100">
        <span
          class="player-point"
          :class="{ 'active-player': store.isUserTurn }"
        >
          You: {{ store.yourPoint }}
        </span>
        <span v-if="store.game.players.length != 1" class="mx-5">VS</span>
        <span
          v-if="store.game.players.length != 1"
          class="player-point"
          :class="{ 'active-player': !store.isUserTurn }"
        >
          {{ store.oppPoint }} :Opp
        </span>
      </div>
    </div>
    <div>
      <q-btn
        size="sm"
        padding="5px"
        icon="fa-solid fa-arrow-right-from-bracket"
        color="red"
        unelevated
        glossy
        @click="logout"
      ></q-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-point {
  @apply px-5 py-2 rounded-lg;
}
.active-player {
  @apply bg-green-900 text-green-200;
}
</style>
