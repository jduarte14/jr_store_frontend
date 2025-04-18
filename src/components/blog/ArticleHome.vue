<script setup>
import ArticleSwiper from './ArticleSwiper.vue'
import SideArticleSwiper from './SideArticleSwiper.vue'
import BottomArrow from './BottomArrow.vue'

defineProps({
  articles: {
    type: Array,
    default: () => []
  },
  pictures: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <main>
    <section class="main_section">
      <ArticleSwiper :articles="articles" :showTitle="false" />
      <hr />
      <SideArticleSwiper :articles="pictures" />
    </section>
    <section>
      <hr />
      <div class="row">
        <BottomArrow link="/articles" text="Watch all articles" />
        <BottomArrow link="/catalog" text="Watch all products" />
      </div>
    </section>
  </main>
</template>

<style scoped>
hr {
  margin: 0 auto;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
  height: 2px;
  background: white;
  border-radius: 10px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>