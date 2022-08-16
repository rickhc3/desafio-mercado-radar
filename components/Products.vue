<template>
  <b-container class="my-4">
   
    <div class="row" v-for="i in Math.ceil($allProducts.length / 4)" :key="i">
      <div
        class="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 mt-3"
        v-for="product in $allProducts.slice((i - 1) * 4, i * 4)"
        :key="product.id"
      >
        <b-card-group>
          <b-card :img-src="product.image" img-top>
            <b-icon icon="circle-fill" animation="throb" font-scale="4" v-if="!product.image"></b-icon>
            <h6>{{ product.title }}</h6>
            Valor: {{ formatMoney(product.price) }}
            <template #footer>
              <div class="text-center">
                <b-button
                  :href="`/product/${product.id}`"
                  block
                  variant="primary"
                  >Ver Produto</b-button
                >

                <b-button @click="addToCart(product)" block variant="danger"
                  >Adicionar ao Carrinho</b-button
                >
              </div>
            </template>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Product } from "@/models/Product";

export default {
  computed: {
    $allProducts(): Product[] {
      return this.$store.getters.$allProducts;
    },
    $newAllProducts(): Product[] {
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

    tax5percent(price: number) {
      return price * 1.05;
    },
    formatMoney(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    addToCart(product: Product) {
      this.$store.dispatch("addToCart", product);
      this.$bvToast.toast(`${product.title} adicionado ao carrinho`, {
        title: "Produto Adicionado",
        autoHideDelay: 2000,
        appendToast: true,
        variant: "success",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },
  },
};
</script>

<style scoped>
.card-img,
.card-img-top {
  padding: 10px;
}
</style>