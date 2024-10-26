import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banners', {
  state: () => ({
    banners: [],
    singleBanner: [],
  }),
  actions: {
    async getBanners() {
      try {
        const response = await fetch('https://jr-store-self.vercel.app/api/banners')
        const data = await response.json();
        this.banners = data;
        return this.banners;
      }
      catch (error) {
        throw new Error(error.message);
      }

    },
    async getSingleBanner(id: string) {
      try {
        const response = await fetch("https://jr-store-self.vercel.app/api/banners/" + id);
        const data = await response.json();
        this.singleBanner = data;
        return this.singleBanner;

      }
      catch (error) {
        throw new Error(error.message);
      }
    },
    async deleteBanner(id: string) {
      try {
        const response = await fetch("https://jr-store-self.vercel.app/api/banners/" + id, { method: "DELETE" })
        if (response.ok) {
          return response;
        }
      }
      catch (error) {
        throw new Error(error.message);
      }
    }
  },

})
