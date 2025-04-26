import { fetchData } from "@/helpers/fetchHelper";

let url = "http://localhost:4800/api/groups";


export const getAllGroups = async () => {
    try {
        const response = fetchData(url, "GET");

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getGroupsByCategory = async (category, type)=>{
    try {
        const response = fetchData(url +`?type=${type}&category=${category}`, "GET");

        return response;
    }
    catch(error) {
        throw new Error(error.message);
    }
}