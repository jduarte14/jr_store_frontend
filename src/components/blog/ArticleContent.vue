<script setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<template>
    <div class="content" v-html="props.content" />
</template>

<style>
.content {
    color: white;
    line-height: 1.5;
}
.content h2 {
    font-size: 2.5rem;
}
.content p {
    font-size: 1.2rem;
}
@media (min-width: 1023px) {
    .content {
        max-width: 80%;
    }
}
</style>