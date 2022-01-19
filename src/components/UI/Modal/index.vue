<!-- Modal when user clicks on new investment -->
<!-- Notes: Used for this component
  -- https://v3.vuejs.org/guide/migration/transition.html#_2-x-syntax
  -- https://www.youtube.com/watch?v=NFdvWBh-D6k
 -->
<template>
  <!-- Transitions are Vue animations for enter and leaving -->
  <transition name="modal-animation">
    <!-- Modal body -->
    <div
      v-show="modalActive"
      class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-gray-500"
    >
      <!-- Modal container -->
      <transition name="modal-animation-inner" v-show="modalActive">
        <!-- Modal Content -->
        <div
          v-show="modalActive"
          class="relative max-w-screen-sm h-4/6 w-5/6 bg-white p-16"
        >
          <font-awesome-icon
            @click="close"
            class="text-black absolute top-4 right-4 text-lg cursor-pointer hover:text-red-500"
            icon="times-circle"
          />
          <slot />
          <!-- <button class="absolute bottom-0" @click="close">Close</button> -->
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  modalActive: Boolean,
});
// Vue emit lets us emit, or send, custom events from a child component to its parent.
const emit = defineEmits(["close"]);
const close = (data) => {
  emit("close");
};
</script>

<style scoped>
/* enter-active and leave-active and the other all are coming from Vue's transitions property. 
The CSS is generated when the Vue state has been changed */
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
</style>
