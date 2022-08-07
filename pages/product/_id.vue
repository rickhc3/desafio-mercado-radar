<template>
  <div>
    {{ $store.getters.$product }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    $products() {
      return this.$store.getters.$product;
    },
  },
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  methods: {
    generateRandomMinutes() {
      return Math.floor(Math.random() * 60);
    },
  },
});
</script>
