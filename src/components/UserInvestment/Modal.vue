<template>
  <div class="flex justify-evenly">
    <p>Current investments</p>
    <!-- New Investment Modal -->
    <button
      class="text-white rounded bg-gray-500 px-3"
      @click.prevent="openModal()"
    >
      New Investment
    </button>
    <Teleport to="body">
      <!-- Background when modal is clicked -->
      <div
        class="
          modal-background
          fixed
          bg-gray-500 bg-opacity-50
          w-full
          h-screen
          inset-0
        "
      >
        <div class="flex justify-center items-center pt-24">
          <div class="modal bg-white shadow-xl w-1/2 p-4">
            <NewInvestment v-if="newInvestment" />
          </div>
        </div>
      </div>

      <Table />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewInvestment from "./NewInvestment.vue";
import Table from "./Table.vue";

const newInvestment = ref(true);
const openModal = (event) => {
  console.log("Clicked button");
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  newInvestment.value = !newInvestment.value;
};
</script>

<style></style>
