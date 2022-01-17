<template>
  <nav class="navbar bg-gray-600">
    <div class="header">Investment Log</div>
    <div class="user">
      <!-- Sign in -->
      <div class="signIn" v-if="!isLogin">
        <SignInModal :googleSignIn="signIn" />
      </div>

      <!-- Logged in -->
      <div class="user" v-else>
        <div class="avatar mr-4">
          <!-- Future features -->
          <ul>
            <li>My account</li>
          </ul>
        </div>
        <button class="auth-button" @click="signOut">Sign out</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useAuth } from "@/firebase/user.js";
import SignInModal from "./Auth/SignIn.vue";
import Register from "./Auth/Register.vue";
// const isLogin = false;
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
const signIn = () => {
  console.log("user signing in");
  googleSignIn();
};
const signOut = googleSignOut;
const darkMode = () => {};
</script>

<style scoped></style>
