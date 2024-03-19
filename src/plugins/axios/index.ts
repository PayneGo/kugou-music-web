import { Axios } from "@/plugins/axios/Axios";

const http = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "/api",
  timeout: 1000,
  withCredentials: true,
});

export { http };
