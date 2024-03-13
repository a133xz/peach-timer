<template>
    <div class="flex">
        <div class="left crono-timer">{{ timer }}</div>
        <div v-if="false" class="animate__animated animate__jackInTheBox animate__infinite">🍑</div>
    </div>
    <button :disabled="selectedTask === -1" @click="controlTimer">{{ textButton }}</button>
    <div style="text-align: center;" v-show="textButton === 'Continue'">
        <a @click="createEntryAndSave(selectedTask, true)">Save</a>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(['selectedTask', 'data'])

import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti()

import { createEntry, saveData } from "../api/saveData";
const { saveJSONFile } = saveData()

let timerInterval;
let tiempoTotalSegundos = 0;

const textButton = ref('Start')
const timer = ref('0s');
const timerRunning = ref(false); // Variable para almacenar el tiempo total en segundos

watch(() => props.selectedTask, (newValue, oldValue) => {
    if (oldValue >= 0) {
        createEntryAndSave(oldValue)
    }
});

const formatTime = (totalSeconds) => {
    if (totalSeconds < 60) {
        return `${totalSeconds}s`;
    } else if (totalSeconds < 3600) {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${minutes}min ${seconds}s`;
    } else {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}h ${seconds}s`;
    }
}

const controlTimer = () => {
    textButton.value = "Pause"
    if (timerRunning.value) {
        textButton.value = "Continue"
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(actualizarCronometro, 1000);
    }
    timerRunning.value = !timerRunning.value;
};

function actualizarCronometro () {
    tiempoTotalSegundos++; // Aumentar el tiempo total en segundos
    timer.value = formatTime(tiempoTotalSegundos);
}

function reiniciarCronometro () {
    textButton.value = 'Start'
    clearInterval(timerInterval);
    tiempoTotalSegundos = 0; // Reiniciar también el tiempo total en segundos
    timer.value = "0s"
    timerRunning.value = false
}

function createEntryAndSave (taskIndex, isConfetti) {
    const task = props.data[taskIndex]
    createEntry(task, tiempoTotalSegundos)
    saveJSONFile(props.data)
    if (isConfetti) {
        jsConfetti.addConfetti({
            emojis: ['🍑'], // Use the emoji as confetti
            emojiSize: 70,
            confettiNumber: 40, // Number of confetti particles
        });
    }
    reiniciarCronometro()
} 
</script>


<style scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.crono-timer {
    font-size: 28px;
    padding: 15px 0;
    width: 38px;
}

.save {
    color: white;
    background-color: rgb(31, 136, 61);
}

@-webkit-keyframes jackInTheBox {
    from {
        opacity: 1;
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
    }

    50% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg);
    }

    70% {
        -webkit-transform: rotate(3deg);
        transform: rotate(3deg);
    }

    to {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

.animate__jackInTheBox {
    -webkit-animation-name: jackInTheBox;
    animation-name: jackInTheBox;
}

.animate__animated {
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-duration: var(--animate-duration);
    animation-duration: var(--animate-duration);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.animate__animated.animate__infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
}
</style>
