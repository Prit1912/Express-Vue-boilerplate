export const user = {
  namespaced: true,
  strict: true,
  state: {
    user: null,
    token: null,
    isLoggedIn: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isLoggedIn = !!token;
    },
    setUser(state, user) {
      state.data = user;
    },
    logout(state) {
      state.data = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  actions: {
    // set token
    setToken({ commit }, token) {
      commit("setToken", token);
    },

    // set user
    setUser({ commit }, user) {
      commit("setUser", user);
    },

    // logout
    logout({ commit }) {
      commit("logout");
    },
  },
};
