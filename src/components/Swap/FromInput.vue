<template>
  <label for="from">From</label>
  <div class="flex border-2 p-4 rounded-lg">
    <input
      class="w-full text-3xl bg-slate-600"
      placeholder="0.00"
      mode="decimal"
      v-model="tradeQuantity"
      :minFractionDigits="2"
      @input="checkAmount"
    />
    <div class="flex flex-col">
      <button @click="toggleModal">
        <div class="flex items-center">
          <img
            class="w-7"
            v-if="chosenCrypto.crypto"
            :src="chosenCrypto.crypto.icon"
            alt="icon"
          />
          <div class="flex items-center pl-2 pr-3">
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
  <span v-if="overQuantity" class="text-red-400"
    >Amount exceeds over quantity amount!
  </span>

  <Modal @close="toggleModal" :modalActive="modalActive">
    <CryptoList @changeCrypto="changeCrypto" />
  </Modal>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import InputNumber from "primevue/inputnumber";
import Modal from "@/components/UI/Modal/index.vue";
import Button from "@/components/UI/Button.vue";
import CryptoList from "./CryptoList.vue";
import { useCryptoStore } from "../../stores/cryptos";
const cryptoStore = useCryptoStore();

const emit = defineEmits(["updateCrypto", "updateTradeQuantity"]);
console.log(cryptoStore.userCryptos);
const chosenCrypto = reactive({
  crypto: computed(() => {
    return cryptoStore.userCryptos[0];
  }),
});
const tradeQuantity = ref(null);
const overQuantity = ref(false);
const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCrypto = (data) => {
  chosenCrypto.crypto = data;
  toggleModal();
};
const half = () => {
  console.log(chosenCrypto.crypto);
  console.log(tradeQuantity.value);
  tradeQuantity.value = chosenCrypto.crypto.total_quantity / 2;
};
const max = () => {
  tradeQuantity.value = chosenCrypto.crypto.total_quantity;
};
const checkAmount = () => {
  console.log(tradeQuantity.value);
  console.log(chosenCrypto.crypto.total_quantity);
  if (tradeQuantity.value <= chosenCrypto.crypto.total_quantity) {
    overQuantity.value = false;
  } else {
    overQuantity.value = true;
  }
};
</script>
