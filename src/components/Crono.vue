<template>
    <div class="flex">
        <div class="left crono-timer">{{ timer }}</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="icon" v-if="timerRunning">
            <path
                  d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
        </svg>
    </div>
    <button class="start" @click="controlTimer">{{ timerRunning ? 'Pause' : 'Start' }}</button>
    <!-- <button class="save" @click="saveData">Save</button> -->
</template>

<style scoped>
.flex {
    display: flex;
}

.crono-timer {
    font-size: 28px;
    padding: 15px 0;
    width: 38px;

}

.start,
.save {
    font-weight: bold;
}

.save {
    color: white;
    background-color: rgb(31, 136, 61);

}

.start {
    background-color: var(--color-primary);
}

.icon {
    margin-left: 20px;
    width: 15px;
    fill: var(--color-text);
}

hr {

    margin: 5px -10px;
}
</style>

<script setup>
import { fs } from "@tauri-apps/api";
import { ref, watch } from "vue";
import { getFilePathName } from "../api/filePathName";
const { filePathName } = getFilePathName();

const props = defineProps(['selectedTask', 'data'])

let timerInterval;
let segundos = 0;
let minutos = 0;
let horas = 0;

const timer = ref('0s');
const timerRunning = ref(false);
const tiempoTotalSegundos = ref(0); // Variable para almacenar el tiempo total en segundos

watch(() => props.selectedTask, (newValue, oldValue) => {
    saveData()
    reiniciarCronometro()
});

const formatTime = (totalSeconds) => {
    if (totalSeconds < 60) {
        return `${totalSeconds}s`;
    } else if (totalSeconds < 3600) {
        let minutes = Math.floor(totalSeconds / 60);
        return `${minutes}min`;
    } else {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}h`;
    }
}

const controlTimer = () => {
    if (timerRunning.value) {
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(actualizarCronometro, 1000);
    }
    timerRunning.value = !timerRunning.value;
};


function reiniciarCronometro () {
    clearInterval(timerInterval);
    segundos = 0;
    minutos = 0;
    horas = 0;
    tiempoTotalSegundos.value = 0; // Reiniciar también el tiempo total en segundos
    timer.value = "0s"
    timerRunning.value = false
}

function actualizarCronometro () {
    segundos++;
    tiempoTotalSegundos.value++; // Aumentar el tiempo total en segundos
    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }
    if (minutos === 60) {
        minutos = 0;
        horas++;
    }
    timer.value = formatTime(horas * 3600 + minutos * 60 + segundos);
}

// Guardado
const saveData = async () => {
    const tasks = props.data
    createEntry(tasks)
    await saveJson(tasks)
    reiniciarCronometro()
}

const createEntry = (tasks) => {
    const task = tasks[props.selectedTask];

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    let dayExists = false;

    // Iterar sobre el arreglo de días
    for (const day of task.days) {
        // Verificar si el día ya existe
        if (day.day === formattedDate) {
            // Sumar el tiempo al día existente
            day.time += tiempoTotalSegundos.value;
            dayExists = true;
            break; // Terminar la iteración ya que encontramos el día
        }
    }
    // Si el día no existe, agregarlo al arreglo
    if (!dayExists) {
        task.days.push({ day: formattedDate, time: tiempoTotalSegundos });
    }
};

const saveJson = async (tasks) => {
    try {
        await fs.writeTextFile(filePathName, JSON.stringify(tasks));
        console.log("JSON escrito correctamente.");
    } catch (error) {
        console.error("Error al escribir el archivo JSON:", error);
    }
}
</script>
