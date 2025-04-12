<script setup>
import { ref } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { RouterLink } from 'vue-router'
import '@splidejs/vue-splide/css'

const props = defineProps({
  articles: {
    type: Array,
    default: () => []
  },
  showTitle: {
    type: Boolean,
  }
})

const items = ref(props.articles)

const splideOptions = {
  type: 'slide',
  gap: '1.5rem',
  perPage: 4,
  breakpoints: {
    1024: {
      perPage: 4
    },
    768: {
      perPage: 3
    },
    320: {
      perPage: 2
    }
  },
  pagination: true,
  arrows: true
}
</script>

<template>
  <section>
    <Splide :options="splideOptions" class="splide_row">
      <SplideSlide v-for="item in items" :key="item._id" class="article_box">
        <article>
          <RouterLink :to="`/article/${item._id}`">
            <img :src="item.banner" :alt="item.title" />
            <h2 v-if="showTitle">{{ item.title }}</h2>
          </RouterLink>
        </article>
      </SplideSlide>
    </Splide>
  </section>
</template>

<style scoped>
section {
  max-width: 100%;
  overflow: hidden;
}

.splide_row {
  width: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: 2rem;
}

article {
  max-width: 600px;
  color: white;
}

article img {
  border-radius: 5px;
  width: 100%;
}
</style>
