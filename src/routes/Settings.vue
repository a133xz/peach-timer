<template>
  <form class="row" @submit.prevent="saveTask">
    <label>New timer</label>
    <input v-model="inputValue">
  </form>
  <button v-if="filePathName" @click="createFileAndSave" class="success" :disabled="isDisabled">Create timer</button>
  <button v-else @click="createFileAndSave" class="success" :disabled="isDisabled">Create storage file</button>
  <hr />
  <div v-if="filePathName">
    <input disabled v-model="filePathName">
  </div>
  <button @click="leerJSONDialog">Load storage file</button>
  <div class="nav" v-if="filePathName">
    <a href="#/">Back</a>
  </div>
</template>

<script setup>
import { dialog } from "@tauri-apps/api";
import { ref, computed } from "vue";

import { filePathName } from "../api/filePathName";
import { createStorageFile } from "../api/saveData";

const inputValue = ref('');
const isUpdated = ref(false)
const notification = ref('Data loaded successfully')

const isDisabled = computed(() => {
  return inputValue.value.length > 0 ? false : true
})

const createFileAndSave = async () => {
  await createStorageFile(inputValue.value)
  window.location.hash = "#/";
};

async function leerJSONDialog () {
  try {
    const result = await dialog.open({ directory: false, multiple: false });
    if (!result || !result.length) {
      notification.value = "No file selected.";
      return;
    }
    localStorage.setItem('filePathName', result)
    window.location.hash = "#/";
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

hr {
  margin: 10px -8px;
  border-radius: 0;
}
</style>
