<template>
  <div v-if="isUpdated" class="notification">
    {{ notification }}
  </div>
  <div v-else>
    <div v-if="filePathName">
      <form class="row" @submit.prevent="saveTask">
        <label for="inputField">Create new task</label>
        <input v-model="inputValue">
      </form>
      <label>Storage path</label>
      <input disabled v-model="filePathName">
      <!-- <Greet /> -->
    </div>
    <button @click="leerJSONDialog">Load storage file</button>
  </div>
  <div class="nav" v-if="filePathName || isUpdated">
    <a href="#/">Back</a>
  </div>
</template>

<script setup>
import { dialog } from "@tauri-apps/api";
import { ref } from "vue";

import { getFilePathName } from "../api/filePathName";
const { filePathName } = getFilePathName()

import { getData } from '../api/loadData.js'
const { data, load } = getData()

// import Greet from "../components/Greet.vue";
const inputValue = ref('');
const isUpdated = ref(false)
const notification = ref('Datos cargados correctamente')

const saveTask = () => {
  load()
  data.value.push({ name: inputValue.value, days: [] });
  saveJson()
};

async function leerJSONDialog () {
  try {
    const result = await dialog.open({ directory: false, multiple: false });
    if (!result || !result.length) {
      notification.value = "No file selected.";
      return;
    }
    localStorage.setItem('filePathName', result)
    isUpdated.value = true
  } catch (error) {
    notification.value = "Error al leer el archivo JSON";
  }
}

</script>

<style scoped>
.nav {
  padding-top: 3px;
  text-align: center;
}
</style>
