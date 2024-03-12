<template>
  <select v-model="selectedTask" class="form-control mb-2">
    <option value="" selected disabled>Task</option>
    <option v-for="(task, index) in data" :key="index" :value="index">{{ task.name }}</option>
  </select>
  <Crono :selectedTask="selectedTask" :data="data" />
</template>


<script setup>
import { ref, onMounted } from "vue";
import { getData } from '../api/loadData.js'
import Crono from '../components/Crono.vue'

const selectedTask = ref('');
const { data, load } = getData()

onMounted(() => {
  load()
})

</script>
