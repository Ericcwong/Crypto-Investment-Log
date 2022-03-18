<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="min-h-full">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuth } from "@/firebase/user.js";
// import SignInModal from "./Auth/SignIn.vue";
// import Register from "./Auth/Register.vue";
import Button from "@/components/UI/Button.vue";
import NewInvestment from "@/components/NewInvestment/NewInvestment.vue";
import Modal from "@/components/UI/Modal/index.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import Navbar from "./components/UI/Navigation/Navbar.vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { LogoutIcon, PlusIcon, LoginIcon } from "@heroicons/vue/solid";
const userStore = useUserStore();
const router = useRouter();
const modalActive = ref(false);
const sidebarOpen = ref(false);
let userUID = computed(() => {
  return userStore.user.userUID;
});
const toggleModal = () => {
  sidebarOpen.value = false;
  modalActive.value = !modalActive.value;
};
const routeTo = () => {
  router.push({
    path: `/portfolio/${userUID.value}`,
  });
};
const loginNav = [
  {
    name: "Dashboard",
    runFunction: () => {
      router.push({ path: "/" });
    },
    icon: HomeIcon,
    current: true,
  },
  {
    name: "New Investment",
    runFunction: () => {
      toggleModal();
    },
    icon: PlusIcon,
    current: false,
  },
  {
    name: "Sign Out",
    runFunction: () => {
      googleSignOut();
    },
    icon: LogoutIcon,
    current: false,
  },
];
const defaultNav = [
  {
    name: "Sign In",
    runFunction: () => {
      googleSignIn();
    },
    icon: LoginIcon,
    current: true,
  },
];
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
