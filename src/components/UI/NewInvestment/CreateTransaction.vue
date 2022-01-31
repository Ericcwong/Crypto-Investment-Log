<template>
  <div v-if="crypto !== null" class="">
    <!-- Header -->
    <div class="flex items-center justify-center">
      <img :src="crypto.image" alt="" class="w-12" />
      <h1 class="text-4xl">{{ crypto.name }}</h1>
    </div>
    <h2 class="text-center">Add Transaction... (Portfolio future upgrade)</h2>
    <!-- Buy Sell Transfer buttons -->
    <div class="flex justify-evenly text-white bg-gray-800 p-4">
      <button
        @click="transaction(trans.name)"
        v-for="trans in transactions"
        class="text-xl"
      >
        {{ trans.name }}
      </button>
    </div>
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
  transaction_data: null,
  goal: null,
  icon: props.crypto.image,
});
const transactionType = reactive({ trans: "Buy" });
const transactions = ref([{ name: "Buy" }, { name: "Sell" }, { name: "Swap" }]);
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
