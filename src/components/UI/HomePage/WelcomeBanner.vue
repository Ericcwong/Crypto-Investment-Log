<template>
  <h1 class="pt-8 text-center" v-if="isLogin">
    Welcome {{ user.displayName.split(" ")[0] }}, Portfolio is at (price) (up or
    down percentage)
  </h1>
</template>

<script setup>
import { useAuth } from "@/firebase/user";
const { isLogin, user } = useAuth();
</script>

<style></style>
