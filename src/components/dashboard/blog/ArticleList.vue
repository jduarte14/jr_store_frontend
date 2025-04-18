<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { getArticles } from "@/controllers/Blog.js"
import Spinner from '@/components/Spinner.vue';

const articleList = ref([]);


const getProducts = async () => {
    try {
        const data = await getArticles();
        articleList.value = data.articles;
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getProducts();
})

</script>
<template>
    <section class="dashboard_catalog" v-if="articleList">
        <div class="top_row">
            <div class="searchbox_container">
                <input type="search" class="search_box" placeholder="filter your product" />
                <div class="icon_btn">
                    <Icon icon="iconamoon:search-bold" color="white" />
                </div>
            </div>
            <div>
                <RouterLink class="catalog_button" to="/dashboard/blog/create">Create article</RouterLink>
            </div>
        </div>
        <div class="catalog">
            <div class="catalog_item" v-for="article in articleList" :key="article._id">
                <img :src="article.banner" alt="">
                <div class="row info_row">
                    <p>{{ article.title }}</p>
                </div>
                <RouterLink class="catalog_button" :to="`/dashboard/blog/patch/${article._id}`">Manage article</RouterLink>
            </div>
        </div>
    </section>
    <section v-else>
        <Spinner color="white" />
    </section>
</template>

<style scoped>
.info_row {
    margin-top: auto;
}
.searchbox_container {
    display: flex;
    align-items: center;
}

.icon_btn {
    padding: 5px 0;
    height: 35px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    position: relative;
    right: 26px;
    justify-content: center;
    cursor: pointer;
}

.search_box {
    padding: 10px 20px;
    border-radius: 10px;
    background: var(--slate);
    color: white;
    height: 45px;
    border: unset;
}

.search_box::placeholder {
    color: white;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 0.8px;
}

.row {
    display: flex;
    align-items: center;
}

.top_row {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom:30px;
}

.row p+p {
    margin-left: 10px;
}

section {
    display: grid;
    place-content: center;
    min-height: 70vh;
}

.catalog {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.catalog_item {
    margin-right: 20px;
    background: white;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.catalog_item img {
    max-width: 300px;
    height: auto;
    border-radius: 10px;
}

.catalog_item p {
    font-weight: bold;
    font-size: 20px;
}

.catalog_button {
    padding: 10px 20px;
    background: var(--slate);
    border-radius: 10px;
    color: white;
    font-weight: bold;
    text-decoration: unset;
    transition: 0.3s ease;
    margin-bottom: 2px;
    display: block;
    text-align: center;
}

.catalog_button:hover {
    opacity: 0.8;
}

@media (min-width:921px) {
    .dashboard_catalog {
        max-width: 80%;
        margin: 0 auto;
        width: 100%;
    }

    .top_row .catalog_button {
        margin-right: 30px;
    }
}</style>