<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useProductStore } from './../stores/productStore';
import { RouterLink } from 'vue-router';
import Spinner from './../components/Spinner.vue';
import { Icon } from '@iconify/vue';
import CatalogSidebar from './../components/CatalogSideBar.vue';

const productStore = useProductStore();
const productRef = ref([]);
const categoryAccordeon = ref(true);
const filters = ref({ categories: [], })
const sidebar = ref(false);


const getData = async () => {
    try {
        const data = await productStore.getProducts();
        productRef.value = data.products;
    } catch (error) {
        console.error(error);
    }
}

const toggleSidebar = () => {
    sidebar.value = !sidebar.value;
}

const toggleCategoryAccordeon = () => {
    categoryAccordeon.value = !categoryAccordeon.value;
};

const uniqueCategories = computed(() => {
    const categories = productRef.value.map(product => product.category);
    return Array.from(new Set(categories));
});

const filteredProducts = computed(() => {
    let filtered = productRef.value;
    if (filters.value.categories.length > 0) {
        filtered = filtered.filter(product => filters.value.categories.includes(product.category));
    }
    return filtered;
});


onMounted(() => {
    getData();
})
</script>
<template>
    <section class="catalog" v-if="productRef.length">
        <aside class="desktop_filters">
            <h2>Filters</h2>
            <div class="category_accordeon">
                <div class="accordeon_row" @click="toggleCategoryAccordeon">
                    <b>Categories</b>
                    <p class="ico" v-if="!categoryAccordeon"> + </p>
                    <p class="ico" v-else> - </p>
                </div>

                <div class="filter_container" v-show="categoryAccordeon">
                    <div class="filter_item" v-for="category in uniqueCategories">
                        <span>
                            <input type="checkbox" :value="category" v-model="filters.categories">
                            {{ category }}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
        
        <div class="catalog_box">
            <div class="row_title">
                <h1 class="catalog_title">Products </h1>
                <button class="filter_button" @click="toggleSidebar">
                    <Icon icon="lucide:filter" /> Filters
                </button>
            </div>
            <div class="catalog_items">
                <RouterLink :to="`/product/${product._id}`" :key="product._id" v-for="product in filteredProducts">
                    <div class="catalog_item">
                        <img :src="product.image" alt="">
                        <h2>{{ product.name }}</h2>
                        <b v-if="product.price">Є{{ product.price }}</b>
                    </div>
                </RouterLink>
            </div>
        </div>
        <template v-if="sidebar">
            <CatalogSidebar :sidebar="sidebar" :toggleSidebar="toggleSidebar" :filters="filters" :uniqueCategories="uniqueCategories" />
        </template>
       
    </section>
    <section class="loading_section" v-else>
        <Spinner color="#fff" />
    </section>
</template>
<style scoped>
@media (min-width:921px) {
    .filter_button {
        display:none;
    }
    .catalog_title {
        display: none;
    }

    .filter_item {
        margin-right: auto;
        padding: 0 11px;
        position: relative;
    }

    .filter_item input::before {
        content: '';
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: pointer;
    }

    .catalog_box {
        max-width: 70%;
        margin: 0 auto;
    }

    .filter_item span {
        background: #1f2937;
        padding: 5px 12px;
        border-radius: 10px;
        margin-bottom: 10px;
        transition: 0.3s ease;
        display: flex;
        align-items: center;
    }

    .filter_item span:hover {
        background: #64748b;
    }

    .catalog {
        margin: 0 auto;
        width: 100%;
        display: flex;
        align-items: flex-start;
    }

    aside h2,
    .category_accordeon b {
        padding-left: 10px;
    }

    .category_accordeon {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        max-width: max-content;
        text-wrap: wrap;
    }

    .accordeon_row {
        display: flex;
        align-items: center;
        width: 100%;
    }

    .catalog_items a {
        margin-bottom: 3%;
    }

    .filter_container {
        width: 100%;
        max-width: max-content;
        margin-right: auto;
    }

}

.desktop_filters {
    width: 100%;
    max-width: 250px;
    position: sticky;
    top: 20vh;
    bottom: 0;
}

.category_accordeon {
    display: flex;
    align-items: center;
    color: white;
    font-weight: bold;
    border-top: 3px solid white;
    border-bottom: 3px solid white;
    padding: 8px 0;
    width: 100%;
    min-width: 15vw;
    border-right: 3px solid white;
    margin-top: 25px;
}

.ico {
    margin-left: auto;
    padding-right: 10px;
}

a {
    text-decoration: none;
    color: var(--black);
}

.catalog_box {
    display: flex;
    flex-wrap: wrap;
}

.catalog_item {
    background: white;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    height: 100%;
}


.catalog_item img {
    max-width: 200px;
    height: auto;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.catalog_items {
    display: flex;
    flex-wrap: wrap;
}

h1 {
    color: white;
    font-weight: bold;
    border-bottom: 2px solid white;
    text-align: center;
    max-width: max-content;
    margin: 0 auto;
    margin-bottom: 20px;
}

h2 {
    margin-bottom: 5px;
    margin-top: 5px;
}

.desktop_filters h2 {
    color: white;
}

.loading_section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    height: 100%;
}

.category_accordeon {
    color: white;
    font-weight: bold;
    border-top: 3px solid white;
    border-bottom: 3px solid white;
    padding: 15px 0;
    width: 100%;
}

.filter_box {
    color: white;
}

@media (max-width:920px) {
    section {
        position:relative;
    }
    .desktop_filters {
        display: none;
    }

    .catalog_items a {
        margin-bottom: 30px;
    }

    .catalog_items {
        justify-content: center;
    }

    .filter_button {
        padding: 10px 20px;
        background: #1f2937;
        color: white;
        transition: 0.3s ease;
        border-radius: 10px;
        border: unset;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        font-weight: bold;
        font-size: 1em;
    }

    .filter_button:hover {
        opacity: 0.8;
    }

    .row_title {
        display: flex;
        flex-basis:100%;
        gap: 10px;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .row_title h1 {
        margin-bottom: 2px;
        border-bottom: unset;
        font-size: 1em;
    }
    .catalog_box {
        flex-direction: column;
    }
}</style>