import BaseServices from "src/services/BaseService";
import WebSocketClient from "src/services/SocketService";

export default class ApiService {
  static async login() {
    return await BaseServices.Post(`goauth/getOauthUrl`);
  }
  static async getToken(id: string) {
    return await BaseServices.Post(`auth/login?id=${id}`);
  }
  static async isLogin() {
    return await BaseServices.Post(`auth/isLogin`);
  }
  static async getGame() {
    return await BaseServices.Post(`game/getGame`);
  }
  static async createGame() {
    return await BaseServices.Post(`game/createGame`);
  }
  static async joinGame(id: string) {
    return await BaseServices.Post(`game/join?id=${id}`);
  }
  static async removeGame(id: string) {
    return await BaseServices.Post(`game/remove?id=${id}`);
  }
  static async startGame(id: string) {
    return await BaseServices.Post(`game/startGame`, { id });
  }
  static async lockDice(diceIndex: number) {
    return await BaseServices.Post(`game/lock`, { index: diceIndex });
  }
  static async unlockDice(diceIndex: number) {
    return await BaseServices.Post(`game/unlock`, { index: diceIndex });
  }
  static async roll() {
    return await BaseServices.Post(`game/rool`);
  }
  static async assign(type: number) {
    return await BaseServices.Post(`game/setScore`, { type });
  }
}
