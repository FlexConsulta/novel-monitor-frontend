import axios from "axios";
// import { getLoggedUserInfo } from "./profile";

const Api = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/api/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt-monitor-banco")}`,
    "Content-Type": "application/json",
  },
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default Api;
