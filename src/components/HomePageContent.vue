<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import ArticleHome from '@/components/blog/ArticleHome.vue'
import ProductSwiper from '@/components/ProductSwiper.vue'
import { useGsapScrollAnimation } from '@/composables/useGsapScrollAnimation.js'
import { getGroupsByCategory } from '@/controllers/Groups.js'

const paintings = ref(null);
const pictures = ref(null);
const products = ref(null);

const fetchArticles = async () => {
  const [paintingsRes, picturesRes, productRes] = await Promise.all([
    getGroupsByCategory('paintings', 'article'),
    getGroupsByCategory('pictures', 'article'),
    getGroupsByCategory('products', 'product'),
  ])

  paintings.value = paintingsRes.groups[0]?.items;
  pictures.value = picturesRes.groups[0]?.items
  products.value = productRes.groups[0]?.items
}

onMounted(async () => {
  await fetchArticles()
})
</script>

<template>
  <main>
    <section class="main_section">
      <div class="info_top">
        <h2 class="title">Products</h2>
        <h2 class="title slate_title">Featured art works</h2>
        <ProductSwiper :products="products"/>
      </div>
      <hr />
      <div class="title_row" v-if="paintings?.length && pictures?.length">
        <div>
          <h2 class="title">Capturing the Unseen</h2>
          <h2 class="title slate_title">Remembering Through Creation.</h2>
          <ArticleHome :articles="paintings" :pictures="pictures" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main_section {
  padding-top: 2rem;
  padding-inline: 4rem;
  margin: 0 auto;
}

hr {
  margin: 0 auto;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 2px;
  background: white;
  border-radius: 10px;
}

h2 {
  font-size: 3.8rem;
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

.title_row {
  display: flex;
  justify-content: space-between;
}

.slate_title {
  color: var(--slate);
  text-shadow: -1px -1px 0 #e0e0e0, 1px -1px 0 #e0e0e0, -1px 1px 0 #e0e0e0, 1px 1px 0 #e0e0e0,
    0px -1px 0 #e0e0e0, 0px 1px 0 #e0e0e0, -1px 0px 0 #e0e0e0, 1px 0px 0 #e0e0e0;
}
</style>