import { fetchData } from "@/helpers/fetchHelper";

let url = "https://jr-store-self.vercel.app/api/articles";

export const getArticles = async () => {
    try {
        const response = fetchData(url, "GET");

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getArticleById = async (id) => {
    try {
        const response = fetchData(url + "/" + id, "GET");

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getArticlesByCategory = async (category) => {
    try {
        const response = fetchData(url + "/category/"+ category, "GET")

        return response;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const createArticle = async (data) => {
    try {
        const formData = new FormData();

        formData.append("title", data.title)
        formData.append("category", data.category)
        formData.append("description", data.description)
        formData.append("content", data.content)
        formData.append("banner", data.banner);

        const response = fetchData(url, "POST", formData);
        return response;
    }
    catch(error) {
        throw new Error(error.message);
    }
}


export const deleteArticle = async (id) => {
    try {
        const response = fetchData(url + "/" + id, "DELETE");

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const patchArticle = async (data, id) => {
    try {
        const formData = new FormData();

        formData.append("title", data.title)
        formData.append("category", data.category)
        formData.append("description", data.description)
        formData.append("content", data.content)
        formData.append("banner", data.banner);

        const response = fetchData(url + "/" + id, "PATCH", formData);
        return response;
    }
    catch(error) {
        throw new Error(error.message);
    }
}



export const uploadImage = async (bodyData) => {
    try {
        const fileData = new FormData();

        fileData.append("image", bodyData);
        const response = await fetchData(url + "/attachment/image/upload", "POST", fileData);

        return response.image;
    }
    catch(error) {
        throw new Error(error.message);
    }
}