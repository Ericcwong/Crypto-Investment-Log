<template>
  <h1 class="text-center" v-if="!isLogin">Loading data...</h1>
  <h1 class="pt-8 text-center" v-else>
    Welcome {{ user.displayName.split(" ")[0] }}, Portfolio is at (price) (up or
    down percentage)
  </h1>
</template>

<script setup>
import { useAuth } from "@/firebase/user";
const { isLogin, user } = useAuth();
</script>

<style></style>
