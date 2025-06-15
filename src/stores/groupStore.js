import { defineStore } from 'pinia'

export const useGroupStore = defineStore('groups', {
    state: () => ({
        groups: {
            articles: [],
            products: [],
            paintings: [],
        },
    }),
    actions: {
        async getGroups() {
            try {
                const response = await fetch('https://jr-store-self.vercel.app/api/groups')
                const data = await response.json();
                console.log(data, "fetch");
                const groups = data.groups;

                this.setGroups(groups);

                return this.groups;
            }
            catch (error) {
                throw new Error(error.message);
            }

        },
        async setGroups(groupsData) {
            return this.groups = {
                products: groupsData.filter(item => item.category == 'products') || [],
                pictures: groupsData.filter(item => item.category == 'pictures') || [],
                paintings: groupsData.filter(item => item.category == 'paintings') || [],
            }
        },
        async getSingleGroup(id) {
            try {
                const response = await fetch("" + id);
                const data = await response.json();
                this.singleProduct = data;
                return data;

            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    },

})
