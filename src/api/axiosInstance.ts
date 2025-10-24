import axios from "axios";

export const BASE_URL = "http://localhost:11434";
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Ollama default
  timeout: 10000,
});

export default axiosInstance;
