<template>
  <div class="flex items-center justify-center text-white bg-gray-800 mt-5">
    <h1 class="text-2xl">Goal</h1>
  </div>
  <div class="grid sm:grid-cols-1 md:grid-cols-2">
    <form action="" class="flex flex-col text-xl">
      <label for="price-per-coin">Price Per Coin</label>
      <input
        type="number"
        v-model="goal.price"
        @input="calcGoal"
        class="border-2 border-gray-500"
      />
    </form>

    <div class="flex flex-col text-center">
      <p>Market cap value ${{ goal.marketcap }}</p>
      <p>Difference required ${{ goal.marketcapDifference }}</p>
      <p>Percentage {{ goal.marketcapPercentage }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps({
  data: Object,
});
const emit = defineEmits(["change"]);
const goal = reactive({
  price: null,
  quantity: 0,
  marketcap: null,
  marketcapDifference: null,
  marketcapPercentage: null,
});
// Calculates all the data
const calcGoal = () => {
  // What the marketcap needs to hit to get the price
  const marketcapValue = goal.price * props.data.circulating_supply;
  goal.marketcap = marketcapValue.toLocaleString();
  // Waits for marketValue to update. Then calculates the needed remaining amount to hit the desired amount.
  if (marketcapValue !== 0) {
    const marketcapDifference = marketcapValue - props.data.market_cap;
    const marketcapPercentage =
      (marketcapDifference / props.data.market_cap) * 100;
    goal.marketcapPercentage = marketcapPercentage.toFixed(3);
    goal.marketcapDifference = marketcapDifference.toLocaleString();
    emit("change", goal);
  } else {
    return (goal.marketcapDifference = 0), (goal.marketcapPercentage = 0);
  }
};
</script>
