<template>
  <div class="input-container">
    <label for="asset-1 text-2xl ">From</label>

    <div class="flex border-2 p-4 rounded-lg">
      <input
        class="w-full text-3xl bg-slate-600"
        pattern="\d*"
        placeholder="0.00"
        v-model.number="tradeQuantity"
        @input="checkAmount"
      />
      <div class="flex flex-col">
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

        <div class="flex justify-between">
          <button @click="half">50%</button>
          <button @click="max">Max</button>
        </div>
      </div>
    </div>
    <span v-if="overQuantity" class="text-red-400"
      >Amount exceeds over quantity amount!</span
    >

    <Modal @close="toggleModal" :modalActive="modalActive">
      <CryptoList @changeCrypto="changeCryptoOne"
    /></Modal>
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
const emit = defineEmits(["updateCrypto", "updateTradeQuantity"]);

const tradeQuantity = ref(null);
const overQuantity = ref(false);
const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCryptoOne = (data) => {
  emit("updateCrypto", data);
  toggleModal();
};
const half = () => {
  tradeQuantity.value = props.selectedCryptoOne.quantity / 2;
};
const max = () => {
  tradeQuantity.value = props.selectedCryptoOne.quantity;
};
const checkAmount = () => {
  if (tradeQuantity.value <= props.selectedCryptoOne.quantity) {
    emit("updateTradeQuantity", tradeQuantity);
    overQuantity.value = false;

    return;
  } else {
    overQuantity.value = true;
  }
};
</script>
