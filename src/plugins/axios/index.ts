import Axios from "./Axios";

const http = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});
const setup = () => {};
export { http, setup };
