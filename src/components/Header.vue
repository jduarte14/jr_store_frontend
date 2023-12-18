<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './Sidebar.vue';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
const sidebar = ref(false);

const toggleSidebar = () => {
    sidebar.value = !sidebar.value
}

</script>
<template>
    <header>
        <div class="header_container">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <div class="logo">
                    <p>Javier Rebora</p>
                </div>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>

            </nav>
            <div class="hamburguer_icon" @click="toggleSidebar">
                <Icon icon="ci:hamburger-lg" color="white" />
            </div>
            <Sidebar :sidebar="sidebar" :toggleSidebar="toggleSidebar" />

        </div>
    </header>
</template>
<style scoped>
.hamburguer_icon {
    margin-left: auto;
    color: white;
    position: absolute;
    right: 5px;
    font-size: 35px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.header_container {
    display: flex;
    justify-content: center;
    align-items: baseline;
    color: white;
    position: relative;
}

header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 5px;
    background-color: #c7c7c7;
    background-image: linear-gradient(to bottom, #333, #c7c7c7);
    z-index:2;
}

nav {
    display: flex;
    justify-content: center;
    align-items: baseline;
}

.logo {
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    letter-spacing: 3.5px;
}

.logo {
    border-bottom: 2px solid white;
    margin-left: 20px;
    margin-right: 20px;
}

a {
    color: white;
    font-weight: bold;
    margin: 0 10px;
    text-decoration: none;
    position: relative;
    padding: 5px 6px;
    letter-spacing: 1.2px;
}

a::after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    height: 2px;
    background: white;
    width: 0;
    transition: width 0.3s ease-in-out;
}

a:hover::after {
    width: 100%;
}

@media (max-width:980px) {
    a {
        display: none;
    }

    .header_container {
        align-items: center;
    }
    header {
        position:relative;
        background:var(--black);
    }
    
}

@media (min-width:981px) {
    .hamburguer_icon {
        display: none;
    }
}</style>