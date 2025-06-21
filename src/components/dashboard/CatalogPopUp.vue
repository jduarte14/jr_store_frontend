<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref, computed } from 'vue'
const active = ref(false)
const search = ref('')
const showSelected = ref(false)
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const selectedItems = ref([])
const allSelected = ref(false)
const filteredItems = computed(() => {
  let items = props.data.items || []

  const text = search.value.toLowerCase()
  if (text) {
    items = items.filter(
      (item) => item.title?.toLowerCase().includes(text) || item.name?.toLowerCase().includes(text)
    )
  }

  if (showSelected.value) {
    items = items.filter((item) => selectedItems.value.includes(item))
  }

  return items
})
const handleSelectedItems = (item) => {
  if (selectedItems.value.includes(item)) {
    selectedItems.value = selectedItems.value.filter((i) => i !== item)
  } else {
    selectedItems.value.push(item)
  }
  detectAllSelected()
}
const detectAllSelected = () => {
  allSelected.value = selectedItems.value.length === props.data.items.length
}

const handleFullSelection = () => {
  if (!allSelected.value) {
    selectedItems.value = [...props.data.items]
  } else {
    selectedItems.value = []
  }
}

const showOnlySelectedItems = () => {
  showSelected.value = !showSelected.value
}

onMounted(() => {
  setTimeout(() => {
    active.value = true
  }, 100)
})
</script>
<template>
  <aside>
    <div class="warn_popup" :class="active && 'active'">
      <div class="top_bar">
        <div class="search_box">
          <b class="title">{{ data.title || 'Items' }}</b>
          <input class="search_bar" type="text" v-model="search" placeholder="Search..." />
        </div>
        <div class="counter_box" v-if="selectedItems.length > 0">
          <span>
            <b>Selected items ({{ selectedItems.length }} of {{ data.items.length }}) </b>
          </span>
        </div>
        <div class="checkboxes">
          <div class="checkbox" >
            <input class="checkbox" :class="selectedItems.length == 0 && 'no_pointer'" type="checkbox" :checked="showSelected" @click="showOnlySelectedItems" />
            <label for="">Show selected</label>
          </div>
          <div class="checkbox">
            <input v-model="allSelected" type="checkbox" @click="handleFullSelection" />
            <label for="">Select all</label>
          </div>
        </div>
      </div>
      <div class="item_container">
        <article
          class="item_box"
          :class="selectedItems.includes(item) && 'selected_item'"
          v-for="item in filteredItems"
          :key="item._id"
          @click="handleSelectedItems(item)"
        >
          <img :src="item.image || item.banner" :alt="item.banner" />
          <span>{{ item.title || item.name }}</span>
        </article>
      </div>
    </div>
  </aside>
  <div class="overlay" :class="active ? 'active' : ''" @click="$emit('close')" />
</template>
<style scoped>
label {
  font-size: 1em;
  color: var(--black);
}
.checkboxes {
  padding-right: 25px;
  padding-left: 10px;
}
.top_bar {
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.search_box {
  margin-right: auto;
}
.warn_popup {
  max-height: 90%;
  overflow-y: scroll;
}
.title {
  font-size: 2rem;
}
b {
  color: var(--slate);
}
.item_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}
.row_buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
.search_bar {
  padding: 5px 10px;
  border-radius: 5px;
  background: #e5e4e4;
  border: 1px solid #bbb8b8;
  width: 100%;
  min-height: 20px;
}
.item_box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  padding: 5px;
  border: 3px solid #bbb8b8;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}
.item_box:hover,
.selected_item {
  border: 3px solid var(--slate);
}

.item_box span {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  color: var(--black);
}

.no_pointer{
  opacity: 0.8;
  pointer-events: none;
}

.item_box img {
  max-width: 100px;
  height: auto;
  border-radius: 10px;
}
.success {
  filter: drop-shadow(10px 8px 10px #84cc16);
  background: white;
}

.error {
  filter: drop-shadow(10px 8px 10px #ff0000);
  background: #ff0000;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

button {
  background-color: var(--black);
  border-radius: 10px;
  padding: 8px 10px;
  color: white;
  font-weight: bold;
  border: none;
  font-size: 1em;
  transition: 0.3s ease;
  cursor: pointer;
  font-size: 1.2em;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  z-index: 2;
}

.warn_popup {
  background-color: #efefef;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  max-width: max-content;
  position: relative;
  height: max-content;
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 2;
}

.warn_popup,
.overlay {
  opacity: 0;
  transition: 0.5s ease;
}

.warn_popup.active,
.overlay.active {
  opacity: 1;
}

.overlay.active {
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.3);
}

@media (max-width: 920px) {
  .warn_popup b {
    max-width: 250px;
  }
}
</style>
