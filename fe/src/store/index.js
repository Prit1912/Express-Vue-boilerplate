import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { user } from "./modules/user";

export default createStore({
  plugins: [createPersistedState()],
  modules: {
    user,
  },
});
