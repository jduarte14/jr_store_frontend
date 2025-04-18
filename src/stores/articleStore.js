import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    singleProduct: [],
  }),
  actions: {
    async getArticles() {
      try {
        const response = await fetch('https://jr-store-self.vercel.app/api/products')
          const data = await response.json();
          this.products = data;
          return data;
      }
      catch (error) {
        throw new Error(error.message);
      }

    },
    async getSingleArticle(id) {
      try {
        const response = await fetch("https://jr-store-self.vercel.app/api/products/" + id);
          const data = await response.json();
          this.singleProduct = data;
          return data;
        
      }
      catch(error) {
        throw new Error(error.message);
      }
    }
  },
  
})
