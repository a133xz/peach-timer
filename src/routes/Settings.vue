<template>
  <div v-if="isUpdated" class="notification">
    Archivo cargado correctamente
  </div>
  <div v-else>
    <form class="row" @submit.prevent="saveTask">
      <label for="inputField">Enter new task:</label>
      <input v-model="inputValue">
    </form>
    <label>Storage path</label>
    <input disabled v-model="filePathName">
    <!-- <Greet /> -->
    <button @click="leerJSONDialog">Load JSON</button>
  </div>
</template>

<script setup>
import { fs, dialog } from "@tauri-apps/api";
import { ref } from "vue";

import { getFilePathName } from "../api/filePathName";
const { filePathName } = getFilePathName()

import { getData } from '../api/loadData.js'
const { data, load } = getData()

// import Greet from "../components/Greet.vue";
const inputValue = ref('');
const isUpdated = ref(false)

const saveTask = () => {
  load()
  data.value.push({ name: inputValue.value, days: [] });
  saveJson()
};

const saveJson = async () => {
  try {
    await fs.writeTextFile(filePathName.value, JSON.stringify(data.value));
    console.log("JSON escrito correctamente.");
  } catch (error) {
    console.error("Error al escribir el archivo JSON:", error);
  }
}

async function leerJSONDialog () {
  try {
    const result = await dialog.open({ directory: false, multiple: false });
    if (!result || !result.length) {
      console.log("No file selected.");

      return;
    }
    localStorage.setItem('filePathName', result)
    isUpdated.value = true
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
  }
}

</script>
