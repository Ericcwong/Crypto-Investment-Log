<template>
  <div class="flex justify-evenly">
    <Button
      @runFunction="toggleModal"
      Icon="plus"
      name="New Investment"
    ></Button>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <NewInvestment />
    </Modal>
    <!-- <button @click="toggleModal" v-if="!modalActive">Open Modal</button> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/UI/Modal/index.vue";
import NewInvestment from "./NewInvestment.vue";
import Button from "@/components/UI/Button.vue";
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<style></style>
