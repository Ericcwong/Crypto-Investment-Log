<template>
  <button class="text-white rounded bg-gray-500 px-3" @click="runFunction">
    <font-awesome-icon
      v-if="Icon !== undefined"
      :icon="Icon"
    ></font-awesome-icon>
    {{ name }}
  </button>
</template>

<script setup>
/* Button component requires the parent component to have @runFunction following
 ** the function name. Example: Parent: @runFunction = "toggleModal"
 */
const props = defineProps({
  name: String,
  Icon: null,
});
const emit = defineEmits(["runFunction"]);
const runFunction = (data) => {
  emit("runFunction");
};
</script>

<style scoped></style>
