import { fs } from "@tauri-apps/api";
import { getFilePathName } from "./filePathName";

export const createEntry = (task, tiempoTotalSegundos) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  let dayExists = false;

  // Iterar sobre el arreglo de días
  for (const day of task.days) {
    // Verificar si el día ya existe
    if (day.day === formattedDate) {
      // Sumar el tiempo al día existente
      day.time += tiempoTotalSegundos;
      dayExists = true;
      break; // Terminar la iteración ya que encontramos el día
    }
  }
  // Si el día no existe, agregarlo al arreglo
  if (!dayExists) {
    task.days.push({ day: formattedDate, time: tiempoTotalSegundos });
  }
};

export const saveData = () => {
  const { filePathName } = getFilePathName();
  const saveJSONFile = async (data) => {
    try {
      await fs.writeTextFile(filePathName.value, JSON.stringify(data));
      console.log("JSON escrito correctamente.");
    } catch (error) {
      console.error("Error al escribir el archivo JSON:", error);
    }
  };
  return { saveJSONFile };
};
