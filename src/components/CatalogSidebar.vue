<script setup>
import { Icon } from '@iconify/vue';
import { toRef } from 'vue';
 defineProps({
    toggleSidebar: {
        type: Function,
        required: true,
    },
    sidebar: {
        type: Boolean,
        required: true,
    },
    uniqueCategories: {
        type: Array,
        required: true,
    },
    filters: {
        type: Object,
    },
})

const localFilters = toRef(props, 'filters');

</script>


<template>
    <aside :class="sidebar ? 'active' : ''">
        <div class="ico" @click="toggleSidebar">
            <Icon icon="iconamoon:close" color="white" />
        </div>
     <div class="title_box">
        <b>
            Categories:
        </b>
     </div>
        <div class="filter_item" v-for="category in uniqueCategories" :key="category">
            <span>
                <input type="checkbox" :value="category" v-model="localFilters.categories">
                {{ category }}
            </span>
        </div>
    </aside>
    <div :class="sidebar ? 'active' : ''" @click="toggleSidebar" class="overlay" />
</template>

  
<style scoped>
@media (min-width:981px) {
    aside {
        display: none;
    }
}

@media (max-width:980px) {

    .ico {
        position: absolute;
        top: 10px;
        right: 5px;
        font-size: 35px;
        font-weight: bold;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        opacity: 0;
        transition: 0.3s ease;
        
    }

    .overlay.active {
        pointer-events: all;
        opacity: 1;
    }

    aside {
        z-index:2;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: max-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 2px solid white;
        padding: 10px;
        transform: translateX(-100%);
        transition: 0.3s ease-in-out;
        background: var(--black);
        color:white;
    }

    aside.active {
        transform: translateX(0);
    }

    a {
        color: white;
        font-weight: bold;
        padding: 10px 15px;
        text-decoration: none;
        letter-spacing: 1.2px;
        font-size: 1.2em;
    }

    a+a {
        border-top: unset;
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
    .title_box {
        margin-bottom:20px;
    }

    .title_box b {
        font-size:1.1em;
    }
    
}
</style>