<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { uploadImage, patchArticle, getArticleById } from '@/controllers/Blog.js'
import { Icon } from '@iconify/vue'

const editor = ref(null)
const toolbar = ref(null)
const formInfo = ref({
  title: '',
  description: '',
  category: '',
  content: null,
  banner: null
})
const id = useRoute().params.id
const setupArticleInfo = async () => {
  const data = await getArticleById(id)
  if (!data) return

  const { title, description, category, content, banner } = data.article
  formInfo.value = {
    title: title,
    description: description,
    category: category,
    content: content,
    banner: banner
  }

  console.log(formInfo.value.content);
  
  initEditor(content)
}

const initEditor = (content) => {
  console.log(content, "content");
  editor.value = new Editor({
    content: content ? content : '',
    extensions: [StarterKit, Image]
  })
  const toolbarOptions = [
    {
      text: 'Paragraph',
      action: (chain) => chain.setParagraph()
    },
    {
      text: 'Bold',
      action: (chain) => chain.toggleBold()
    },
    {
      text: 'Italic',
      action: (chain) => chain.toggleItalic()
    },
    {
      text: 'Heading 1',
      action: (chain) => chain.toggleHeading({ level: 1 })
    },
    {
      text: 'Heading 2',
      action: (chain) => chain.toggleHeading({ level: 2 })
    }
  ]
  toolbar.value = toolbarOptions
}

const handleClick = (action) => {
  if (editor.value) action(editor.value.chain().focus()).run()
}

const handleSubmit = async () => {
  formInfo.value.content = editor.value.getHTML()

  const response = await patchArticle(formInfo.value, id);

  console.log(response);
}

const setImage = async (event) => {
  const file = event.target.files[0]
  if (!file || !editor.value) return
  const imageUrl = await uploadImage(file)
  if (imageUrl) {
    editor.value.chain().focus().setImage({ src: imageUrl.url }).run()
  }
}

const setBannerImage = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const imageUrl = await uploadImage(file)
  if (imageUrl) {
    formInfo.value.banner = imageUrl.url
  }
}

const isFrontBannerLoaded = computed(() => {
  return formInfo.value.banner
})

onBeforeMount(() => {
  setupArticleInfo()
})
</script>
<template>
  <main>
    <section>
      <h1>Create blog article</h1>
      <form @submit.prevent="handleSubmit($event)">
        <input type="text" placeholder="Article name" v-model="formInfo.title" />
        <input type="text" placeholder="Add a short description" v-model="formInfo.description" />

        <label for="banner">Front page image</label>
        <div class="banner_row">
          <div v-if="isFrontBannerLoaded" style="position: relative">
            <img :src="formInfo.banner" class="front_banner_preview" alt="front_banner_preview" />
            <button class="remove_image" @click="formInfo.banner = null">
              <Icon icon="material-symbols:delete-rounded" width="24" height="24" />
            </button>
          </div>
          <input v-else type="file" accept="image/*" class="file_image" @change="setBannerImage" />
        </div>
        <label for="categories">Article categories: </label>
        <select name="category" v-model="formInfo.category">
          <option value="" disabled>Select a category</option>
          <option value="painting">Painting</option>
          <option value="pictures">Pictures</option>
        </select>
        <label for="content"> Article content </label>
        <div class="toolbar" v-if="toolbar">
          <button
            v-for="(option, index) in toolbar"
            :key="'option_' + index"
            class="toolbar_btn"
            @click="handleClick(option.action)"
          >
            {{ option.text }}
          </button>
          <label class="toolbar_btn upload-btn">
            📷 Add image
            <input type="file" accept="image/*" @change="setImage" hidden />
          </label>
        </div>
        <div class="editor-box" v-if="editor">
          <EditorContent :editor="editor" />
        </div>
        <input class="submit_btn" type="submit" value="Edit article" />
      </form>
    </section>
  </main>
</template>

<style scoped>
section {
  width: 100%;
  margin: 0 auto;
}
h1 {
  font-weight: bold;
  font-size: 3.5rem;
  color: white;
}
label {
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.upload-btn {
  font-size: 0.8rem;
}
input,
textarea {
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 100%;
}
input {
  min-height: 22px;
  font-weight: bold;
  color: var(--slate);
}
select {
  width: 20rem;
  padding: 10px;
  border: 2px solid var(--slate);
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.editor-box {
  min-height: 300px;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  background: white;
  width: 100%;
  margin-top: 1rem;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.toolbar_btn {
  background: #1f2937;
  padding: 8px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  color: white;
  border: unset;
  font-weight: bold;
  letter-spacing: 0.2px;
  transition: 0.3s ease;
  cursor: pointer;
}
.toolbar_btn:hover {
  opacity: 0.8;
}
.file_image {
  background: white;
  font-weight: bold;
}
.file_image::file-selector-button {
  background: var(--slate);
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
  border: unset;
  transition: 0.3s ease;
  cursor: pointer;
}

.file_image::file-selector-button:hover {
  background: var(--slate);
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
  opacity: 0.8;
}
.front_banner_preview {
  border-radius: 10px;
  border: 2px solid white;
  max-width: 500px;
  width: 100%;
  height: auto;
}
.remove_image {
  top: 5px;
  right: 0;
  background: unset;
  border: unset;
  position: absolute;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease;
  display: grid;
  place-content: center;
  max-width: max-content;
}
.remove_image:hover {
  background: var(--slate);
  border-radius: 100%;
}
.submit_btn {
  background: #1f2937;
  padding: 8px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  color: white;
  border: unset;
  font-weight: bold;
  letter-spacing: 0.2px;
  transition: 0.3s ease;
  cursor: pointer;
  max-width: max-content;
  padding-inline: 20rem;
  min-height: 40px;
  margin-top: 20px;
  margin: 25px auto;
  transition: 0.3s ease;
}
.submit_btn:hover {
  opacity: 0.8;
}
@media (min-width: 921px) {
  section {
    max-width: 70%;
    width: 100%;
    margin: 0 auto;
  }
}
</style>

<style>
.editor-box .ProseMirror {
  min-height: 300px;
  cursor: auto;
}
</style>