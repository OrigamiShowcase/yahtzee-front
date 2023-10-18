import GameState from "src/enums/GameState";

export default class GameModel {
  constructor(data: any = null) {
    if (!data) return;

    this.count = data.count;
    this.dices = data.dices;
    this.locks = data.locks;
    for (let player of data.players) {
      this.players?.push(new PlayerModel(player));
    }
    this.state = data.state;
    this.turn = data.turn;
    this._id = data._id;
  }
  count: number;
  dices: number[];
  locks: number[];
  players: PlayerModel[];
  state: GameState;
  turn: number;
  _id: string;
}

export class PlayerModel {
  constructor(data: any = null) {
    if (!data) return;
    Object.assign(this, data);
  }
  email: string;
  scores: any[];
  userid: string;
}
