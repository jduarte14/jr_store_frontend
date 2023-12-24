<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
const active = ref(false);
defineProps({
    icon: String,
    warnTitle: String,
    warnMessage: String,
    firstFunction: Function,
    secondFunction: Function,
    buttonOneText: String,
    buttonTwoText: String,
})

onMounted(() => {
    setTimeout(() => {
        active.value = true
    }, 100)
})

</script>
<template >
    <aside>
        <div class="warn_popup" :class="active ? 'active' : ''">
            <div class="icon" v-if="icon === 'success'">
                <div class="icon_container">
                    <Icon icon="ooui:success" color="#84cc16" class="success" />
                </div>
            </div>
            <div class="icon" v-if="icon === 'error'">
                <div class="icon_container">
                    <Icon icon="pepicons-pop:exclamation" color="#efefef" class="error" />
                </div>
            </div>
            <h2 v-if="warnTitle">{{ warnTitle }}</h2>
            <b v-if="warnMessage">{{ warnMessage }}</b>
            <button v-if="firstFunction" @click="firstFunction">{{ buttonOneText }}</button>
            <button v-if="secondFunction" @click="secondFunction">{{ buttonTwoText }}</button>
        </div>
    </aside>
    <div class="overlay" :class="active ? 'active' : ''" />
</template>
<style scoped>
.icon {
    position: relative;
    display: flex;
    justify-content: center;
}

.icon_container {
    font-size: 50px;
    position: absolute;
    top: -50px;
    display: flex;
    justify-content: center;
    background: #efefef;
    border-radius: 100px;
    padding: 10px;
}

.icon svg {
    border-radius: 100%;
}

.success {
    filter: drop-shadow(10px 8px 10px #84cc16);
    background: white;
}

.error {
    filter: drop-shadow(10px 8px 10px #ff0000);
    background: #ff0000;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

button {
    background-color: var(--black);
    border-radius: 10px;
    padding: 8px 10px;
    color: white;
    font-weight: bold;
    border: none;
    font-size: 1em;
    transition: 0.3s ease;
    cursor: pointer;
    font-size: 1.2em;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}



.warn_popup b {
    padding-bottom: 20px;
    line-height: 1.5;
    max-width: 15vw;
    text-align: center;
}

aside {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    z-index: 2;
}

.warn_popup {
    background-color: #efefef;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    max-width: max-content;
    position: relative;
    height: max-content;
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    z-index: 2;


}

.warn_popup,
.overlay {
    opacity: 0;
    transition: 0.5s ease;
}

.warn_popup.active,
.overlay.active {
    opacity: 1;
}

.overlay.active {
    backdrop-filter: blur(5px);
    background:rgba(0,0,0,0.3);
}

@media (max-width:920px) {
    .warn_popup b {
        max-width: 250px;
    }
}
</style>