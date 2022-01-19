<template>
  <div v-if="crypto !== null" class="border">
    <div class="flex items-center">
      <img :src="crypto.image" alt="" class="w-12" />
      <h1 class="text-4xl">{{ crypto.name }}</h1>
    </div>
    <h2 class="text-center">Add Transaction... (Portfolio future upgrade)</h2>
    <!-- Buy Sell Transfer buttons -->
    <div class="flex justify-evenly">
      <button
        @click="transaction(trans.name)"
        v-for="trans in transactions"
        class="text-xl"
      >
        {{ trans.name }}
      </button>
    </div>
    <!-- User input -->
    <form action="" class="grid items-center justify-center text-xl">
      <label for="price-per-coin">Price Per Coin</label>
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
        Total Received
        {{ coinData.transaction }}
      </div>
      <div class="" v-else>{{ coinData.transaction }}</div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  crypto: Object,
});
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
const calcTotal = () => {
  const total = coinData.price * coinData.quantity;
  coinData.total = total.toFixed(2);
};
const transaction = (data) => {
  coinData.transaction = data;
  calcTotal();
};
</script>
