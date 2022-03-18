<template>
  <div>
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4 text-white">
                <img class="h-8 w-auto" src="./rocket.svg" alt="Moon Rocket" />
                <span>Moon Rocket</span>
              </div>
              <nav class="mt-5 flex-1 px-2 space-y-1">
                <div v-if="!isLogin">
                  <button
                    v-for="item in defaultNav"
                    :key="item.name"
                    @click.prevent="item.runFunction"
                    :class="[
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-md font-medium rounded-md w-full',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </button>
                </div>
                <div v-if="isLogin">
                  <button
                    v-for="item in loginNav"
                    :key="item.name"
                    @click.prevent="item.runFunction"
                    :class="[
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-md font-medium rounded-md w-full',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </button>
                </div>
              </nav>
            </div>
            <div v-if="isLogin" class="flex-shrink-0 flex bg-gray-700 p-4">
              <a href="#" class="flex-shrink-0 w-full group block">
                <div class="flex items-center">
                  <div>
                    <img
                      class="inline-block h-9 w-9 rounded-full"
                      :src="user.photoURL"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-white">
                      {{ user.displayName }}
                    </p>
                    <p
                      class="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                    >
                      Welcome back!
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- End of mobile sidebar -->
    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <router-link to="/" class="flex items-center flex-shrink-0 px-4">
            <img src="./rocket.svg" class="w-1/3" alt="" />
            <h1 class="text-white">Moon Rocket</h1>
          </router-link>

          <nav class="mt-5 flex-1 px-2 space-y-1">
            <div v-if="!isLogin">
              <button
                v-for="item in defaultNav"
                :key="item.name"
                @click.prevent="item.runFunction"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-md font-medium rounded-md w-full',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </button>
            </div>
            <div v-if="isLogin">
              <button
                v-for="item in loginNav"
                :key="item.name"
                @click.prevent="item.runFunction"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-md font-medium rounded-md w-full',
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current
                      ? 'text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </button>
            </div>
          </nav>
        </div>
        <!-- Button User account -->
        <div v-if="isLogin" class="flex-shrink-0 flex bg-gray-700 p-4">
          <a href="#" class="flex-shrink-0 w-full group block">
            <div class="flex items-center">
              <div>
                <img
                  class="inline-block h-9 w-9 rounded-full"
                  :src="user.photoURL"
                  alt=""
                />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-white">
                  {{ user.displayName }}
                </p>
                <p
                  class="text-xs font-medium text-gray-300 group-hover:text-gray-200"
                >
                  Welcome back!
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <NewInvestment />
    </Modal>
    <!-- Hamburger sidebar -->
    <div class="md:pl-64 flex flex-col flex-1">
      <div
        class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-800"
      >
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
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
import { useUserStore } from "../../../stores/user";
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
