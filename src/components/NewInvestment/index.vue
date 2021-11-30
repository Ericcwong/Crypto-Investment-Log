<template>
  <form>
    <div class="input-container">
      <input
        type="text"
        placeholder="Name"
        v-model="investment.cryptoName"
        @input="filterData"
      />
      <font-awesome-icon class="icon" icon="search" />
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
const filterData = () => {
  // User inputs will filter through Vuex state to find the crypto by ID or Symbol
  // Stores data retrieved into matches
  let name = investment.cryptoName;
  let getCrypto = store.getters.getCryptoByName(name);
  investment.matches = getCrypto;
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

.options {
  display: flex;
  justify-content: space-around;
}
</style>
