<template>
  <nav class="flex justify-between pt-4">
    <div class="header">Investment Log</div>
    <div class="user">
      <button
        v-if="!isLogin"
        class="text-white hover:bg-gray-500 rounded"
        @click="signIn"
      >
        Sign in
      </button>
      <div class="sign-in flex" v-else>
        <div class="avatar mr-4">
          <img class="rounded-full w-8" src="" alt="" />
        </div>
        <button class="text-white hover:bg-gray-900" @click="signOut">
          Sign out
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useAuth } from "@/firebase/user.js";
// const isLogin = false;
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
const signIn = () => {
  console.log("user signing in");
  googleSignIn();
};
const signOut = googleSignOut;
</script>

<style></style>
