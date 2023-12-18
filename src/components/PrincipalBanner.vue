<script lang="ts" setup >
import { defineComponent, ref } from 'vue';
const img = ref('https://dummyimage.com/1920x500/ffffff/000')

</script>
<template>
    <section>
        <div class="principal_banner">
            <img :src="img" alt="">
        </div>
    </section>
</template>

<style scoped>
    .principal_banner img {
        width:100%;
        min-width:100vw;
        height:auto;
    }
    .principal_banner {
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
</style>