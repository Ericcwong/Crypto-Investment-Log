<template>
  <div class="input-container">
    <label for="asset-2">To</label>
    <div class="flex border-2 p-4 rounded-lg">
      <input
        class="w-full text-3xl bg-slate-600"
        type="number"
        placeholder="0.00"
        v-model="tradeQuantity"
      />

      <div class="flex flex-col">
        <button @click="toggleModal">
          <div class="flex items-center">
            <img
              v-if="chosenCrypto.crypto"
              class="w-7"
              :src="chosenCrypto.crypto.icon"
              alt="icon"
            />
            <div class="flex items-center ml-2 mr-3">
              <span v-if="chosenCrypto.crypto" class="uppercase mr-1"
                >{{ chosenCrypto.crypto.symbol }}
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
    <Modal @close="toggleModal" :modalActive="modalActive">
      <CryptoList @changeCrypto="changeCrypto" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
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
  crypto: computed(() => {
    return cryptoStore.userCryptos[1];
  }),
});

const modalActive = ref(false);
const tradeQuantity = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCrypto = (data) => {
  chosenCrypto.crypto = data;
  toggleModal();
};
</script>
