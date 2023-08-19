import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./services/api";

const app = createApp(App);

// Add a request interceptor
api.interceptors.request.use((config) => {
  console.log("request");
  // Modify the request config here
  config.headers.Authorization = `${localStorage.getItem("token")}`;
  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log({ response });
    // Handle successful response here
    return response;
  },
  (error) => {
    // Handle error response here
    return Promise.reject(error);
  }
);

// Add the Axios instance to the Vue app instance
app.config.globalProperties.$axios = api;

app.use(store).use(router).mount("#app");
