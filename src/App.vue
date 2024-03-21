<template>
  <div class="main">
    <component :is="currentView" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { filePathName } from "./api/filePathName";
import { loadData } from './api/loadData';

import Home from './routes/Home.vue'
import Settings from './routes/Settings.vue'
import NotFound from './routes/NotFound.vue'


const routes = {
  '/': Home,
  '/settings': Settings
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  if (!filePathName.value) {
    window.location.hash = "#/settings";
  } else {
    loadData()
  }
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>
