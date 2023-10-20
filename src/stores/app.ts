import { defineStore } from "pinia";
import GameModel from "src/models/GameModel";

interface State {
  game: GameModel;
  token: string;
  profile: any;
  changingTurn: boolean;
  disconnected: boolean;
  selectedItem: number | null;
  rollLoading:boolean
}

export const appStore = defineStore("game", {
  state: (): State => ({
    game: new GameModel(),
    token: "",
    profile: {},
    changingTurn: false,
    disconnected: false,
    selectedItem: null,
    rollLoading:false
  }),

  getters: {
    players(state) {
      return state.game.players;
    },
    activePlayer(state) {
      const players = state.game.players;
      return players[state.game?.turn];
    },
  },

  actions: {},
});
