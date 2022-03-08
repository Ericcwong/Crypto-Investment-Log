<!-- 
  Displays user's available assets to swap.
 -->

<template>
  <div
    class="h-full overflow-y-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-900"
  >
    <table class="w-full text-white divide-y divide-gray-200">
      <thead class="min-w-full">
        <tr>
          <th class="text-xl text-left">Coin</th>
          <th class="text-xl">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover:bg-slate-300 hover:cursor-pointer"
          v-for="(userCrypto, index) in userCryptos"
          :key="index"
          @click="chooseCrypto(userCrypto)"
        >
          <td class="flex items-center py-2">
            <img
              class="w-12 rounded-full"
              :src="userCrypto.icon"
              :alt="`${userCrypto.collection} icon`"
            />
            <span class="flex justify-center capitalize">{{
              userCrypto.collection
            }}</span>
          </td>
          <td class="text-center py-2">
            {{ userCrypto.total_quantity }}
          </td>
        </tr>
      </tbody>

      <!-- <Button>Add another crypto</Button> -->
    </table>
  </div>
</template>

<script setup>
import { useCryptoStore } from "../../stores/cryptos";
import { computed, onMounted } from "vue";
const emit = defineEmits(["changeCrypto"]);
const cryptoStore = useCryptoStore();
let userCryptos = computed(() => cryptoStore.getUserCrypto);
const chooseCrypto = (data) => {
  emit("changeCrypto", data);
};
</script>

<style scoped></style>
