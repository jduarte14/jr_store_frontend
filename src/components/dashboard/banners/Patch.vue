<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { fetchData } from '@/helpers/fetchHelper'
import { useRoute } from 'vue-router'
import { useBannerStore } from '@/stores/bannerStore'
import WarnPopup from '@/components/WarnPopUp.vue'
import Spinner from '../../Spinner.vue'

const successPopUp = ref(false)
const rejectedPopUp = ref(false)
const loading = ref(false)

const id = useRoute().params.id
const getBannerData = async () => {
  try {
    const bannerStore = useBannerStore()
    const response = await bannerStore.getSingleBanner(id)
    data.value = response.banner
    imageData.value.desktop_image = response.banner.desktop_image
    imageData.value.mobile_image = response.banner.mobile_image
    handleLoading(imageData.value, data.value)
  } catch (error) {
    console.error(error.message)
  }
}

const handleLoading = (imageData, bannerData) => {
  if (imageData && bannerData) {
    loading.value = false
  }
}

const handlePopUp = (action) => {
  if (action === 'success') {
    successPopUp.value = !successPopUp.value
  } else if (action === 'rejected') {
    rejectedPopUp.value = !rejectedPopUp.value
  }
}

const handleSuccessPopUp = () => {
  handlePopUp('success')
}

const handleRejectedPopUp = () => {
  handlePopUp('rejected')
}

const data = ref({
  name: '',
  type: '',
  title: '',
  subtitle: '',
  description: '',
  link: '',
  link_text: '',
  desktop_image: '',
  mobile_image: ''
})

const imageData = ref({
  image: {
    file: null,
    previewUrl: null
  },
  image2: {
    file: null,
    previewUrl: null
  },
  image3: {
    file: null,
    previewUrl: null
  },
  image4: {
    file: null,
    previewUrl: null
  },
  image5: {
    file: null,
    previewUrl: null
  }
})

const onImageChange = (event, key) => {
  const inputElement = event.currentTarget
  const file = inputElement.files?.[0]

  if (file) {
    const imageURL = URL.createObjectURL(file)
    imageData.value[key].file = file
    imageData.value[key].previewUrl = imageURL
  }
}

const removeImage = (key) => {
  imageData.value[key].file = null
  imageData.value[key].previewUrl = null
}

const createFormData = () => {
  const formData = new FormData()
  Object.entries(data.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })

  Object.entries(imageData).forEach(([key, value]) => {
    if (value.file) {
      formData.append(key, value.file)
    }
  })

  return formData
}

const patchBanner = async (e) => {
  try {
    e.preventDefault()
    const bannerData = createFormData()
    const response = await fetchData(
      `https://jrstore-production.up.railway.app/api/banners/${id}`,
      'PATCH',
      bannerData
    )
    if (response.status === 'success') {
      handleSuccessPopUp()
    } else {
      handleRejectedPopUp()
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

onMounted(() => {
  getBannerData()
})
</script>
<template>
  <main v-if="!loading">
    <section>
      <h1>Edit your banner</h1>
      <div class="product_container">
        <form @submit="patchBanner">
          <b>Banner Name</b>
          <input type="text" v-model="data.name" />
          <b>Banner title</b>
          <textarea v-model="data.title" cols="30" rows="10"></textarea>
          <b>Banner type:</b>
          <select name="" id="" v-model="data.type">
            <option value="principal_banner">Principal banner</option>
            <option value="category_banner">Category banner</option>
            <option value="middle_banner">Middle banner</option>
          </select>
          <b>Banner subtitle (optional)</b>
          <input type="text" v-model="data.subtitle" />
          <b>Banner description</b>
          <input type="text" v-model="data.description" />
          <b>Banner Link</b>
          <input type="number" v-model="data.link" />
          <b>Banner link text</b>
          <textarea v-model="data.link_text" cols="30" rows="10"></textarea>
          <div class="row">
            <b>Desktop Image</b>
            <input type="file" @change="onImageChange($event, 'desktop_image')" />
            <div class="preview_image">
              <div
                class="remove_icon"
                v-if="imageData.desktop_image"
                @click="removeImage('desktop_image')"
              >
                <Icon icon="zondicons:close-solid" color="red" />
              </div>
              <img :src="imageData.desktop_image" />
            </div>
          </div>
          <div class="row">
            <b>Mobile image</b>
            <input type="file" @change="onImageChange($event, 'mobile_image')" />
            <div class="preview_image">
              <div
                class="remove_icon"
                v-if="imageData.mobile_image"
                @click="removeImage('mobile_image')"
              >
                <Icon icon="zondicons:close-solid" color="red" />
              </div>
              <img :src="imageData.mobile_image" />
            </div>
          </div>
          <input type="submit" value="Create" class="btn_enviar" />
        </form>
      </div>
    </section>
    <section class="gallery_section">
      <div class="gallery_row" v-if="imageData.desktop_image || imageData.mobile_image">
        <div class="image_box">
          <img :src="imageData.desktop_image" v-if="imageData.desktop_image" />
        </div>
        <div class="image_box">
          <img :src="imageData.mobile_image" v-if="imageData.mobile_image" />
        </div>
      </div>
    </section>
    <WarnPopup
      v-if="successPopUp"
      icon="success"
      warnTitle="Banner modified successfully"
      warnMessage="You can see the changes at the site"
      buttonOneText="Accept"
      :firstFunction="handleSuccessPopUp"
    />
    <WarnPopup
      v-if="rejectedPopUp"
      icon="error"
      warnTitle="Error"
      warnMessage="There was an error while modifying the banner"
      buttonOneText="Accept"
      :firstFunction="handleRejectedPopUp"
    />
  </main>
  <main class="loading_content" v-else>
    <Spinner color="#fff" />
  </main>
</template>
<style scoped>
h1 {
  color: white;
}

.preview_image {
  position: relative;
}

.preview_image img {
  max-width: 65px;
  height: auto;
  width: 100%;
  border-radius: 10px;
  border: 2px solid var(--slate);
}

.preview_image .remove_icon {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: max-content;
  max-height: max-content;
  border-radius: 100px;
  font-size: 20px;
}

.preview_image .remove_icon svg {
  background: white;
  border-radius: 100px;
}

section {
  margin-bottom: 20px;
}

.product_container form {
  display: flex;
  flex-direction: column;
}

b {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}

.row {
  background: white;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.row b {
  color: var(--slate);
  padding-left: 20px;
}

.row input {
  box-shadow: unset;
}

input,
textarea,
select {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.btn_enviar {
  max-width: 60%;
  margin: 0 auto;
  padding: 12px 5%;
  border-radius: 10px;
  background: var(--slate);
  border: unset;
  color: white;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 20px;
}

input,
textarea {
  font-weight: bold;
  color: var(--slate);
  letter-spacing: 0.2px;
}

.btn_enviar:hover {
  opacity: 0.8;
}

.gallery_row {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  gap: 20px;
  padding-top: 20px;
}

.gallery_row::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}

.gallery_row::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.gallery_row::-webkit-scrollbar-thumb {
  background: #888;
}

.gallery_row::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.gallery_row img {
  max-width: 500px;
  height: auto;
  border-radius: 10px;
}

@media (min-width: 921px) {
  h1 {
    font-size: 2.8em;
  }

  section {
    max-width: 50%;
    width: 100%;
    margin: 0 auto;
  }

  .gallery_section {
    max-width: 80%;
    margin: 0 auto;
    width: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 920px) {
  section {
    margin-left: 10px;
    margin-right: 10px;
  }

  .row b {
    font-size: 14px;
  }

  .gallery_row img {
    max-width: 250px;
  }
}
</style>
