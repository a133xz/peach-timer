<template>
    <div>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Today</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in data" :key="task.name">
                    <td>{{ task.name }}</td>
                    <td>
                        {{ formatTime(getTimeToday(task)) }}
                    </td>
                    <td>{{ formatTime(getTotalTime(task)) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { getData } from '../api/loadData.js'
const { data, load } = getData()

onMounted(() => {
    load()
})

const getTotalTime = (task) => {
    let totalTimeInSeconds = task.days.reduce((acc, day) => {
        return acc + parseInt(day.time);
    }, 0);
    return totalTimeInSeconds;
};

const getTimeToday = (task) => {
    let lastItem = task.days[task.days.length - 1];

    return lastItem.time;
}

const formatTime = (totalSeconds) => {
    if (totalSeconds < 60) {
        return `${totalSeconds}s`;
    } else if (totalSeconds < 3600) {
        let minutes = Math.floor(totalSeconds / 60);
        return `${minutes}'`;
    } else {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}h`;
    }
};

</script>

<style scoped>
.styled-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto;
    font-size: 14px;
    text-align: left;
}

.styled-table thead th {
    font-size: 12px;
    background-color: var(--color-text);
    color: white;
    font-weight: 600;
    border: 1px solid #d0d7de;
    padding-left: 5px;
}

.styled-table tbody td {
    border: 1px solid #dddddd;
    padding: 5px;
}
</style>
