import { ref } from "vue";
import { fs } from "@tauri-apps/api";
import { getFilePathName } from "./filePathName";

export const getData = () => {
  const { filePathName } = getFilePathName();
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
