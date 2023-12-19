<script lagn="ts" setup>
defineProps({
    message: {
        type: String,
    },
    color: {
        type:String,
    }
})
</script>
<template>
    <div class="spinner-box">
        <h3 v-if="message">{{ message }}</h3>
        <div class="pulse-container">
            <div class="pulse-bubble pulse-bubble-1" :style="{backgroundColor: color}" />
            <div class="pulse-bubble pulse-bubble-2" :style="{backgroundColor: color}" />
            <div class="pulse-bubble pulse-bubble-3" :style="{backgroundColor: color}" />
        </div>
    </div>
</template>

<style scoped>
@keyframes pulse {
    from {
        opacity: 1;
        transform: scale(1);
    }

    to {
        opacity: .25;
        transform: scale(.75);
    }
}
h3 {
    font-weight:bold;
    font-size:1.5em;
    text-align: center;
    padding-bottom:30px;
}
.pulse-container {
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pulse-bubble {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.pulse-bubble-1 {
    animation: pulse .4s ease 0s infinite alternate;
}

.pulse-bubble-2 {
    animation: pulse .4s ease .2s infinite alternate;
}

.pulse-bubble-3 {
    animation: pulse .4s ease .4s infinite alternate;
}
</style>