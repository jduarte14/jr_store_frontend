<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from './../stores/productStore'
import { RouterLink } from 'vue-router'

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  products: {
      type: Array,
    }
})

const productRef = ref([])

const splideOptions = {
  type: 'slide',
  gap: '30px',
  perPage: 5,
  pagination: true,
  arrows: true,
  breakpoints: {
    1024: {
      perPage: 5
    },
    768: {
      perPage: 3
    },
    320: {
      perPage: 2
    }
  }
}
</script>

<template>
  <div class="title">
    <div class="info" v-if="title && subTitle">
      <div class="row">
        <hr />
        <h2>{{ title }}</h2>  
        <hr />
      </div>
      <p>{{ subTitle }}</p>
    </div>

    <div v-if="productRef" class="swiper_row">
      <Splide :options="splideOptions">
        <SplideSlide v-for="product in products" :key="product._id" class="product_box">
          <RouterLink :to="`/product/${product._id}`">
            <img :src="product.image" :alt="product.name" />
            <h2>{{ product.name }}</h2>
            <span class="price" v-if="product.price">Є{{ product.price }}</span>
            <p>{{ product.description }}</p>
          </RouterLink>
        </SplideSlide>
      </Splide>
    </div>

    <div v-else>
      <p style="color: white">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
}

p {
  color: white;
  font-weight: bold;
  letter-spacing: 1.5px;
}

h2 {
  font-weight: bold;
  color: white;
  letter-spacing: 1.5px;
}

.row {
  display: flex;
  align-items: baseline;
  width: 100%;
  justify-content: center;
}

.row hr {
  width: 20px;
  height: 3px;
  background: white;
  border-radius: 10px;
  margin: 3px;
}

.price {
  font-weight: bold;
  font-size: 20px;
  color: black;
}

img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.product_box {
  background: white;
  padding: 10px;
  border-radius: 10px;
  max-width: max-content;
  height: auto;
}

.product_box a {
  text-decoration: none;
}

body {
  overflow-x: hidden;
}

.product_box h2 {
  color: black;
  font-weight: bold;
}

.product_box p {
  color: black;
  line-height: 1.2;
  font-size: 14px;
}

@media (min-width: 921px) {
  .swiper_row {
    margin: 0 auto;
    padding-top: 2%;
    padding-bottom: 2%;
  }
}

@media (max-width: 920px) {
  .swiper_row {
    padding-top: 30px;
  }

  .product_box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product_box h2 {
    font-size: 20px;
  }

  .product_box p {
    font-size: 12px;
    text-wrap: wrap;
  }

  .product_box a {
    padding: 0;
    margin: 0;
    max-width: max-content;
    width: 100%;
  }
}
</style>
