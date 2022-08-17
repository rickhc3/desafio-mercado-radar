<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit(
        "SET_PRODUCTS_CART",
        JSON.parse(localStorage.getItem("cart") as string)
      );
    }
  },
});
</script>
