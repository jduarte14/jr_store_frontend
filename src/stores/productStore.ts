import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    singleProduct:[],
  }),
  actions: {
    async getProducts() {
      try {
        const response = await fetch('https://jrstore-production.up.railway.app/api/products')
          const data = await response.json();
          this.products = data;
          return data;
      }
      catch (error) {
        throw new Error(error.message);
      }

    },
    async getSingleProduct(id:string) {
      try {
        const response = await fetch("https://jrstore-production.up.railway.app/api/products/" + id);
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
