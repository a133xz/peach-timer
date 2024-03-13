import { fs } from "@tauri-apps/api";
import { save as saveDialog } from "@tauri-apps/api/dialog";
import { filePathName } from "./filePathName";

const saveFileDialog = async () => {
  try {
    const filePath = await saveDialog({
      filters: [
        {
          name: "JSON Files",
          extensions: ["json"],
        },
      ],
    });
    return filePath;
  } catch (error) {
    console.error("Error while writing JSON file:", error);
    throw new Error("Error");
  }
};

const writeJSONData = async (filePath, data) => {
  try {
    await fs.writeTextFile(filePath, JSON.stringify(data));
    console.log("JSON written successfully.");
  } catch (error) {
    console.error("Error while writing JSON file:", error);
    throw new Error("Error");
  }
};

export const createStorageFile = async (inputValue) => {
  const dataObj = [{ name: inputValue, days: [] }];
  try {
    const filePath = await saveFileDialog();
    await writeJSONData(filePath, dataObj);
    localStorage.setItem('filePathName', filePath);
    filePathName.value = filePath
  } catch (error) {
    console.error("Error while saving the file:", error);
    throw new Error("Error");
  }
};

const createEntry = (task, totalTimeSeconds) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  let dayExists = false;

  for (const day of task.days) {
    if (day.day === formattedDate) {
      day.time += totalTimeSeconds;
      dayExists = true;
      break;
    }
  }

  if (!dayExists) {
    task.days.push({ day: formattedDate, time: totalTimeSeconds });
  }
};

export const createEntryAndStore = async (task, totalTimeSeconds, data) => {
  createEntry(task, totalTimeSeconds);
  await writeJSONData(filePathName.value, data);
};
