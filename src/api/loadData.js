import { ref } from "vue";
import { fs } from "@tauri-apps/api";
import { filePathName } from "./filePathName";

export const getData = () => {
  if (!filePathName.value) {
    window.location.hash = "#/settings";
  }
  const data = ref([]);
  const load = async () => {
    try {
      const content = await fs.readTextFile(filePathName.value, {});
      data.value = JSON.parse(content);
    } catch (err) {
      console.error("Error al leer el archivo JSON:", err);
    }
  };
  return { data, load };
};
