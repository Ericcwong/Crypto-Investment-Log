<template>
  <div class="input-container">
    <label for="asset-1 text-2xl ">From</label>
    <div class="flex border-2 p-4 rounded-lg">
      <input class="w-full text-3xl bg-slate-600" type="" placeholder="0.00" />
      <Modal @close="toggleModal" :modalActive="modalActive">
        <CryptoList @changeCrypto="changeCryptoOne"
      /></Modal>
      <button @click="toggleModal">
        <div class="flex items-center">
          <img
            class="w-7"
            :src="userCrypto[selectedCryptoOne.index].icon"
            alt="icon"
          />
          <div class="flex items-center pl-2 pr-3">
            <span class="uppercase mr-1"
              >{{ userCrypto[selectedCryptoOne.index].symbol }}
            </span>
            <font-awesome-icon class="text-sm" icon="caret-down" />
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/UI/Modal/index.vue";
import Button from "@/components/UI/Button.vue";
import CryptoList from "./CryptoList.vue";
const props = defineProps({
  userCrypto: Array,
  selectedCryptoOne: Object,
});
const emit = defineEmits(["updateCrypto"]);
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCryptoOne = (data) => {
  console.log(data);
  emit("updateCrypto", data);
  toggleModal();
};
</script>
