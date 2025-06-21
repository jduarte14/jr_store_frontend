<script setup>
import { ref } from 'vue'
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
const filters = ref(['Paintings', 'Pictures'])
</script>
<template>
  <section>
    <h2>Articles</h2>
       <div class="container">
           <aside class="filters">
        <ul>
          <li v-for="(filter, index) in filters" :key="index">
            <input type="checkbox" :label="filter" />
            <label :for="filter"> {{ filter }} </label>
          </li>
        </ul>
      </aside>
    <div class="articles_wrapper">
      <article v-for="article in articles" :key="article._id">
        <img :src="article.banner" :alt="test + '_image'" />
        <div class="article_info">
          <h4>{{ article.title }}</h4>
          <p>{{ article.content }}</p>
        </div>
      </article>
    </div>
       </div>
  </section>
</template>
<style scoped>
h2 {
  font-size: 4.2rem;
  color: var(--slate);
  text-shadow: -1px -1px 0 #e0e0e0, 1px -1px 0 #e0e0e0, -1px 1px 0 #e0e0e0, 1px 1px 0 #e0e0e0,
    0px -1px 0 #e0e0e0, 0px 1px 0 #e0e0e0, -1px 0px 0 #e0e0e0, 1px 0px 0 #e0e0e0;
  letter-spacing: 1.5px;
}
section {
  padding-inline: 3rem;
}
article {
  max-width: 450px;
  color: white;
  border: 4px solid oklch(27.9% 0.041 260.031);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: 0.4s ease;
  cursor: pointer;
  padding: 10px;
}
article:hover {
  border-color: var(--gray);
}
article img {
  max-width: 450px;
  border-radius: 5px;
}
.articles_wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
label {
  color: white;
  letter-spacing: 1.2px;
  font-weight: bold;
  font-size: 1.5rem;
}
.filters ul {
  background: #040f1e;
  border-radius: 15px;
  padding: 10px 15px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-bottom: 4px solid #1f2937;
}
.filters li {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}
li {
  list-style: none;
}

@media (min-width: 1023px) {
  .filters ul {
    min-width: 15rem;
    margin-right: 5rem;
  }
  .container {
    display: flex;
  }
}
</style>