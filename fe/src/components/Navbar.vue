<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <h4 class="logo me-5">
          <b> my<span class="primary-color">L</span>ogo </b>
        </h4>
        <!-- <img src="../assets/logo-udemy.svg" class="logo" alt="" /> -->
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'About' }">About</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <div v-if="this.$store?.state?.user?.isLoggedIn">
            <div>
              <button class="btn btn-dark me-3" type="button">Profile</button>
              <button class="btn btn-dark" type="button" @click="logout">
                Logout
              </button>
            </div>
          </div>
          <div v-else>
            <button
              class="btn btn-dark me-3"
              type="button"
              @click="this.$router.push('/signup')"
            >
              Signup
            </button>
            <button
              class="btn btn-dark"
              type="button"
              @click="this.$router.push('/login')"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import "../assets/css/style.css";
export default {
  name: "navbar",
  methods: {
    logout() {
      // this.$store.dispatch("user/setToken", null),
      //   this.$store.dispatch("user/setUser", null);
      this.$store.dispatch("user/logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
