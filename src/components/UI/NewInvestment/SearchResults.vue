<template>
  <div class="h-full overflow-y-auto">
    <div class="" v-for="match in matches" :key="match.id">
      <div
        @click="getMatch(match)"
        class="flex items-center hover: cursor-pointer"
      >
        <img class="w-12" :src="match.image" alt="" />
        <p>{{ match.name }}</p>
        <span class="uppercase">({{ match.symbol }})</span>
        <span>#{{ match.market_cap_rank }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  matches: Array,
});
const emit = defineEmits(["getPrice"]);
const getMatch = (data) => {
  console.log(data);
  emit("getPrice", data);
};
</script>

<style scoped></style>
