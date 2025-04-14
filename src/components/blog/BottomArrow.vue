<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const { link, text } = defineProps({
  link: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <section>
    <div>
      <RouterLink :to="link">
        {{ text }}
      </RouterLink>
      
        <Icon class="icon" icon="gis:arrow-o" width="50" height="50" />
    </div>
  </section>
</template>

<style scoped>
section {
  padding-top: 4rem;
  margin: 0 auto;
  width: 100%;
  max-width: max-content;
}
div {
    transition: 0.5s ease;
    padding-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    
    color: transparent;
    position: relative;
}
div:hover {
    color: white;
}
a {
  color: white;
  letter-spacing: 1.3px;
  text-decoration: unset;
  font-weight: bold;
  font-size: 4rem;
  color: var(--slate);
  text-shadow: -1px -1px 0 #e0e0e0, 1px -1px 0 #e0e0e0, -1px 1px 0 #e0e0e0, 1px 1px 0 #e0e0e0,
    0px -1px 0 #e0e0e0, 0px 1px 0 #e0e0e0, -1px 0px 0 #e0e0e0, 1px 0px 0 #e0e0e0;
  font-size: 4.3rem;
  transition: 0.5s ease;
}
a:hover {
  color: white;
}
.icon{ 
    position: absolute;
    bottom: 10px;
    right: 5px;
}
</style>
