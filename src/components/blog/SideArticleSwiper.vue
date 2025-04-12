<script setup>
import { ref } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { RouterLink } from 'vue-router'
import '@splidejs/vue-splide/css'

const props = defineProps({
  articles: {
    type: Array,
    default: () => []
  }
})

const items = ref(props.articles)

const splideOptions = {
  type: 'slide',
  gap: '1.5rem',
  perPage: 2,
  breakpoints: {
    1024: {
      perPage: 2
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
    <div class="row">
      <div class="title_block">
        <h2 class="slate_title">Remember on</h2>
        <br />
        <h2 class="slate_title">pictures.</h2>
      </div>
      <Splide :options="splideOptions" class="splide_row">
        <SplideSlide v-for="item in items" :key="item._id" class="article_box">
          <article>
            <RouterLink :to="`/article/${item._id}`">
              <img :src="item.banner" :alt="item.title" />
            </RouterLink>
          </article>
        </SplideSlide>
      </Splide>
    </div>
  </section>
</template>

<style scoped>
section {
  max-width: 100%;
  overflow: hidden;
}

.title_block {
    margin-right: 3rem;
    width: 100%;
}

.row {
  display: flex;
  align-items: center;
}

.splide_row {
  max-width: 60%;
  margin: 0 auto;
  position: relative;
  margin-top: 2rem;
}

article {
  color: white;
}

article img {
  border-radius: 5px;
  width: 100%;
}
h2 {
  font-size: 2.5rem;
  color: white;
  letter-spacing: 1.5px;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
}
h4 {
  font-size: 1.5rem;
  color: white;
  letter-spacing: 1.5px;
}
.slate_title {
  color: var(--slate);
  text-shadow: -1px -1px 0 #e0e0e0, 1px -1px 0 #e0e0e0, -1px 1px 0 #e0e0e0, 1px 1px 0 #e0e0e0,
    0px -1px 0 #e0e0e0, 0px 1px 0 #e0e0e0, -1px 0px 0 #e0e0e0, 1px 0px 0 #e0e0e0;
    font-size: 4.3rem;
}
</style>
