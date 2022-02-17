<!-- 
 --- A table to display user's investments.
 -->
<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Coin</th>
        <th>Holdings</th>
        <th>Average Price</th>
        <th>Quantity</th>
        <th>Current Price</th>
        <th>Profit/Loss</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="crypto.collection"
        class="hover:cursor-pointer"
        v-for="crypto in userCryptos"
        @click="routeTo(crypto.collection)"
      >
        <td>
          <div class="flex items-center">
            <img
              class="w-12"
              :src="crypto.icon"
              :alt="`${crypto.collection} icon`"
            />
            <span class="capitalize">{{ crypto.collection }}</span>
          </div>
        </td>
        <td class="text-center">${{ crypto.total_price }}</td>
        <td class="text-center">${{ crypto.average_price }}</td>
        <td class="text-center">{{ crypto.total_quantity }}</td>
        <td class="text-center">${{ crypto.current_price }}</td>
        <td class="text-center">${{ crypto.profit_loss }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
/*
 * Pulls user crypto data from store/cryptos/getState and displays it to the DOM.
 * Route user to pages/user/CryptoDetail once clicked on the specific crypto.
 */
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();

const userCryptos = computed(() => store.getters["cryptos/getState"]);

const routeTo = (name) => {
  router.push({
    path: `/user/${name}`,
  });
};
</script>
