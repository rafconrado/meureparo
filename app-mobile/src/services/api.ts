import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// URL base da sua API. Altere apenas aqui se o endereço do seu servidor mudar.
const API_BASE_URL = "http://192.168.0.8:3000/api-backend";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const storedUser = await AsyncStorage.getItem("@app:user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const token = userData?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  } catch (error) {
    console.error("Erro no interceptor do Axios:", error);
    return Promise.reject(error);
  }
});

export default api;
