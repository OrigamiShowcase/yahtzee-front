<script setup lang="ts">
import { useQuasar } from "quasar";
import ApiService from "src/services/ApiService";
import { appStore } from "src/stores/app";
import { reactive } from "vue";
import SocketService from "src/services/SocketService";

////////

const $q = useQuasar();
const store = appStore();
const state = reactive({
  showInviteDialog: false,
  startLoading: false,
});

////////

function copy() {
  navigator.clipboard.writeText(store.game?._id);
  $q.notify({
    color: "green",
    message: "Copied",
  });
  $q.notify({
    color: "warning",
    message: "Please wait for your friend then start the game.",
  });
  state.showInviteDialog = false;
}

async function startGame() {
  if (store.activePlayer.userid == store.profile.userid) {
    state.startLoading = true;
    try {
      // await ApiService.startGame(store.game?._id);
      await SocketService.callApiSocket("game", "startGame", {
        id: store.game._id,
      });
    } catch (error) {
      $q.notify({
        color: "negative",
        message: "There is a problem in starting the game!",
      });
    }
    state.startLoading = false;
  }
}
</script>

<template>
  <div class="start-game">
    <template v-if="store.activePlayer.userid == store.profile.userid">
      <q-btn
        color="blue"
        size="lg"
        unelevated
        glossy
        push
        no-caps
        @click="state.showInviteDialog = true"
      >
        Invite Friend
      </q-btn>

      <q-btn
        class="mt-5"
        color="green"
        size="lg"
        unelevated
        glossy
        push
        no-caps
        :loading="state.startLoading"
        @click="startGame"
      >
        Start Game
      </q-btn>
    </template>

    <div v-else class="text-white text-xl text-center">
      <p>The game has not been started.</p>
      <p>please wait</p>
    </div>

    <q-dialog v-model="state.showInviteDialog" position="top">
      <div
        class="bg-[var(--green-1)] h-[80px] flex-center gap-2 !rounded-b-2xl px-5"
      >
        <span
          class="border border-dashed border-green-700 rounded-md px-2 py-2 font-popins text-gray-100"
        >
          {{ store.game?._id }}
        </span>
        <q-btn unelevated padding="10px" color="green" @click="copy()">
          <i class="fas fa-clipboard text-lg"></i>
        </q-btn>
      </div>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.start-game {
  @apply w-full h-full backdrop-blur-lg bg-green-900 bg-opacity-5 absolute flex flex-col items-center justify-center z-10;
}
</style>
