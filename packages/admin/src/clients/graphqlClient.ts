import axios from "axios";
export const graphqlClient = axios.create({
    baseURL: "http://localhost:3000"
})