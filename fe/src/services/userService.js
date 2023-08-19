import api from "./api";

export const signUp = (user) => {
  return api.post("/v1/users/signup", user);
};

export const signIn = (credentials) => {
  return api.post("/v1/users/signin", credentials);
};
