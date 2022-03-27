import axios from "axios";
export const postgrestClient = axios.create({
  baseURL: "http://localhost:3000",
});
