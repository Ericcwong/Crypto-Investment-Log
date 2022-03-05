<template>
  <div class="" v-if="state.data !== null">
    <div class="header flex items-center">
      <h1 class="text-3xl capitalize">{{ state.name }}</h1>
      <img class="w-20" :src="state.data.icon" alt="" />
      <button @click="deleteDocument">Delete Document</button>
    </div>
    <!-- {{ state }} -->

    <div class="" v-for="(transaction, index) in state.data.data" :key="index">
      {{ transaction }}
      <button @click="deleteData(index)">{{ index }}</button>
    </div>
  </div>
  <!-- {{ state.data }} -->
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, watch } from "vue";
import { useCryptoStore } from "../../stores/cryptos";
import { deleteInvestment, deleteTransaction } from "@/firebase/database.js";

const router = useRouter();
// const route = useRoute();

const cryptoStore = useCryptoStore();
const state = reactive({
  name: "",
  docID: "",
  data: null,
});
onMounted(() => {
  // state.name = "";
  // state.data = null;
  const route = useRoute();
  state.name = route.params.id;
  getCrypto();
});
watch(
  () => cryptoStore.userCryptos,
  (first, second) => {
    console.log("First", first);

    // console.log(data);
    // state.data = data;
    getCrypto();
  }
);
const getCrypto = async () => {
  const storeState = cryptoStore.userCryptos;
  const docIDS = cryptoStore.userCryptosID;
  let data = storeState.find((crypto) => crypto.collection === state.name);
  let findDocID = docIDS.find((id) => id.collection === state.name);
  console.log(findDocID);
  state.docID = findDocID.docID;
  state.data = { ...data };
};

const deleteDocument = () => {
  if (
    confirm(
      "Are you sure you want to delete this WHOLE investment? Cannot be undone."
    )
  ) {
    deleteInvestment(state.docID);
    router.push({
      path: "/",
    });
  }
};
const deleteData = async (data) => {
  const storeState = await cryptoStore.userCryptos;
  let crypto = storeState.find((crypto) => crypto.collection === state.name);
  crypto.data.splice(data, 1);
  deleteTransaction(state.docID, crypto.data);
};
</script>

<style scoped></style>
