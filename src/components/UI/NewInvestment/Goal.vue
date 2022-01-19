<template>
  <h3>Goal</h3>
  <form action="" class="grid items-center justify-center text-xl">
    <label for="price-per-coin">Price Per Coin</label>
    <input
      type="number"
      v-model="goal.price"
      @input="calcGoal"
      class="border-2 border-gray-500"
    />
    <label for="price-per-coin">Quantity</label>
    <p>Market cap value ${{ goal.marketcap }}</p>
    <p>Difference required ${{ goal.marketcapDifference }}</p>
    <p>Percentage {{ goal.marketcapPercentage }}</p>
  </form>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps({
  data: Object,
});
const goal = reactive({
  price: null,
  quantity: 0,
  marketcap: null,
  marketcapDifference: null,
  marketcapPercentage: null,
});

const calcGoal = () => {
  const marketcapValue = goal.price * props.data.circulating_supply;
  goal.marketcap = marketcapValue.toLocaleString();

  if (marketcapValue !== 0) {
    const marketcapDifference = marketcapValue - props.data.market_cap;
    const marketcapPercentage =
      (marketcapDifference / props.data.market_cap) * 100;
    console.log(marketcapPercentage);
    goal.marketcapPercentage = marketcapPercentage.toFixed(3);
    // console.log(marketcapDifference);
    goal.marketcapDifference = marketcapDifference.toLocaleString();
  } else {
    return (goal.marketcapDifference = 0), (goal.marketcapPercentage = 0);
  }
};
</script>
