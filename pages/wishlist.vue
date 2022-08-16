<template>
  <div>
    <Navbar />
    <Wishlist />
    <Footer />
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit("SET_CART", JSON.parse(localStorage.getItem("cart")));
    }

    if (localStorage.getItem("wishlist")) {
      this.$store.commit(
        "SET_WISHLIST",
        JSON.parse(localStorage.getItem("wishlist"))
      );
    }
  },

}
</script>

<style>

</style>