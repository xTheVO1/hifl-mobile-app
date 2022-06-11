import axios from "axios";
import { BASE_URL } from "@env";

const API = axios.create({ baseURL: BASE_URL });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("user")) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).data.accessToken}`;
//   }
//   return req;
// });

export const signIn = (formData) => API.post("/auth/login", formData);
export const update = (formData) => API.patch("/auth/user/update-profile", formData);
