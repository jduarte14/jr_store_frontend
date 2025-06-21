<script setup>
import { ref, onBeforeMount } from 'vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useGroupStore } from '../../../stores/groupStore'
import Spinner from '../../Spinner.vue'
import CatalogPopUp from "@/components/dashboard/CatalogPopUp.vue";

const groupStore = useGroupStore()
const groupListData = ref(null)
const filteredList = ref([])
const popup = ref({
  edit: false,
  delete: false,
  category: null,
  key : null,
})

const getGroups = async () => {
  try {
    const data = await groupStore.getGroups()
    groupListData.value = data
    filterGroupList()
  } catch (error) {
    console.error(error)
  }
}

const filterGroupList = (key) => {
  if (key) {
    filteredList.value = groupListData.value[key]
  } else {
    Object.keys(groupListData.value).forEach((key) => {
      groupListData.value[key].forEach((item) => {
        if (filteredList.value.includes(item)) return
        filteredList.value.push(item)
      })
    })
  }

  return filteredList.value
}

const groupItems = ref([
  { name: 'All', icon: 'mdi:format-list-bulleted', click: () => filterGroupList() },
  { name: 'Paintings', icon: 'mdi:palette', click: () => filterGroupList('paintings') },
  { name: 'Pictures', icon: 'mdi:camera', click: () => filterGroupList('pictures') },
  { name: 'Products', icon: 'mdi:cart', click: () => filterGroupList('products') }
])

const openCatalog = (category, key) => {
  popup.value.edit = true
  popup.value.category = category;
  popup.value.key = key;
}

onBeforeMount(() => {
  getGroups()
})
</script>
<template>
  <main>
    <section>
      <h1>Select a type of group you want to create</h1>
      <p>
        Groups are a way to organize products or articles — in this case, paintings and photographs.
        <br />
        You can only group them by category: you can create one group for paintings, another for
        photographs, and another for products.
        <br />
        The idea behind this is to be able to select a group from one of these three categories and
        display it on the homepage of the website.
      </p>
      <div class="list_container">
        <div class="group_list">
          <b v-for="item in groupItems" :key="item.name" class="group_item" @click="item.click">
            <Icon :icon="item.icon" width="35" height="35" />
            <span>{{ item.name }}</span>
          </b>
        </div>
        <div class="body_list">
          <div v-if="!groupListData" class="spinner-container">
            <Spinner />
          </div>
          <div v-else>
            <ul>
              <li class="list_item" v-for="(group, key) in filteredList" :key="key">
                <span>
                  {{ group.name }}
                </span>
                <div class="actions">
                  <div>
                    <Icon icon="ic:sharp-edit" width="24" height="24" @click="openCatalog(group.category, key)"/>
                  </div>
                  <div>
                    <Icon icon="material-symbols:delete" width="24" height="24" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CatalogPopUp v-if="popup.edit" :data="groupListData[popup.category][0]" @close="popup.edit = false"/>
    </section>
  </main>
</template>

<style scoped>
.actions {
  margin-left: auto;
  gap: 10px;
  display: flex;
}
.actions div {
  cursor: pointer;
  transition: all 0.3s ease;
}
.actions div:hover {
  opacity: 0.8;
}
p {
  line-height: 1.5;
}
.list_container {
  display: flex;
  flex-direction: column;
  background: var(--blackGray);
  margin-top: 2rem;
}
.group_list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  border: solid 3px var(--slate);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.body_list {
  background: var(--blackGray);
  border: 3px solid var(--slate);
  border-top: unset;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.list_item {
  border-bottom: 1px solid var(--slate);
  min-height: 35px;
  display: flex;
  align-items: center;
}
.group_item {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  transition: 0.3s ease;
  cursor: pointer;
  padding: 8px 10px;
}
.group_item:hover {
  opacity: 0.8;
}
ul {
  padding: 0;
  margin: 0;
}
b {
  border-bottom: 1px solid var(--slate);
}
button {
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
  text-decoration: unset;
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-radius: 10px;
  gap: 10px;
}
a:hover {
  opacity: 0.7;
}
li {
  list-style: none;
  padding: 10px;
}
@media (min-width: 921px) {
  h1 {
    font-size: 2.8em;
    font-weight: bold;
  }

  section {
    max-width: 65%;
    width: 100%;
    margin: 0 auto;
    color: white;
  }
}
</style>