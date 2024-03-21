import { ref, reactive } from "vue";
import { fs } from "@tauri-apps/api";
import { filePathName } from "./filePathName";

const data = ref('');
const loadData = async () => {
  try {
    const content = await fs.readTextFile(filePathName.value, {});
    data.value = JSON.parse(content);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
  }
};


export  {loadData, data};
