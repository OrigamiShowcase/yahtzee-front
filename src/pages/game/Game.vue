<script setup lang="ts">
import WebSocketClient from "src/services/SocketService";
import { appStore } from "src/stores/app";
import { onMounted, reactive } from "vue";
import Header from "src/pages/game/components/Header.vue";
import Dices from "src/pages/game/components/Dices.vue";
import Actions from "src/pages/game/components/Actions.vue";
import Board from "src/pages/game/components/Board.vue";
import StartGame from "src/pages/game/components/StartGame.vue";
import GameState from "src/enums/GameState";

////////

const store = appStore();
const state = reactive({
  loading: true,
});

////////

onMounted(async () => {
  state.loading = true;
  await WebSocketClient.init();
  setTimeout(function () {
    state.loading = false;
  }, 2000);
});
</script>

<template>
  <div class="game">
    <div class="details">
      <StartGame v-if="store.game?.state == GameState.Waiting" />
      <Header />
      <div
        class="p-2 flex flex-col justify-between"
        style="height: calc(100% - 50px)"
      >
        <Board />
        <div class="p-2 rounded-2xl bg-emerald-600 bg-opacity-40 relative">
          <Dices />
          <Actions />
        </div>
      </div>
    </div>
    <div v-if="state.loading" class="loading flex-center">
      <q-spinner-box size="100px" color="green" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  @apply w-screen h-screen backdrop-blur bg-green-900 bg-opacity-5 absolute;
}
.game {
  @apply flex items-center justify-center h-screen p-0 md:p-5;
  .details {
    @apply w-[400px] h-full bg-center bg-no-repeat bg-cover relative #{!important};
    background-image: url("../../assets/images/global/bg-2.webp");
  }
}
</style>
