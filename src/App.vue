<template>
  <div class="main">
    <component :is="currentView" />
  </div>
  <div class="nav">
    <a href="#/" v-if="currentPath !== '#/' && currentPath !== ''">Back</a>
    <a href="#/stats" v-if="currentPath === '#/' || currentPath === ''">Stats </a> <span
          v-if="currentPath === '#/' || currentPath === ''" style="color: var(--color-text);">| </span>
    <a href="#/settings" v-if="currentPath === '#/' || currentPath === ''">Settings</a>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import Home from './routes/Home.vue'
import Settings from './routes/Settings.vue'
import Stats from './routes/Stats.vue'
import NotFound from './routes/NotFound.vue'

const routes = {
  '/': Home,
  '/settings': Settings,
  '/stats': Stats
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>
