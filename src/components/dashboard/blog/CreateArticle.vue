<script setup>
import { ref, onMounted } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = ref(null)
const toolbar = ref(null)

const initEditor = () => {
  editor.value = new Editor({
    content: ``,
    extensions: [StarterKit]
  })
  const toolbarOptions = [
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

const handleSubmit = () => {
  console.log(editor.value.getHTML(), '_HTML_')
}

const uploadImage = (event) => {
  const file = event.target.files[0]
  if (!file || !editor.value) return

  const reader = new FileReader()
  reader.onload = () => {
    editor.value.chain().focus().setImage({ src: reader.result }).run()
  }
  reader.readAsDataURL(file)
}

onMounted(() => {
  initEditor()
})
</script>
<template>
  <main>
    <section>
      <h1>Create blog article</h1>
      <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Article name" />
        <label for="categories">Article categories: </label>
        <select name="category" id="">
          <option value="painting">Painting</option>
          <option value="pictures">Option</option>
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
            📷 Imagen
            <input type="file" accept="image/*" @change="uploadImage" hidden />
          </label>
        </div>
        <div class="editor-box" v-if="editor">
          <EditorContent :editor="editor" />
        </div>
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
@media (min-width: 921px) {
  section {
    max-width: 70%;
    width: 100%;
    margin: 0 auto;
  }
}
</style>