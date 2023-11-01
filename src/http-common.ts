import axios from "axios";
import type { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://emotaku.ddns.net/apiEmotaku",
  //http://localhost:8080/apiEmotaku
  //https://emotaku.ddns.net/apiEmotaku
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
