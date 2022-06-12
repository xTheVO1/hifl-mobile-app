import axios from "axios";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  AsyncStorage.getItem("user").then((res) => {
    if (res !== null) {
      req.headers.Authorization = `Bearer ${JSON.parse(res).data.accessToken}`;
    }
  });
  return req;
});

export const signIn = (formData) => API.post("/auth/login", formData);
export const fanSignup = (formData) => API.post("/volunteers/fans/fan/register", formData);
export const fanUpdate = (formData) => API.patch("/volunteers/fans/fan/update", formData);
// export const allFans = (formData) => API.get("/volunteers/fans/fan/register", formData);
// export const signleFan = (formData) => API.get("/volunteers/fans/fan/register", formData);
