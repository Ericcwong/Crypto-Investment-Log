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
    </div>
  </div>
  <!-- {{ state.data }} -->
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { deleteInvestment } from "@/firebase/database.js";

const router = useRouter();
// const route = useRoute();

const store = useStore();
const state = reactive({
  name: "",
  docID: "",
  data: null,
});
onMounted(() => {
  state.name = "";
  state.data = null;
  const route = useRoute();
  state.name = route.params.id;
  getCrypto();
});
watch(
  () => store.state.cryptos.userCryptos,
  (first, second) => {
    // console.log("First", second);
    state.userCryptos = first;
    getCrypto();
  }
);
const getCrypto = async () => {
  const storeState = await store.state.cryptos.userCryptos;
  const docIDS = await store.state.cryptos.userCryptosID;
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
</script>

<style scoped></style>
