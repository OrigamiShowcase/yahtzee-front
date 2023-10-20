<script setup lang="ts">
import { PlayerModel } from "src/models/GameModel";
import { appStore } from "src/stores/app";
import { computed } from "vue";
import { useRouter } from "vue-router";

////////

const store = appStore();
const router = useRouter();

////////

const yourPoint = computed(() => {
  const profile: any = store.game.players.find(
    (player: PlayerModel) => player.userid == store.profile.userid
  );
  return profile.scores.reduce(
    (total: number, die: any) => total + die.value,
    0
  );
});
const oppPoint = computed(() => {
  const profile: any = store.game.players.find(
    (player: PlayerModel) => player.userid != store.profile.userid
  );
  return profile.scores.reduce(
    (total: number, die: any) => total + die.value,
    0
  );
});

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
        <span class="bg-green-900 p-2 rounded-lg text-green-200">
          You: {{ yourPoint }}
        </span>
        <span v-if="store.game.players.length != 1" class="mx-2">VS</span>
        <span v-if="store.game.players.length != 1"> {{ oppPoint }} :Opp </span>
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

<style lang="scss" scoped></style>
