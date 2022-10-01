import axios from "axios";

const Api = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/api/`,
  headers: {
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
