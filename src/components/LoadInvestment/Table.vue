<!-- 
 --- A table to display user's investments.
 -->
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  Coin
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  Holdings
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  Average Price
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  Current Price
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  Profit/Loss
                </th>

                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-200">
              <tr v-for="crypto in userCryptos" :key="crypto.collection">
                <td>
                  <div
                    class="flex px-6 items-center py-4 whitespace-nowrap text-sm text-gray-200"
                  >
                    <img
                      class="w-8 rounded-full"
                      :src="crypto.icon"
                      :alt="`${crypto.collection} icon`"
                    />
                    <span class="capitalize">{{ crypto.collection }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  ${{ crypto.total_price.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  ${{ crypto.average_price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  {{ crypto.total_quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  ${{ crypto.current_price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                  ${{ crypto.profit_loss }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="routeTo(crypto.collection)"
                    class="text-indigo-400 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/*
 * Pulls user crypto data from store/cryptos/getState and displays it to the DOM.
 * Route user to pages/user/CryptoDetail once clicked on the specific crypto.
 */
import { useCryptoStore } from "../../stores/cryptos";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const cryptoStore = useCryptoStore();
const router = useRouter();
const userCryptos = computed(() => {
  return cryptoStore.userCryptos;
});
const routeTo = (name) => {
  router.push({
    path: `/user/${name}`,
  });
};
</script>
