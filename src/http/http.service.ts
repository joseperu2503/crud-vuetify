import axios from 'axios';
import { useToken } from "@/composables/useToken";

const apiUrl = process.env.VUE_APP_API_URL

const http = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

const { getToken } = useToken()

http.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${getToken()}`
  return request;
});

export { http };

