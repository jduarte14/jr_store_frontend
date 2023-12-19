<script setup>
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
</script>
<template>
    <section>
        <div class="not_found_container">
            <Icon icon="mdi:error-outline" />
            <Icon icon="tabler:error-404" />
            <p>There's nothing here! <br>
                The page dosnt exist</p>
                <RouterLink to="/">
                    Go back to home    
                </RouterLink>
        </div>
    </section>
</template>

<style scoped>
section {
    min-height: 70vh;
    height: 100%;
    display: grid;
    place-content: center;
}

.not_found_container {
    color: white;
    border: 3px solid white;
    border-radius: 10px;
    padding: 10px;
    min-width: 25vw;
    min-height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

a {
    color:white;
    font-weight:bold;
    transition:0.3s ease;
}
a:hover {
    opacity:0.8;
}

p {
    font-size: 1.1em;
}

svg {
    font-size: 5em;
}
</style>