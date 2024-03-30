import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banners', {
  state: () => ({
    banners: [],
    singleBanner:[],
  }),
  actions: {
    async getBanners() {
      try {
        const response = await fetch('https://jrstore-production.up.railway.app/api/banners')
          const data = await response.json();
          this.banners = data;
          return this.banners;
      }
      catch (error) {
        throw new Error(error.message);
      }

    },
    async getSingleBanner(id:string) {
      try {
        const response = await fetch("https://jrstore-production.up.railway.app/api/banners/" + id);
          const data = await response.json();
          this.singleBanner = data;
          return this.singleBanner;
        
      }
      catch(error) {
        throw new Error(error.message);
      }
    }
  },
  
})
