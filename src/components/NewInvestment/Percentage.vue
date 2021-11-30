<template>
  <label for="percentageGoal">Percentage Goal</label>
  <div class="buttons">
    <button
      class="button"
      v-for="(percentage, index) in buttonPercentage"
      :key="index"
      @click.prevent="percentageX"
    >
      {{ percentage }}%
    </button>
    <input type="number" placeholder="Custom Percentage" />
  </div>
</template>

<script setup>
const buttonPercentage = [5, 10, 20, 50, 100];

const percentageX = () => {
  const total = investment.percentageSlider / 10;
  investment.percentageGoal = total;
};
</script>

<style></style>
