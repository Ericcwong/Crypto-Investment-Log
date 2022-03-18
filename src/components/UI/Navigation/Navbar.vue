<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <a
              v-if="isLogin"
              v-for="item in loginNav"
              :key="item.name"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'px-3 py-2 rounded-md text-sm font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a
            >
          </div>
        </div>
        <button v-if="!isLogin" class="text-white" @click="googleSignIn()">
          Sign In
        </button>
        <div class="flex items-center" v-if="isLogin">
          <div class="flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              @click.prevent="toggleModal"
            >
              <PlusSmIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              <span>New Investment</span>
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <button
              type="button"
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    v-if="user"
                    class="h-8 w-8 rounded-full"
                    :src="user.photoURL"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <button
                      @click.prevent="item.runFunction"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      {{ item.name }}
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <DisclosureButton
          v-for="item in loginNav"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5 sm:px-6">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ user.displayName }}
            </div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 px-2 space-y-1 sm:px-3">
          <button
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            @click="item.runFunction"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {{ item.name }}
          </button>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <Modal @close="toggleModal" :modalActive="modalActive">
    <NewInvestment />
  </Modal>
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
import { useUserStore } from "../../../stores/user";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  HomeIcon,
  PlusIcon,
  LogoutIcon,
  LoginIcon,
} from "@heroicons/vue/outline";

import { PlusSmIcon } from "@heroicons/vue/solid";

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
const userNavigation = [
  {
    name: "Sign Out",
    runFunction: () => {
      console.log("Clicked");
      googleSignOut();
    },
    icon: LogoutIcon,
    current: false,
  },
];
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
console.log(user);
</script>
