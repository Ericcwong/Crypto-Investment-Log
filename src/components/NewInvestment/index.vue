<template>
  <form>
    <div class="input-container">
      <input
        type="text"
        placeholder="Name"
        v-model="investment.cryptoName"
        @input="filterData"
        class="search-box"
      />
      <!-- <font-awesome-icon class="icon" icon="search" /> -->
      <div
        class="search-box"
        v-if="investment.matches !== null"
        v-for="match in investment.matches"
        :key="match.id"
      >
        <div
          @click.prevent="getCurrentPrice(match.current_price)"
          class="search-results"
        >
          <img class="search-image" :src="match.image" alt="" />
          <div class="name">
            <p>{{ match.name }}</p>
            <span>({{ match.symbol }})</span>
          </div>
          <span>#{{ match.market_cap_rank }}</span>
        </div>
      </div>
    </div>
    <input
      type="number"
      placeholder="Share Purchase price"
      v-model="investment.purchasePrice"
      @input="calcTotal"
    />
    <input
      type="number"
      placeholder="Amount of Shares"
      v-model="investment.shareAmount"
      @input="calcTotal"
    />
    <p>Total Amount Invested ${{ investment.total }}</p>
    <div class="options">
      <button>Short term investment</button>
      <span>or</span>
      <button>Long term investment</button>
    </div>
  </form>
  {{ investment.matches }}
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
const investment = reactive({
  cryptoName: "",
  purchasePrice: null,
  shareAmount: null,
  total: 0,
  matches: null,
});
onMounted(() => {
  retrieveData();
  filterData();
});
const retrieveData = async () => {
  // Checks if Vuex state is empty, if so call and update the data
  if (store.state.cryptos !== []) {
    console.log("Updating State");
    store.dispatch("loadCryptos");
  }
};
const filterData = async () => {
  // User inputs will filter through Vuex state to find the crypto by ID or Symbol
  // Stores data retrieved into matches
  let name = investment.cryptoName;
  let getCrypto = await store.getters.getCryptoByName(name);
  // Clear Matches after search
  if (name === "") {
    investment.matches = [];
  } else {
    console.log(getCrypto);
    investment.matches = getCrypto;
  }
};
const getCurrentPrice = (data) => {
  investment.purchasePrice = data;
  investment.matches = [];
};
const calcTotal = () => {
  const total = investment.purchasePrice * investment.shareAmount;
  investment.total = total.toFixed(2);
};
</script>

<style scoped>
form {
  display: grid;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 0.2rem;
  max-width: 35%;
  color: white;
}
input {
}
.input-container {
  position: relative;
}
.input-container input {
  width: 100%;
}
.input-container .icon {
  position: absolute;
  top: 10%;
  right: 0;
  margin-right: 10px;
}
.search-box {
  margin-bottom: 1.5rem;
}
.search-results {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  color: white;
  margin-bottom: 1rem;
  align-items: center;
  text-decoration: none;
}
.search-results:hover {
  cursor: pointer;
}
.name {
  display: flex;
}
.search-image {
  width: 2rem;
}
.options {
  display: flex;
  justify-content: space-around;
}
</style>
