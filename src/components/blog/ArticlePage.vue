<script setup>
import { ref, onBeforeMount } from 'vue'
import { getArticleById } from '@/controllers/Blog.js'
import { useRoute } from 'vue-router'
import ArticleContent from "@/components/blog/ArticleContent.vue";

const article = ref(null);
const articleTemplate = ref(null);


const setupArticleTemplate =()=> {
    let { content } = article.value;
    
    console.log(content, "_content_");
}

const getData = async () => {
  const id = useRoute().params.id
  const articleData = await getArticleById(id)
  if (articleData) {
    article.value = articleData.article;
    setupArticleTemplate();
  }
}

onBeforeMount(async () => {
  await getData()
})
</script>

<template>
  <main>
    <div class="main_info">
    <h1>
        {{article.title}}
    </h1>
    <img :src="article.banner" alt="">
    </div>
    <ArticleContent :content="article.content" />
  </main>
</template>

<style scoped>
.main_info h1 {
    font-size: 4rem;
    color: white;
}
.content_wrapper {
    color: white;
}
.content_wrapper h2 {

}

</style>