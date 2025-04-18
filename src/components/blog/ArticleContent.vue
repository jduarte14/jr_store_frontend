<script setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <section>
    <div class="content" v-html="props.content" />
  </section>
</template>

<style>
.content {
    color: white;
    line-height: 1.5;
    max-width: 80%;
}
.content h2 {
    font-size: 2.5rem;
}
.content p {
    font-size: 1.2rem;
}
</style>