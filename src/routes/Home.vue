<template>
  <SubNav ref="selectedTab" />
  <div v-show="isSelectedHome">
    <select v-model="selectedTask" class="mb-2">
      <option value="-1" selected disabled>Select from the list</option>
      <option v-for="(task, index) in data" :key="index" :value="index">{{ task.name }}</option>
    </select>
    <Crono :selectedTask="selectedTask" />
  </div>
  <div v-show="!isSelectedHome">
    <Stats />
  </div>

</template>

<script setup>
import { ref } from "vue";
import { data } from '../api/loadData.js'
import Crono from '../components/Crono.vue'
import Stats from '../components/Stats.vue'
import SubNav from '../components/SubNav.vue'

import { selectedTab as isSelectedHome} from '../api/selectedTab';
const selectedTask = ref(-1);

</script>
