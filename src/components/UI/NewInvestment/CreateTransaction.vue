<template>
  <div v-if="crypto !== null" class="border">
    <div class="flex items-center justify-center">
      <img :src="crypto.image" alt="" class="w-12" />
      <h1 class="text-4xl">{{ crypto.name }}</h1>
    </div>
    <h2 class="text-center">Add Transaction... (Portfolio future upgrade)</h2>
    <!-- Buy Sell Transfer buttons -->
    <div class="flex justify-evenly bg-gray-800 p-4">
      <button
        @click="transaction(trans.name)"
        v-for="trans in transactions"
        class="text-xl text-white"
      >
        {{ trans.name }}
      </button>
    </div>
    <!-- User input -->
    <form action="" class="grid items-center justify-center text-xl">
      <label for="price-per-coin">Current Price Per Coin</label>
      <input
        type="number"
        v-model="coinData.price"
        @input="calcTotal"
        class="border-2 border-gray-500"
      />
      <label for="price-per-coin">Quantity</label>
      <input
        type="number"
        v-model="coinData.quantity"
        @input="calcTotal"
        class="border-2 border-gray-500"
      />
      <div class="" v-if="coinData.transaction === 'Buy'">
        <p>Total Spent</p>
        ${{ coinData.total }}
      </div>
      <div class="" v-else-if="coinData.transaction === 'Sell'">
        <p>Total Received</p>
        ${{ coinData.total }}
      </div>
      <div class="" v-else>{{ coinData.transaction }}</div>
    </form>
    <Goal :data="data" />
    <div class="flex justify-end">
      <button
        @click.prevent="createInvestment"
        class="border p-2 bg-gray-500 text-white rounded-2xl mr-10"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { addInvestment } from "@/firebase/database.js";
import Goal from "./Goal.vue";
const props = defineProps({
  crypto: Object,
});
const data = props.crypto;
const coinData = reactive({
  price: props.crypto.current_price,
  quantity: 1,
  transaction: "Buy",
  total: null,
});
const transactions = ref([
  { name: "Buy" },
  { name: "Sell" },
  { name: "Transfer" },
]);
// Calculates the total when the component loads in. Or else it would just be blank.
onMounted(() => {
  calcTotal();
});
// Calculation the total cost
const calcTotal = () => {
  const total = coinData.price * coinData.quantity;
  coinData.total = total.toFixed(2);
};
// Checks what kind of transaction was taken place. Exp: Buy, Sell, Transfer
const transaction = (data) => {
  coinData.transaction = data;
  calcTotal();
};
// addInvestment comes from firebase file
const createInvestment = () => {
  addInvestment(coinData);
};
</script>
