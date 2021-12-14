<template>
  <div class="relative">
    <button @click="isOpen = true">Open</button>
    <!-- Teleport is a Vue 3 feature. When the value of isOpen is set to true, the modal would be placed in the body element. Positioned with CSS -->
    <teleport to="body">
      <div
        class="
          modal
          absolute
          top-0
          left-0
          w-full
          h-full
          bg-background-blur
          flex
          justify-center
          items-center
        "
        v-if="isOpen"
        @click="isOpen = false"
      >
        <div class="bg-white p-12 border border-black">
          <h2>Modal test</h2>
          <button @click="isOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>

<style></style>
