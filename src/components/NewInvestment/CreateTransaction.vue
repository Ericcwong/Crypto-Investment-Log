<template>
  <div v-if="crypto !== null" class="text-white">
    <!-- Header -->
    <div class="flex items-center justify-center">
      <img :src="crypto.image" alt="" class="w-12" />
      <h1 class="text-4xl">{{ crypto.name }}</h1>
    </div>
    <!-- <h2 class="text-center">Add Transaction... (Portfolio future upgrade)</h2> -->
    <!-- Buy Sell Transfer buttons -->
    <span
      class="justify-center relative z-0 inline-flex shadow-sm rounded-md w-full mt-3"
    >
      <button
        type="button"
        class="relative inline-flex items-center px-4 py-2 rounded-l-md border w-1/3 justify-center border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        @click="transaction('Buy')"
      >
        Buy
      </button>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center px-4 py-2 border w-1/3 justify-center border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        @click="transaction('Sell')"
      >
        Sell
      </button>
      <button
        type="button"
        class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border w-1/3 justify-center border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        @click="transaction('Swap')"
      >
        Swap
      </button>
    </span>
    <TransactionForm
      :price="crypto.current_price"
      :transaction="transactionType.trans"
      @change="updateData"
    />
    <Goal @change="updateGoal" :data="data" />
  </div>
  <Button @runFunction="createInvestment" name="Submit" />
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { addInvestment } from "@/firebase/database.js";
import Button from "@/components/UI/Button.vue";
import TransactionForm from "./TransactionForm.vue";
import Goal from "./Goal.vue";
const props = defineProps({
  crypto: Object,
});
const data = props.crypto;
const coinData = reactive({
  collection: props.crypto.id,
  symbol: props.crypto.symbol,
  transaction_data: null,
  goal: null,
  icon: props.crypto.image,
});
const transactionType = reactive({ trans: "Buy" });
// Both updateData and updateGoal update state whenever the components data changes.
const updateData = (event) => {
  coinData.transaction_data = event;
};
const updateGoal = (event) => {
  coinData.goal = event;
};
// Checks what kind of transaction was taken place. Exp: Buy, Sell, Transfer
const transaction = (data) => {
  transactionType.trans = data;
};
// addInvestment comes from firebase file
const createInvestment = () => {
  addInvestment(coinData);
};
</script>
