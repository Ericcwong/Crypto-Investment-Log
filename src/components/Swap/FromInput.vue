<template>
  <div class="input-container">
    <label for="from">From</label>
    <div class="flex border-2 p-2 rounded-lg">
      <input
        class="w-4/5 text-3xl bg-inherit mr-2"
        placeholder="0.00"
        type="number"
        mode="decimal"
        v-model="tradeQuantity"
        :minFractionDigits="2"
        @input="checkAmount"
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
    <span v-if="overQuantity" class="text-red-400"
      >Amount exceeds over quantity amount!
    </span>

    <Modal @close="toggleModal" :modalActive="modalActive">
      <CryptoList @changeCrypto="changeCrypto" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import InputNumber from "primevue/inputnumber";
import Modal from "@/components/UI/Modal/index.vue";
import Button from "@/components/UI/Button.vue";
import CryptoList from "./CryptoList.vue";
import { useCryptoStore } from "../../stores/cryptos";
const cryptoStore = useCryptoStore();

const emit = defineEmits(["amountPass"]);
console.log(cryptoStore.userCryptos);
const chosenCrypto = reactive({
  crypto: null,
});
// Vue documentation for watchEffect: https://vuejs.org/guide/essentials/watchers.html#watcheffect
// Watch effect runs instantly and constantly watches for changes!
watchEffect(async () => {
  const response = cryptoStore.fromCrypto;
  chosenCrypto.crypto = response;
});
const tradeQuantity = ref(null);
const overQuantity = ref(false);
const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
const changeCrypto = (data) => {
  chosenCrypto.crypto = data;
  cryptoStore.fromCrypto = data;
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
    emit("amountPass", overQuantity.value);
  } else {
    overQuantity.value = true;
    emit("amountPass", overQuantity.value);
  }
};
</script>
