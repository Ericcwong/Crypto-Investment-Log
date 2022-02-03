<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Coin</th>
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
        <td class="text-center">${{ crypto.average_price }}</td>
        <td class="text-center">{{ crypto.total_quantity }}</td>
        <td class="text-center">${{ crypto.current_price }}</td>
        <td class="text-center">${{ crypto.profit_loss }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, onMounted, computed, watch, ref } from "vue";
import { loadInvestments } from "@/firebase/database.js";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
// Watches for prop changes. Props are reactive but this component does not see it without watch.

// const userCryptos = ref(store.getters["cryptos/getState"]);
const userCryptos = computed(() => store.getters["cryptos/getState"]);

const routeTo = (name) => {
  router.push({
    path: `/user/${name}`,
  });
};
// console.log(store.state.cryptos.userCryptos);
</script>
