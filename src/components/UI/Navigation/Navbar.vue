<template>
  <nav class="bg-nav-bg flex flex-col items-center">
    <router-link to="/"><div class="text-xl">Investment Log</div></router-link>
    <div class="flex user justify-center items-center flex-auto">
      <!-- Sign in -->
      <Button
        v-if="!isLogin"
        @runFunction="googleSignIn"
        :Icon="['fab', 'google']"
        name="Sign In"
      ></Button>

      <!-- <div class="signIn" v-if="!isLogin">
        <SignInModal :googleSignIn="signIn" />
      </div> -->

      <!-- Logged in -->
      <div class="user" v-else>
        <div class="avatar mr-4">
          <!-- Future features -->
          <Button name="My Account"></Button>
        </div>
        <UserInvestment />

        <Button @runFunction="googleSignOut" name="Sign Out"></Button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useAuth } from "@/firebase/user.js";
import SignInModal from "./Auth/SignIn.vue";
import Register from "./Auth/Register.vue";
import Button from "@/components/UI/Button.vue";
import UserInvestment from "@/components/UserInvestment/index.vue";

// const isLogin = false;
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
</script>

<style scoped></style>
