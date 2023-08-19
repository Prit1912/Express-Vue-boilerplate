<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-10 col-sm-8 col-md-6 col-lg-4">
        <h4 class="text-center">Create Udemy Account !!</h4>
        <hr />
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <form
          @submit="submit"
          class="row row-cols-lg-auto g-3 align-items-center"
        >
          <div class="col-12">
            <label class="visually-hidden" for="name">name</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-user"></i>
              </div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Username"
                v-model="user.userName"
              />
            </div>
            <span class="error">{{ errorName }}</span>
          </div>

          <div class="col-12">
            <label class="visually-hidden" for="email">email</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-envelope"></i>
              </div>
              <input
                type="text"
                class="form-control"
                id="email"
                placeholder="Email"
                v-model="user.email"
              />
            </div>
            <span class="error">{{ errorEmail }} </span>
          </div>

          <div class="col-12">
            <label class="visually-hidden" for="phone">phone</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-phone"></i>
              </div>
              <input
                type="number"
                class="form-control"
                id="phone"
                placeholder="Mobile"
                v-model="user.mobile"
              />
            </div>
            <span class="error">{{ errorPhone }}</span>
          </div>

          <div class="col-12">
            <label class="visually-hidden" for="password">Password</label>
            <div class="input-group">
              <div class="input-group-text"><i class="fas fa-lock"></i></div>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
            <span class="error">{{ errorPassword }}</span>
          </div>

          <div class="col-12">
            <button
              class="btn btn-primary d-block w-100"
              style="background-color: blueviolet"
            >
              Sign up
            </button>
          </div>

          <div class="col-12">
            <p class="text-center">
              Already have an account?
              <router-link :to="{ name: 'Login' }">Login</router-link>
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
import { signUp } from "../services/userService";
// import userData from "../../services/users";
export default {
  name: "Signup",
  data() {
    let user = {
      userName: "",
      email: "",
      mobile: null,
      password: "",
      // role: "user",
    };

    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object({
      userName: yup.string().min(2).required("Username is required"),
      email: yup
        .string()
        .email("must be a valid email")
        .required("Email is required"),
      mobile: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .max(10, "max 10 digits are allowed")
        .required("Phone number is required"),
      password: yup
        .string()
        .min(4, "minimum 4 character required")
        .required("Password is required"),
    });

    const { handleSubmit } = useForm({
      validationSchema,
    });

    const { value: name, errorMessage: errorName } = useField("userName");
    const { value: email, errorMessage: errorEmail } = useField("email");
    const { value: phone, errorMessage: errorPhone } = useField("mobile");
    const { value: password, errorMessage: errorPassword } =
      useField("password");

    user.userName = name;
    user.email = email;
    user.mobile = phone;
    user.password = password;

    const submit = handleSubmit((values) => {
      console.log(values);
      this.signup(values);
    });

    return {
      user,
      submit,
      errorName,
      errorEmail,
      errorPhone,
      errorPassword,
      error: "",
    };
  },
  unMounted() {
    // this.$router.go();
  },
  methods: {
    // signup method
    signup(user) {
      console.log(user);
      // console.log(userService.signUp);
      // userService
      signUp(user)
        .then((res) => {
          console.log(res.data);
          this.error = "";
          this.$store.dispatch("user/setToken", res?.data?.token || "");
          this.$store.dispatch("user/setUser", res?.data?.user || {});
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err.response);
          this.error = err?.response?.data?.error || "Something went wrong";
        });
    },
  },
};
</script>

<style></style>
