<template>
  <div class="input-container">
    <label for="asset-2">To</label>
    <div class="flex border-2 p-4 rounded-lg">
      <input
        class="w-full text-3xl bg-slate-600"
        type="number"
        placeholder="0.00"
        v-model="quantity"
      />
      <Modal @close="toggleModal" :modalActive="modalActive">
        <CryptoList @changeCrypto="changeCryptoTwo" />
      </Modal>
      <div class="flex flex-col">
        <button @click="toggleModal">
          <div class="flex items-center">
            <img
              class="w-7"
              :src="userCrypto[selectedCryptoTwo.index].icon"
              alt="icon"
            />
            <div class="flex items-center ml-2 mr-3">
              <span class="uppercase mr-1"
                >{{ userCrypto[selectedCryptoTwo.index].symbol }}
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/UI/Modal/index.vue";
import Button from "@/components/UI/Button.vue";
import CryptoList from "./CryptoList.vue";
const props = defineProps({
  userCrypto: Array,
  selectedCryptoTwo: Object,
});
const quantity = ref(null);
const emit = defineEmits(["updateCrypto"]);
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCryptoTwo = (data) => {
  emit("updateCrypto", data);
  toggleModal();
};
const half = () => {
  quantity.value = props.selectedCryptoTwo.quantity / 2;
};
const max = () => {
  quantity.value = props.selectedCryptoTwo.quantity;
};
</script>
