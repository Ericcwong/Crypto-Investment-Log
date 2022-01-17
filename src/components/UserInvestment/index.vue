<template>
  <div class="flex justify-evenly">
    <p>Current investments</p>
    <button class="text-white rounded bg-gray-500 px-3">New Investment</button>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <NewInvestment />
    </Modal>
    <button @click="toggleModal" v-if="!modalActive">Open Modal</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/UI/Modal/index.vue";
import NewInvestment from "./NewInvestment.vue";
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<style></style>
