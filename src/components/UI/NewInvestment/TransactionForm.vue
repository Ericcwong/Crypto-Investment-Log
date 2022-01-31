<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2">
    <!-- User input -->
    <form action="" class="flex flex-col w-full text-lg">
      <label for="price-per-coin">Current Price Per Coin</label>
      <input
        type="number"
        v-model="data.price"
        @input="calcTotal"
        class="border-2 border-gray-500"
      />
      <label for="price-per-coin">Quantity</label>
      <input
        type="number"
        v-model="data.quantity"
        @input="calcTotal"
        class="border-2 border-gray-500"
      />
      <div class="" v-if="transaction === 'Buy'">
        <label for="purchase">Purchase Date:</label>
        <input :value="data.date" type="date" id="purchase" name="purchase" />
      </div>
      <div class="" v-if="transaction === 'Sell'">
        <label for="purchase">Sell Date:</label>
        <input v-model="data.date" type="date" id="sell" name="Sell" />
      </div>
    </form>
    <div class="flex flex-col items-center justify-center text-xl">
      <p v-if="transaction === 'Buy'">Total Spent</p>
      <p v-else-if="transaction === 'Sell'">Total Received</p>
      <span> ${{ data.total }}</span>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
const props = defineProps({
  price: Number,
  transaction: String,
});
const emit = defineEmits(["change"]);
const data = reactive({
  date: null,
  price: props.price,
  quantity: 1,
  total: null,
  transaction: props.transaction,
});

// Calculates the total when the component loads in. Or else it would just be blank.
onMounted(() => {
  calcTotal();
});
// Calculation the total cost
const calcTotal = () => {
  const total = data.price * data.quantity;
  data.total = total.toFixed(2);
  emit("change", data);
};
</script>
