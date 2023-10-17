<script setup lang="ts">
import { useQuasar } from "quasar";
import ApiService from "src/services/ApiService";
import { appStore } from "src/stores/app";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import Disconnected from "src/components/disconnect.vue"

////////

const store = appStore()

const route = useRoute()

const $q = useQuasar()

const state = reactive({
})

</script>

<template>
  <q-layout view="lHh lpr lFf" class="layout">
    <Disconnected />
    <q-page-container >
      <router-view  />
    </q-page-container>

  </q-layout>
</template>

<style scoped lang="scss">
.layout{
  @apply bg-[var(--dark)] overflow-hidden;
}


</style>

