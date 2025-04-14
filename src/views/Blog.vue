<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import ArticleHome from './../components/blog/ArticleHome.vue'
import { useGsapScrollAnimation } from './../composables/useGsapScrollAnimation'

const articles = ref([
  {
    _id: '0',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_e54b82aff9bc4244a61c572440849437.jpg/v1/fill/w_599,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_e54b82aff9bc4244a61c572440849437.jpg'
  },
  {
    _id: '2',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_e54b82aff9bc4244a61c572440849437.jpg/v1/fill/w_599,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_e54b82aff9bc4244a61c572440849437.jpg'
  },
  {
    _id: '1',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_e54b82aff9bc4244a61c572440849437.jpg/v1/fill/w_599,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_e54b82aff9bc4244a61c572440849437.jpg'
  },
  {
    _id: '3',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_e54b82aff9bc4244a61c572440849437.jpg/v1/fill/w_599,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_e54b82aff9bc4244a61c572440849437.jpg'
  },
  {
    _id: '4',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_e54b82aff9bc4244a61c572440849437.jpg/v1/fill/w_599,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_e54b82aff9bc4244a61c572440849437.jpg'
  },
  {
    _id: '5',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_e54b82aff9bc4244a61c572440849437.jpg/v1/fill/w_599,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_e54b82aff9bc4244a61c572440849437.jpg'
  }
])
const pictures = ref([
  {
    _id: '0',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_8de486a864b344feab2546dd44ab9b24.jpg/v1/fill/w_563,h_839,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_8de486a864b344feab2546dd44ab9b24.jpg'
  },
  {
    _id: '2',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_8de486a864b344feab2546dd44ab9b24.jpg/v1/fill/w_563,h_839,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_8de486a864b344feab2546dd44ab9b24.jpg'
  },
  {
    _id: '1',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_8de486a864b344feab2546dd44ab9b24.jpg/v1/fill/w_563,h_839,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_8de486a864b344feab2546dd44ab9b24.jpg'
  },
  {
    _id: '3',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_8de486a864b344feab2546dd44ab9b24.jpg/v1/fill/w_563,h_839,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_8de486a864b344feab2546dd44ab9b24.jpg'
  },
  {
    _id: '4',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_8de486a864b344feab2546dd44ab9b24.jpg/v1/fill/w_563,h_839,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_8de486a864b344feab2546dd44ab9b24.jpg'
  },
  {
    _id: '5',
    title: 'Test',
    category: 'Painting',
    description: 'tuki',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat ea assumenda vero eius? Quo.',
    banner:
      'https://static.wixstatic.com/media/22718f_8de486a864b344feab2546dd44ab9b24.jpg/v1/fill/w_563,h_839,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/22718f_8de486a864b344feab2546dd44ab9b24.jpg'
  }
])

onMounted(() => {
  useGsapScrollAnimation('.title', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.2
  })
})
</script>

<template>
  <main>
    <section class="main_section">
      <div class="title_row">
        <div>
          <h2 class="title">Capturing the Unseen</h2>
          <h2 class="title slate_title">Remembering Through Creation.</h2>
          <ArticleHome :articles="articles" :pictures="pictures" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main_section {
  padding-inline: 4rem;
  margin: 0 auto;
  padding-top: 5rem;
}

h2 {
  font-size: 3.8rem;
  color: white;
  letter-spacing: 1.5px;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
}

h4 {
  font-size: 1.5rem;
  color: white;
  letter-spacing: 1.5px;
}

.title_row {
  display: flex;
  justify-content: space-between;
}

.slate_title {
  color: var(--slate);
  text-shadow: -1px -1px 0 #e0e0e0, 1px -1px 0 #e0e0e0, -1px 1px 0 #e0e0e0, 1px 1px 0 #e0e0e0,
    0px -1px 0 #e0e0e0, 0px 1px 0 #e0e0e0, -1px 0px 0 #e0e0e0, 1px 0px 0 #e0e0e0;
}
</style>