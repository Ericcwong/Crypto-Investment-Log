<template>
  <nav class="navbar">
    <div class="header">Investment Log</div>
    <div class="user">
      <button v-if="!isLogin" class="auth-button" @click="signIn">
        Sign in
      </button>
      <div class="sign-in" v-else>
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
// const isLogin = false;
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
console.log(user);
const signIn = () => {
  console.log("user signing in");
  googleSignIn();
};
const signOut = googleSignOut;
</script>

<style scoped>
.navbar {
  background-color: rgb(91, 114, 114);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
}
.header {
  font-size: 2rem;
  text-align: center;
  border-bottom: 1px solid black;
}
.user-image {
  border-radius: 50%;
  width: 6rem;
}
li {
  font-size: 1.2rem;
}
</style>
