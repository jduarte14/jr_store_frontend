<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { Product } from './../types/types';
import Spinner from './../components/Spinner.vue';
import { Icon } from '@iconify/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

const productData = ref<Product>({});
const loading = ref<boolean>(true);
const characteristicAccordeon = ref<boolean>(true);

const id = useRoute().params.id;
const getProductData = async () => {
    try {
        const productStore = useProductStore();
        let productResponse = await productStore.getSingleProduct(id);
        productData.value = productResponse.product;
        loading.value = false;
    }
    catch (error) {
        console.error(error.message);
    }
}
onMounted(() => {
    getProductData();

});

const toggleCharacteristicAccordion = () => {
    characteristicAccordeon.value = !characteristicAccordeon.value;
};



const swiperBreakPoints = {
    320: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 1,
    },
    1024: {
        slidesPerView: 1,
    }
}

</script>
<template>
    <section class="product_section" v-if="!loading">
        <div class="product_gallery">
            <swiper v-if="productData.image2" :slides-per-view="5" :breakpoints="swiperBreakPoints" :space-between="30"
                :pagination="{ clickable: true }" :navigation="{ draggable: true }">
                <swiper-slide v-if="productData.image">
                    <img :src="productData.image" />
                </swiper-slide>
                <swiper-slide v-if="productData.image2">
                    <img :src="productData.image2" />
                </swiper-slide>
                <swiper-slide v-if="productData.image3">
                    <img :src="productData.image3" />
                </swiper-slide>
                <swiper-slide v-if="productData.image4">
                    <img :src="productData.image4" />
                </swiper-slide>
                <swiper-slide v-if="productData.image5">
                    <img :src="productData.image5" />
                </swiper-slide>

            </swiper>
            <div v-else class="product_gallery">
                <img :src="productData.image">
            </div>
        </div>

        <div class="product_card" :key="productData_id">
            <div class="row">
                <div class="category_box">
                    <p>{{ productData.category }}</p>
                </div>
                <Icon icon="ooui:next-ltr" />
                <div class="category_box">
                    <p>{{ productData.subcategory }}</p>
                </div>
            </div>
            <h1>{{ productData.name }}</h1>
            <p class="price" v-if="productData.price">Є{{ productData.price }}</p>
            <p>{{ productData.description }} </p>

            <div v-if="productData.characteristic" class="charac_box">
                <div class="title_box" @click="toggleCharacteristicAccordion">
                    <p>Characteristic:</p>
                    <p class="ico" v-if="!characteristicAccordeon"> + </p>
                    <p class="ico" v-else> - </p>
                </div>
                <transition name="characteristic">
                    <div v-show="characteristicAccordeon" class="characteristic">
                        <p>{{ productData.characteristic }}</p>
                    </div>
                </transition>
            </div>
            <button class="buy_button">
                <Icon icon="majesticons:basket-2-line" />
                Buy
            </button>
        </div>

    </section>
    <section class="loading_section" v-else>
        <Spinner color="#fff" />
    </section>
</template>
<style scoped>
@media (min-width:921px) {
    h1 {
        font-size: 2.4em;
        margin-bottom: 10px;
        margin-top: 15px;
    }

    .price {
        font-weight: bold;
        font-size: 25px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .product_card {
        max-width: 50%;
        width: 100%;
    }

    .loading_section {
        display: grid;
        place-content: center;
        height: 100%;
        width: 100%;
        color: white;
    }

    .product_section {
        display: flex;
        justify-content: flex-start;
        margin-top: 3%;
    }

    .product_gallery {
        max-width: 500px;
        margin-right: 30px;

    }

    .product_gallery img {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        width: 100%;
        max-width: 600px;
        height: auto;
        border-radius: 10px;
    }

    .product_section {
        border-radius: 10px;
    }

    section {
        max-width: 60%;
        width: 100%;
        margin: 0 auto;
    }

    .ico {
        font-size: 20px;
    }
}

@media (max-width:920px) {
    .product_gallery {
        padding: calc(1.5 * 2vw);
    }
    .price {
        font-weight: bold;
        font-size: 1.2em;
    }

    .product_gallery img {
        width: 100%;
        max-width: max-content;
        height: auto;
        border-radius:10px;
    }

    .loading_section {
        height: 100%;
        width: 100%;
        display: grid;
        place-content: center;
        height: 70vh;
    }
}


.buy_button {
    background: var(--black);
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 25px;
    width: 100%;
    text-align: center;
    color: white;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
}

.row {
    display: flex;
    align-items: center;
}

.row svg {
    font-size: 16px;
    font-weight: bold;
}

.row .category_box {
    background: #f7f7f7;
    padding: 5px 10px;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    color: #334155;
    margin: 0 5px;
}

.buy_button svg {
    margin-right: 5px;
}


.buy_button:hover {
    opacity: 0.8;
}

.title_box {
    display: flex;
    width: 100%;
}

.ico {
    margin-left: auto;
    font-weight: bold;
    cursor: pointer;
}

.product_section {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background: white;
    color: black;
    padding: 3%;
}

h1 {
    font-weight: bold;
}

p {
    color: black;
}

.charac_box {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 2px 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    cursor: pointer;
}

.charac_box p {
    margin-top: 15px;
    margin-bottom: 15px;
}

b {
    color: white;
}

section {
    padding-top: 10%;
}

.characteristic {
    overflow: hidden;
    transition: transform 0.3s ease-out;
    transform-origin: top;
    transform: scaleY(1);
}

.characteristic-enter-active,
.characteristic-leave-active {
    transition: transform 0.3s ease-out;
    transform: scaleY(0);
}
</style>