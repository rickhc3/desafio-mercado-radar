<template>
  <div>
    <Navbar />
    <Header />
    <Products />
    <Footer />
  </div>
</template>

<script lang="ts">

export default ({
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit("SET_CART", JSON.parse(localStorage.getItem("cart")));
    }
  },
});
</script>
