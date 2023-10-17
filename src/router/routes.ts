import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      {
        path: "join-game",
        name:"join-game",
        component: () => import('src/pages/join-game/JoinGame.vue')
      },
      {
        path: "game",
        name:"game",
        component: () => import('src/pages/game/Game.vue')
      },
      {
        path: "login",
        name:"login",
        component: () => import('src/pages/login/Login.vue')
      }
    ],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
