<template>
  <div class="">
    <h2>Your investments</h2>
    <div class="">
      <div class="grid gap-4">
        <div :class="crypto.collection" v-for="crypto in userCryptos">
          {{ crypto }}
          <router-link :to="`/user/${crypto.collection}`">
            <div
              class="header flex items-center justify-between border-gray-500 border-t-2 border-b-2"
            >
              <!-- Left side of row -->
              <div class="flex items-center">
                <img
                  class="w-12"
                  :src="crypto.icon"
                  :alt="`${crypto.collection} icon`"
                />
                <h4 class="capitalize">{{ crypto.collection }}</h4>
              </div>
              <!-- Right side of row -->
              <!-- <div class="flex">
                <p class="">
                  Average Purchase Price:
                  {{ crypto.data.averagePrice }}
                </p>
                <p class="">Quantity: {{ crypto.data.totalQuantity }}</p>
                <p class="">Current Price: {{ crypto.data.currentPrice }}</p>
                <p class="pr-10">
                  Profit or Loss {{ crypto.data.profit_loss }}
                </p>
              </div> -->
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, onMounted, computed, watch, ref } from "vue";
import { loadInvestments } from "@/firebase/database.js";
import axios from "axios";
const store = useStore();
// Watches for prop changes. Props are reactive but this component does not see it without watch.

// const userCryptos = ref(store.getters["cryptos/getState"]);
const userCryptos = computed(() => store.getters["cryptos/getState"]);
// console.log(store.state.cryptos.userCryptos);
</script>
