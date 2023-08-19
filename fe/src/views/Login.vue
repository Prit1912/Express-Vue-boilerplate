<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-10 col-sm-8 col-md-6 col-lg-4">
        <h4 class="text-center">Log In to Your Account!</h4>
        <hr />
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <form
          @submit="submit"
          class="row row-cols-lg-auto g-3 align-items-center"
        >
          <div class="col-12">
            <label class="visually-hidden" for="username">username</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-envelope"></i>
              </div>
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Email"
                v-model="user.email"
              />
            </div>
            <span class="error"> {{ errorEmail }} </span>
          </div>
          <div class="col-12">
            <label class="visually-hidden" for="password">Password</label>
            <div class="input-group">
              <div class="input-group-text"><i class="fas fa-lock"></i></div>
              <input
                v-if="!showPassword"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="user.password"
              />
              <input
                v-else
                type="text"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="user.password"
              />
              <!-- <div class="input-group-text"> -->
              <button
                type="button"
                class="btn btn-sm btn-light border border-2"
                @click="showPassword = !showPassword"
              >
                <i
                  class="fas"
                  :class="{
                    'fa-eye-slash': !showPassword,
                    'fa-eye': showPassword,
                  }"
                ></i>
              </button>
              <!-- </div> -->
            </div>
            <p class="error">{{ errorPassword }}</p>
          </div>
          <div class="col-12">
            <button
              class="btn btn-primary d-block w-100"
              style="background-color: blueviolet"
            >
              Log In
            </button>
          </div>

          <!-- <div class="col-12 text-center">
            <p class="text-center">
              or&nbsp;
              <span style="color: blueviolet">
                <router-link :to="{ name: 'forgotPassword' }"
                  >forgot password?</router-link
                ></span
              >
            </p>
          </div> -->

          <div class="col-12 text-center">
            <p class="text-center">
              Don't have an account?
              <!-- <a href="./Signup.html"> Sign Up </a> -->
              <router-link :to="{ name: 'Signup' }">Sign up</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/style.css";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { signIn } from "../services/userService";
// import userData from "../../services/users";

export default {
  name: "login",
  data() {
    let user = {
      email: "",
      password: "",
    };
    const validationSchema = yup.object({
      email: yup
        .string()
        .email("must be a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(4, "minimum 4 character required")
        .required("Password is required"),
    });

    const { handleSubmit } = useForm({
      validationSchema,
    });

    const { value: email, errorMessage: errorEmail } = useField("email");
    const { value: password, errorMessage: errorPassword } =
      useField("password");

    user.email = email;
    user.password = password;

    const submit = handleSubmit((values) => {
      console.log(values);
      this.login(values);
    });

    return {
      user,
      submit,
      errorEmail,
      errorPassword,
      error: "",
      showPassword: false,
    };
  },
  methods: {
    // login method
    login(credentials) {
      console.log(credentials);
      signIn(credentials)
        .then((res) => {
          this.error = "";
          this.$store.dispatch("user/setToken", res?.data?.token || "");
          this.$store.dispatch("user/setUser", res?.data?.user || {});
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err.response);
          this.error = err?.response?.data?.error || "Something went wrong";
        });
      // userData
      //   .userLogin(user)
      //   .then((res) => {
      //     if (res.status == 200) {
      //       // autologout function
      //       setTimeout(() => {
      //         this.$store.dispatch("user/logout");
      //         this.$router.push({ name: "login" });
      //       }, 604800000);
      //       this.error = "";
      //       this.$store.dispatch("user/setToken", res.data.token);
      //       this.$store.dispatch("user/setUser", res.data.user);
      //       console.log(this.$store.state.user);
      //       if (res.data.user.role == "user") {
      //         if(localStorage.getItem('redirectTo') == 'courses'){
      //           this.$router.push({name: 'allCourses'})
      //           localStorage.removeItem('redirectTo')
      //         }else{
      //           this.$router.push("/");
      //         }
      //       } else if (res.data.user.role == "instructor") {
      //         this.$router.push("/instructor");
      //       } else if (res.data.user.role == "admin") {
      //         this.$router.push("/admin");
      //       }
      //     }
      //   })
      //   .catch((err) => {
      //     this.error = err.response.data;
      //   });
    },
  },
};
</script>

<style scoped></style>
