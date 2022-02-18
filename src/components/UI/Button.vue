<template>
  <button class="text-white rounded bg-gray-500 p-2" @click="runFunction">
    <div class="flex justify-center items-center gap-1">
      <font-awesome-icon
        class="text-xl"
        v-if="Icon !== undefined"
        :icon="Icon"
      ></font-awesome-icon>
      <h4>{{ name }}</h4>
    </div>
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
