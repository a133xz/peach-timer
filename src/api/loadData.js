import { ref } from "vue";
import { fs } from "@tauri-apps/api";
import { filePathName } from "./filePathName";

if (!filePathName.value) {
  window.location.hash = "#/settings";
}

let jsonData;
const loadData = async () => {
  try {
    const content = await fs.readTextFile(filePathName.value, {});
    jsonData = JSON.parse(content);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
  }
};

loadData()
export const data = ref(jsonData);
