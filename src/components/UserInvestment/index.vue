<template>
  <div class="flex justify-evenly">
    <p>Current investments</p>
    <!-- New Investment Modal -->
    <button
      class="text-white rounded bg-gray-500 px-3"
      @click.prevent="newInvestment = !newInvestment"
    >
      New Investment
    </button>
    <NewInvestment v-if="newInvestment" />
  </div>
  <Table />
</template>

<script setup>
import { ref } from "vue";
import NewInvestment from "./NewInvestment.vue";
import Table from "./Table.vue";
const newInvestment = ref(false);
</script>

<style></style>
