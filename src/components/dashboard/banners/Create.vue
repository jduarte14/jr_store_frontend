<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { fetchData } from '@/helpers/fetchHelper'
import WarnPopup from '@/components/WarnPopUp.vue'

const successPopUp = ref(false)
const rejectedPopUp = ref(false)
const handlePopUp = (action: string) => {
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
  description: '',
  title: '',
  subtitle: '',
  link: '',
  link_text: '',
  type: ''
})

const imageData = ref({
  desktop_image: {
    file: null,
    previewUrl: null
  },
  mobile_image: {
    file: null,
    previewUrl: null
  }
})

const onImageChange = (event: Event, key: string): void => {
  const inputElement = event.currentTarget as HTMLInputElement
  const file = inputElement.files?.[0]

  if (file) {
    const imageURL = URL.createObjectURL(file)
    imageData.value[key].file = file
    imageData.value[key].previewUrl = imageURL
  }
}

const removeImage = (key: string): void => {
  imageData.value[key].file = null
  imageData.value[key].previewUrl = null
}

const createFormData = () => {
  const formData = new FormData()
  Object.entries(data.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value)
      console.log(key, value)
    }
  })

  Object.entries(imageData.value).forEach(([key, value]) => {
    if (value.file) {
      formData.append(key, value.file)
    }
  })
  console.log(formData, 'este es el formdata')
  return formData
}

const postBanner = async (e: Event) => {
  try {
    e.preventDefault()
    const bannerData = createFormData()
    const response = await fetchData(
      `https://jr-store-self.vercel.app/api/banners`,
      'POST',
      bannerData
    )
    if (response.status == 'success') {
      handleSuccessPopUp()
    } else {
      handleRejectedPopUp()
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
</script>
<template>
  <section>
    <h1>Create your banner</h1>
    <div class="product_container">
      <form @submit="postBanner">
        <b>Banner Name</b>
        <input type="text" v-model="data.name" required />
        <b>Banner title</b>
        <textarea v-model="data.title" cols="30" rows="10" required></textarea>
        <b>Banner type:</b>
        <select name="" id="" v-model="data.type" required>
          <option disabled value="">Select option</option>
          <option value="principal_banner">Principal banner</option>
          <option value="category_banner">Category banner</option>
          <option value="middle_banner">Middle banner</option>
        </select>
        <b>Banner subtitle (optional)</b>
        <input type="text" v-model="data.subtitle" required />
        <b>Banner description</b>
        <input type="text" v-model="data.description" required />
        <b>Banner Link</b>
        <input type="text" v-model="data.link" required />
        <b>Banner link text</b>
        <textarea v-model="data.link_text" cols="30" rows="10"></textarea>
        <div class="row">
          <b>Desktop Image</b>
          <input type="file" @change="onImageChange($event, 'desktop_image')" required />
          <div class="preview_image">
            <div
              class="remove_icon"
              v-if="imageData.desktop_image.previewUrl"
              @click="removeImage('desktop_image')"
            >
              <Icon icon="zondicons:close-solid" color="red" />
            </div>
            <img
              :src="imageData.desktop_image.previewUrl"
              v-if="imageData.desktop_image.previewUrl"
            />
          </div>
        </div>
        <div class="row">
          <b>Mobile image</b>
          <input type="file" @change="onImageChange($event, 'mobile_image')" />
          <div class="preview_image">
            <div
              class="remove_icon"
              v-if="imageData.mobile_image.previewUrl"
              @click="removeImage('mobile_image')"
            >
              <Icon icon="zondicons:close-solid" color="red" />
            </div>
            <img
              :src="imageData.mobile_image.previewUrl"
              v-if="imageData.mobile_image.previewUrl"
            />
          </div>
        </div>
        <input type="submit" value="Create" class="btn_enviar" />
      </form>
    </div>
  </section>
  <section class="gallery_section">
    <div
      class="gallery_row"
      v-if="imageData.desktop_image.previewUrl || imageData.mobile_image.previewUrl"
    >
      <div class="image_box">
        <img :src="imageData.desktop_image.previewUrl" v-if="imageData.desktop_image.previewUrl" />
      </div>
      <div class="image_box">
        <img :src="imageData.mobile_image.previewUrl" v-if="imageData.mobile_image.previewUrl" />
      </div>
    </div>
  </section>
  <WarnPopup
    v-if="successPopUp"
    icon="success"
    warnTitle="Banner succesfully created"
    warnMessage="The banner has been added to the home"
    buttonOneText="Accept"
    :firstFunction="handleSuccessPopUp"
  />
  <WarnPopup
    v-if="rejectedPopUp"
    icon="error"
    warnTitle="Error"
    warnMessage="There was an error while creating the banner"
    buttonOneText="Accept"
    :firstFunction="handleRejectedPopUp"
  />
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

select {
  padding: 10px;
  border-radius: 10px;
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
