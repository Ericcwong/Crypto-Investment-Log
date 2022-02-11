<!-- Displays user's crypto data -->
<template>
  <div class="flex">
    <div class="basis-1/2">
      <h2 class="text-2xl">Your investments</h2>
      <div class="grid gap-4">
        <Table />
      </div>
    </div>
    <div class="basis-1/2">Pie chart/graph area</div>
  </div>
</template>

<script setup>
import Table from "./Table.vue";
</script>
