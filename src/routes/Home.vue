<template>
  <SubNav ref="selectedTab" />
  <div v-show="isSelectedHome">
    <select v-model="selectedTask" class="mb-2">
      <option value="-1" selected disabled>Select from the list</option>
      <option v-for="(task, index) in data" :key="index" :value="index">{{ task.name }}</option>
    </select>
    <Crono :selectedTask="selectedTask" :data="data" />
  </div>
  <div v-show="!isSelectedHome">
    <Stats :data="data" />
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getData } from '../api/loadData.js'
import { saveData } from "../api/saveData";
import Crono from '../components/Crono.vue'
import Stats from '../components/Stats.vue'
import SubNav from '../components/SubNav.vue'

const selectedTask = ref(-1);
const { data, load } = getData()

const selectedTab = ref(true)
const isSelectedHome = computed(() => selectedTab.value?.selectedTab)

onMounted(() => {
  load()
})

</script>
