<template>
  <div class="border h-5/6 w-1/3 bg-slate-600 rounded-lg text-white">
    <h2>Swap Assets</h2>
    <div class="grid gap-12 p-5">
      <!-- From input -->
      <div class="input-container">
        <label for="asset-1 text-2xl ">From</label>
        <div class="flex border-2 p-4 rounded-lg">
          <input
            class="w-full text-3xl bg-slate-600"
            type=""
            placeholder="0.00"
          />
          <Modal @close="toggleModal" :modalActive="modalActive">
            <CryptoList
          /></Modal>
          <button @click="toggleModal">
            <div class="flex items-center">
              <img class="w-7" :src="userCrypto[0].icon" alt="icon" />
              <div class="flex items-center pl-2 pr-3">
                <span class="uppercase mr-1">{{ userCrypto[0].symbol }} </span>
                <font-awesome-icon class="text-sm" icon="caret-down" />
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Switch from, to. -->
      <div class="flex justify-center items-center">
        <img src="https://img.icons8.com/ios-glyphs/30/000000/change--v1.png" />
      </div>

      <!-- To input -->
      <div class="input-container">
        <label for="asset-2">To</label>
        <div class="flex border-2 p-4 rounded-lg">
          <input
            class="w-full text-3xl bg-slate-600"
            type=""
            placeholder="0.00"
          />
          <Modal @close="toggleModal" :modalActive="modalActive">
            <CryptoList />
          </Modal>
          <button @click="toggleModal">
            <div class="flex items-center">
              <img class="w-7" :src="userCrypto[1].icon" alt="icon" />
              <div class="flex items-center ml-2 mr-3">
                <span class="uppercase mr-1">{{ userCrypto[1].symbol }} </span>
                <font-awesome-icon class="text-sm" icon="caret-down" />
              </div>
            </div>
          </button>
        </div>
      </div>
      <Button name="Swap" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/UI/Modal/index.vue";
import Button from "@/components/UI/Button.vue";
import CryptoList from "./CryptoList.vue";
import { useStore } from "vuex";

const store = useStore();
const userCrypto = store.getters["cryptos/getUserCrypto"];
console.log(userCrypto[1]);
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<style></style>
