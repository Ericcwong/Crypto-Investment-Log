<template>
  <div class="input-container">
    <label for="asset-2">To</label>
    <div class="flex border-2 p-4 rounded-lg">
      <input
        class="w-4/5 text-3xl bg-inherit mr-2"
        type="number"
        placeholder="0.00"
        v-model="tradeQuantity"
      />

      <div class="grid grid-cols-2 grid-rows-2 gap-4">
        <button class="col-span-2" @click="toggleModal">
          <div class="flex items-center justify-between">
            <img
              class="w-5"
              v-if="chosenCrypto.crypto"
              :src="chosenCrypto.crypto.icon"
              alt="icon"
            />
            <div class="flex items-center justify-between">
              <span v-if="chosenCrypto.crypto" class="uppercase mr-1"
                >{{ chosenCrypto.crypto.symbol }}
              </span>
              <font-awesome-icon class="text-sm" icon="caret-down" />
            </div>
          </div>
        </button>

        <!-- <div class="flex justify-between"> -->
        <button @click="half">50%</button>
        <button @click="max">Max</button>
        <!-- </div> -->
      </div>
    </div>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <CryptoList @changeCrypto="changeCrypto" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, watch } from "vue";
import InputNumber from "primevue/inputnumber";
import Modal from "@/components/UI/Modal/index.vue";
import Button from "@/components/UI/Button.vue";
import CryptoList from "./CryptoList.vue";
import { useCryptoStore } from "../../stores/cryptos";
const cryptoStore = useCryptoStore();
const props = defineProps({
  userCrypto: Array,
});

const chosenCrypto = reactive({
  crypto: null,
});
// Vue documentation for watchEffect: https://vuejs.org/guide/essentials/watchers.html#watcheffect
// Watch effect runs instantly and constantly watches for changes!
watchEffect(async () => {
  const response = cryptoStore.toCrypto;
  chosenCrypto.crypto = response;
});
watch(
  () => cryptoStore.toCrypto,
  (current, prevToCrypto) => {
    if (current.swapReturn || !0) {
      tradeQuantity.value = current.swapReturn;
    }
  },
  { deep: true }
);
const modalActive = ref(false);
const tradeQuantity = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCrypto = (data) => {
  chosenCrypto.crypto = data;
  cryptoStore.toCrypto = data;
  toggleModal();
};
</script>
