import { ref } from "vue";
const localFilePathName = localStorage.getItem("filePathName");
export const filePathName = ref(localFilePathName);