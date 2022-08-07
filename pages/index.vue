<template>
  <div>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <Sidebar />
    <b-card-group columns>
      <b-card
        v-for="product in $allProducts"
        :key="product.id"
        :title="product.title"
        :img-src="product.image"
        img-top
      >
        <b-card-text>
          {{ product.description }}
        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated {{ generateRandomMinutes() }} mins ago</small>
        </template>
        <b-button :href="`/product/${product.id}`" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",

  computed: {
    $allProducts() {
      return this.$store.getters.$allProducts;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    generateRandomMinutes() {
      return Math.floor(Math.random() * 60);
    },
  },
});
</script>
