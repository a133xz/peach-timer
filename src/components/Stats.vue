<template>
    <div class="table">
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
                    <td v-if="task.days.length > 0">
                        {{ formatTime(getTimeToday(task)) }}
                    </td>
                    <td v-if="task.days.length > 0">{{ formatTime(getTotalTime(task)) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps(['data'])

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
.table {
    border: 1px solid;
    border-radius: 6px;
    border-color: rgba(31, 35, 40, 0.15);
    box-shadow: rgba(31, 35, 40, 0.1) 0px 1px 0px 0px,
        rgba(255, 255, 255, 0.03) 0px 1px 0px 0px inset;
    padding: 5px;
    background: white;
}

.styled-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto;
    text-align: left;
}

.styled-table thead {
    font-size: .8rem;
    /* background-color: var(--color-text); */
    color: var(--color-text);
    font-weight: 600;
    border-bottom: 1px solid #d0d7de;
    padding-left: 5px;
}

thead th {
    padding-bottom: 5px;
}

.styled-table tbody tr:not(:last-child) {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody td {
    padding: 5px 0;
}
</style>
