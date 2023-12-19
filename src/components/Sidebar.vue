<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue';

defineProps({
    toggleSidebar: {
        type: Function,
        required: true,
    },
    sidebar: {
        type: Boolean,
        required: true,
    }
})


</script>


<template>
    <aside :class="sidebar ? 'active' : ''">
        <div class="ico" @click="toggleSidebar">
            <Icon icon="iconamoon:close" color="white"/>
        </div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/catalog">Catalog</RouterLink>
    </aside>
    <div :class="sidebar ? 'active' : ''" @click="toggleSidebar" class="overlay" />
</template>

  
<style scoped>
@media (min-width:981px) {
    aside {
        display: none;
    }
}

@media (max-width:980px) {
    .ico {
        position:absolute;
        top:10px;
        right:5px;
        font-size:35px;
        font-weight:bold;
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        opacity: 0;
        transition: 0.3s ease;
        pointer-events: none;
        z-index: -1;
    }

    .overlay.active {
        pointer-events: all;
        opacity: 1;
    }

    aside {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: max-content;
        background-color: var(--color-background);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 2px solid white;
        padding: 10px;
        transform: translateX(-100%);
        transition: 0.3s ease-in-out;
        background: var(--black);
    }

    aside.active {
        transform: translateX(0);
    }

    a {
        color: white;
        font-weight: bold;
        padding: 10px 15px;
        text-decoration: none;
        letter-spacing: 1.2px;
        font-size: 1.2em;
    }

    a+a {
        border-top: unset;
    }
}
</style>