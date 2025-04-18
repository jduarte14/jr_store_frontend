<script setup>
import { ref, onBeforeMount } from 'vue'
import { getArticleById } from '@/controllers/Blog.js'
import { useRoute } from 'vue-router'
import ArticleContent from '@/components/blog/ArticleContent.vue'

const article = ref(null)
const articleTemplate = ref(null)

const setupArticleTemplate = () => {
  let { content } = article.value

  console.log(content, '_content_')
}

const getData = async () => {
  const id = useRoute().params.id
  const articleData = await getArticleById(id)
  if (articleData) {
    article.value = articleData.article
    setupArticleTemplate()
  }
}

onBeforeMount(async () => {
  await getData()
})
</script>

<template>
  <main>
    <section class="main_section">
      <div class="main_info">
        <h1>
          {{ article.title }}
        </h1>
        <b class="category">{{ article.category }}</b>
        <img :src="article.banner" :alt="`${article.title}__banner`" class="banner_image" />
      </div>
      <ArticleContent :content="article.content" />
    </section>
  </main>
</template>

<style scoped>
.main_info {
    display: flex;
    margin-bottom: 1.5rem;
    flex-direction: column;
}
.main_info h1 {
  font-size: 4rem;
  color: white;
  margin-bottom: 0.5rem;
}
.main_section {
  margin: 0 auto;
  margin-right: 3.5rem;
  margin-left: 3.5rem;
  background: #040f1e;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-bottom: 10px solid #1f2937;
  border-top: 10px solid #1f2937;
  padding-inline: 5rem;
  padding-top: 1rem;
  margin-bottom: 2rem;
}
.category {
    color: white;
    background: var(--slate);
    padding: 5px 10px;
    border-radius: 10px;
    max-width: max-content;
    margin-bottom: 15px;
}
.banner_image {
    max-width: 80%;
}
</style>