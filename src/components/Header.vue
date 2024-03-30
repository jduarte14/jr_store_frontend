<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './Sidebar.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/userStore'
import WarnPopUp from './WarnPopUp.vue'
const sidebar = ref(false)
const admin = ref(false)
const warn = ref(false)
const toggleSidebar = () => {
  sidebar.value = !sidebar.value
}
const Logout = () => {
  const userStore = useUserStore()
  userStore.removeUser()
  admin.value = false
  warn.value = false
}
const handleWarn = () => {
  warn.value = !warn.value
}
const getToken = async () => {
  const userStore = useUserStore()
  admin.value = await userStore.getUser()
  console.log('se ejecuta gettoken', admin.value, warn.value);
}

onMounted(() => {
  getToken()
})
</script>
<template>
  <header>
    <div class="top_menu" v-show="admin">
      <button class="btn" @click="handleWarn">Logout</button>
    </div>
    <div class="header_container">
      <div class="hamburguer_icon" @click="toggleSidebar">
        <Icon icon="ci:hamburger-lg" color="white" />
      </div>
      <Sidebar :sidebar="sidebar" :toggleSidebar="toggleSidebar" />
      <nav>
        <div class="left_side">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>

        <RouterLink to="/" class="logo">
          <p>Javier Rebora</p>
        </RouterLink>
        <div class="right_side">
          <RouterLink to="/catalog">Catalog</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink v-if="admin" to="/dashboard">Dashboard </RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <WarnPopUp
    v-if="warn"
    warnTitle="You will logout as a admin"
    warnMessage="if you logout you will se the site website as a customer"
    :firstFunction="Logout"
    buttonOneText="Logout"
    buttonTwoText="Cancel"
    :secondFunction="handleWarn"
  />
</template>
<style scoped>
.hamburguer_icon {
  margin-left: auto;
  color: white;
  position: absolute;
  left: 10px;
  font-size: 30px;
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
  top: 0;
  left: 0;
  right: 0;
  background-color: #c7c7c7;
  background-image: linear-gradient(to bottom, #333, #c7c7c7);
  z-index: 2;
  position: sticky;
  background: var(--black);
  padding: 10px 0;
}

nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
}
nav div {
  display: flex;
  width: 100%;
}
nav .left_side {
  justify-content: flex-end;
}
nav .right_side {
  justify-content: flex-start;
}

.logo {
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  letter-spacing: 3.5px;
  margin-left: 20px;
  margin-right: 20px;
}

.logo p {
  border-bottom: 2px solid white;
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

a:not(.logo)::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  height: 2px;
  background: white;
  width: 0;
  transition: width 0.3s ease-in-out;
}
.top_menu {
  position: absolute;
  right: 0;
  margin: 0 30px;
  z-index: 1;
}
.top_menu .btn {
  color: var(--black);
  font-size: 12px;
  background: var(--gray);
  border-radius: 5px;
  padding: 3px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  z-index: 1;
  border: unset;
}
.top_menu .btn:hover {
  opacity: 0.8;
}

a:hover::after {
  width: 100%;
}

@media (max-width: 980px) {
  a {
    display: none;
  }
  .top_menu {
    display: none;
  }

  .logo {
    border-bottom: unset;
  }

  .logo {
    font-size: 1em;
  }

  .header_container {
    align-items: center;
  }
}

@media (min-width: 981px) {
  .hamburguer_icon {
    display: none;
  }
}
</style>
