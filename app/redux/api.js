import axios from "axios";
// import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://hifl-herokuapp.com/api/v1";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(
  async (req) => {
    const token = await AsyncStorage.getItem("user");
    if (token) {
      req.headers.Authorization = `Bearer ${JSON.parse(token).data.accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = (formData) => API.post("/auth/login", formData);
export const fanSignup = (formData) => API.post("/volunteers/fans/fan/register", formData);
export const fanUpdate = (formData) => API.patch("/volunteers/fans/fan/update", formData);
export const getFans = (userId) => API.get(`/volunteers/fans/all?CreatedBy=${userId}`);
export const getSingleFan = (fanId) => API.get(`/volunteers/fans/fan?_id=${fanId}`);
