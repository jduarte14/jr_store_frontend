<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <section>
    <h1>Dashboard</h1>
    <div class="dashboard_container">
      <div class="box">
        <RouterLink to="/dashboard/banners/catalog">Banners</RouterLink>
      </div>
      <div class="box">
        <p>Pages edition</p>
      </div>
      <div class="box">
        <p>Blog</p>
      </div>
      <div class="box full">
        <RouterLink to="/dashboard/catalog"> Manage products </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  color: white;
  font-weight: bold;
}

h1 {
  text-align: center;
  padding-bottom: 10px;
  font-size: 4em;
  margin-top: 5px;
  border-bottom: 3px solid var(--blueGray);
  max-width: max-content;
  margin: 0 auto 40px;
  cursor: pointer;
}

.box {
  border: 3px solid var(--blueGray);
  border-radius: 7px;
  padding: 5px 15px;
  min-height: 130px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease;
  cursor: pointer;
  font-size: 1.5em;
  letter-spacing: 1.2px;
}
a {
  color: white;
  text-decoration: none;
}
.box:hover {
  border: 3px solid var(--gray);
}

@media (min-width: 921px) {
  section {
    max-width: 70%;
    margin: 0 auto;
  }

  .full {
    grid-area: 3 / 1 / 4 / 4;
  }

  .dashboard_container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    place-content: center;
    margin: 0 auto;
  }
}
@media (max-width: 920px) {
    section {
        max-width: 90%;
        margin: 0 auto;
    }
    h1 {
        font-size:1.8em;
        text-align:center;
    }
    
    .full {
        grid-area: 3 / 1 / 4 / 2;
    }
    
    .dashboard_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .box {
        width:100%;
        margin-left:10px;
        margin-right:10px;
    }
}
</style>
