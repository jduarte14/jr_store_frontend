import { defineStore } from 'pinia'
import router from '../router';
export const useUserStore = defineStore('users', {
    state: () => ({
        admin: "",
    }),
    actions: {
        async getUser() {
            try {
                const token = sessionStorage.getItem('token');
                console.log(token);
                if (token) {
                    this.admin = token;
                    return this.admin;
                } else {
                    this.admin = "";
                    return;
                }


            }
            catch (error) {
                throw new Error(error.message);
            }
        },
        async removeUser() {
            try {
                const token = sessionStorage.removeItem('token');
                if (token) {
                    this.admin = "";
                    return this.admin;
                }
                router.push('/');
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    },


})
