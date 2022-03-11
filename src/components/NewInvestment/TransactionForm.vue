<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2">
    <!-- User input -->
    <form action="" class="flex flex-col w-full text-lg">
      <label for="price-per-coin">Current Price Per Coin</label>
      <input
        type="number"
        v-model="data.price"
        @input="calcTotal"
        class="border-2 border-gray-500 text-black"
      />
      <label for="price-per-coin">Quantity</label>
      <input
        type="number"
        v-model="data.quantity"
        @input="calcTotal"
        class="border-2 border-gray-500 text-black"
      />
      <div class="" v-if="transaction === 'Buy'">
        <label for="purchase">Purchase Date:</label>
        <input
          :value="data.date"
          type="date"
          id="purchase"
          name="purchase"
          class="text-black"
        />
      </div>
      <div class="" v-if="transaction === 'Sell'">
        <label for="purchase">Sell Date:</label>
        <input
          v-model="data.date"
          type="date"
          id="sell"
          name="Sell"
          class="text-black"
        />
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
import { reactive, onMounted, toRefs, watch } from "vue";
const props = defineProps({
  price: Number,
  transaction: String,
});
// Watches for prop changes. Props are reactive but this component does not see it without watch.
watch(
  () => props.transaction,
  (first, second) => {
    // console.log("Watching props.transaction ", first, second);
    data.transaction_type = first;
  }
);
const emit = defineEmits(["change"]);
const data = reactive({
  date: null,
  price: props.price,
  quantity: 1,
  total: null,
  transaction_type: props.transaction,
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
