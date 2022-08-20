<template>
  <div>
   <Header />
   <Products />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit("SET_PRODUCTS_CART", JSON.parse(localStorage.getItem("cart") as string));
    }
  },
  head() {
    return {
      title: 'Home - Desafio Mercado Radar',
    };
  },
});
</script>
