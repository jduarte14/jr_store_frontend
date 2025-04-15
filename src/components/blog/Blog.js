import { fetchData } from "@/helpers/fetchHelper";

let url = "https://jr-store-self.vercel.app/api/articles";
let portal = "http://localhost:4800/api/articles";


export const getArticles = async () => {
    try {
        const response = fetchData(url, "GET");
        let data = response.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getArticleById = async (id) => {
    try {
        const response = fetchData(url + "/" + id, "GET");
        let data = response.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const deleteArticle = async (id) => {
    try {
        const response = fetchData(url + "/" + id, "DELETE");
        let data = response.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const patchArticle = async (id, bodyData) => {
    try {
        const formData = new FormData();
        Object.keys(bodyData).forEach(key=>{
            formData.append(key, bodyData[key]);
        })

        const response = fetchData(url + "/" + id, "PATCH");
        let data = response.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const uploadImage = async (bodyData) => {
    try {
        const fileData = new FormData();

        fileData.append("image", bodyData);
        const response = await fetchData(portal + "/attachment/image/upload", "POST", fileData);
        console.log(response.json(), "UploadImage");
        return response.json();
    }
    catch(error) {
        throw new Error(error.message);
    }
}