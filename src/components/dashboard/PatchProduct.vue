<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import { fetchData } from '../../helpers/fetchHelper'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import WarnPopup from '@/components/WarnPopUp.vue'
import Spinner from '../Spinner.vue'

const successPopUp = ref(false)
const rejectedPopUp = ref(false)
const loading = ref(false)

const id = useRoute().params.id

const data = ref({
  name: '',
  description: '',
  category: '',
  subcategory: '',
  price: '',
  characteristic: ''
})

const imageData = ref({
  image: {
    previewUrl: null,
    file: null
  },
  image2: {
    previewUrl: null,
    file: null
  },
  image3: {
    previewUrl: null,
    file: null
  },
  image4: {
    previewUrl: null,
    file: null
  },
  image5: {
    previewUrl: null,
    file: null
  }
})

const getProductData = async () => {
  try {
    const productStore = useProductStore()
    let productResponse = await productStore.getSingleProduct(id)
    data.value = productResponse.product
    let images = ['image', 'image2', 'image3', 'image4', 'image5']
    images.forEach((image) => {
      imageData.value[image].previewUrl = data.value.image
      imageData.value[image].file = null
    })
    handleLoading(imageData.value, data.value)
    await nextTick()
  } catch (error) {
    console.error(error.message)
  }
}

const handleLoading = (imageData, productData) => {
  if (imageData && productData) {
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

const onImageChange = (event, image) => {
  console.log(image)
  const inputElement = event.currentTarget
  const file = inputElement.files?.[0]

  if (file) {
    const imageURL = URL.createObjectURL(file)
    let imageOnMemory = {
      previewUrl: imageURL,
      file: file
    }
    imageData.value[image] = imageOnMemory
  }
}

const removeImage = (key) => {
  delete imageData.value[key];
}

const createFormData = () => {
  const formData = new FormData()
  let info = data.value
  Object.keys(info).forEach((key) => {
    if (key.startsWith('image')) {
      if (imageData.value[key]) {
        if (imageData.value[key].file) {
          formData.append(key, imageData.value[key].file)
        } else {
          formData.append(key, imageData.value[key].url)
        }
      }
    } else {
      formData.append(key, info[key])
    }
  })

  return formData
}

const patchProduct = async (e) => {
  try {
    e.preventDefault()
    const productData = createFormData()
    const response = await fetchData(
      `https://jr-store-self.vercel.app/api/products/${id}`,
      'PATCH',
      productData
    )
    if (response.status === 'success') {
      handleSuccessPopUp()
    } else {
      handleRejectedPopUp()
    }
  } catch {
    throw new Error(error)
  }
}

onMounted(() => {
  getProductData()
})
</script>
<template>
  <main v-if="!loading">
    <section>
      <h1>Edit your product</h1>
      <div class="product_container">
        <form @submit="patchProduct">
          <b>Product Name</b>
          <input type="text" v-model="data.name" required />
          <b>Product description</b>
          <textarea v-model="data.description" cols="30" rows="10" required></textarea>
          <b>Category</b>
          <input type="text" v-model="data.category" required />
          <b>Subcategory</b>
          <input type="text" v-model="data.subcategory" required />
          <b>Price</b>
          <input type="number" v-model="data.price" required />
          <b>Characteristics</b>
          <textarea v-model="data.characteristic" cols="30" rows="10"></textarea>
          <div class="row" v-for="(image, index) in imageData" :key="index">
            <b>{{ index }}</b>
            <input type="file" @change="onImageChange($event, index)" />
            <div class="preview_image">
              <div class="remove_icon" v-if="image" @click="removeImage(index)">
                <Icon icon="zondicons:close-solid" color="red" />
              </div>
              <img :src="image.previewUrl" v-if="image" />
            </div>
          </div>
          <input type="submit" value="Edit" class="btn_enviar" />
        </form>
      </div>
    </section>
    <WarnPopup
      v-if="successPopUp"
      icon="success"
      warnTitle="Product succesfully updated"
      warnMessage="The product has been modified"
      buttonOneText="Accept"
      :firstFunction="handleSuccessPopUp"
    />
    <WarnPopup
      v-if="rejectedPopUp"
      icon="error"
      warnTitle="Error"
      warnMessage="There was an error while modifying the product"
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
  padding-top: 7px;
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
textarea {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
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