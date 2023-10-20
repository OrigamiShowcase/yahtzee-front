import { defineStore } from "pinia";
import GameModel, { PlayerModel } from "src/models/GameModel";

interface State {
  game: GameModel;
  token: string;
  profile: any;
  changingTurn: boolean;
  disconnected: boolean;
  selectedItem: number | null;
  rollLoading: boolean;
}

export const appStore = defineStore("game", {
  state: (): State => ({
    game: new GameModel(),
    token: "",
    profile: {},
    changingTurn: false,
    disconnected: false,
    selectedItem: null,
    rollLoading: false,
  }),

  getters: {
    activePlayer(state) {
      const players = state.game.players;
      return players[state.game?.turn];
    },
    isUserTurn(state) {
      const userTurn: PlayerModel = state.game.players[state.game.turn];
      return userTurn.userid == state.profile.userid ? true : false;
    },
    yourPoint(state) {
      const profile: any = state.game.players.find(
        (player: PlayerModel) => player.userid == state.profile.userid
      );
      return profile.scores.reduce(
        (total: number, die: any) => total + die.value,
        0
      );
    },
    oppPoint(state) {
      const profile: any = state.game.players.find(
        (player: PlayerModel) => player.userid != state.profile.userid
      );
      return profile?.scores.reduce(
        (total: number, die: any) => total + die.value,
        0
      );
    },
    winner(state) {
      if (this.yourPoint > this.oppPoint) {
        return "YOU";
      }
      else{
        return state.game.players[1].email.split("@")[0]
      }
    },
  },

  actions: {},
});
