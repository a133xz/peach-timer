//export const filePathName = "/Users/antonio/Documents/Local/GIT/vue-tauri/data/example.json";

import { ref } from "vue";

export const getFilePathName = () => {
  const filePathName = ref(localStorage.getItem("filePathName"));
  return { filePathName };
};
