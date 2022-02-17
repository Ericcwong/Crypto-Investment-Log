<template>
  <nav class="bg-nav-bg">
    <router-link to="/">
      <div class="text-xl text-center mt-10 mb-10">Investment Log</div>
    </router-link>
    <!-- Navigation buttons -->
    <div class="grid grid-rows-6 gap-8 h-3/4">
      <!-- Sign in -->
      <Button
        v-if="!isLogin"
        @runFunction="googleSignIn"
        :Icon="['fab', 'google']"
        name="Sign In"
      ></Button>
      <!-- Logged in buttons -->
      <Button v-if="isLogin" name="My Account" Icon="user-circle"></Button>
      <Button
        v-if="isLogin"
        @runFunction="toggleModal"
        Icon="plus"
        name="New Investment"
      ></Button>
      <Button
        v-if="isLogin"
        Icon="arrow-alt-circle-right"
        @runFunction="googleSignOut"
        name="Sign Out"
      ></Button>
      <Modal @close="toggleModal" :modalActive="modalActive">
        <NewInvestment />
      </Modal>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "@/firebase/user.js";
import SignInModal from "./Auth/SignIn.vue";
import Register from "./Auth/Register.vue";
import Button from "@/components/UI/Button.vue";
import NewInvestment from "@/components/NewInvestment/NewInvestment.vue";
import Modal from "@/components/UI/Modal/index.vue";

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
</script>

<style scoped></style>
