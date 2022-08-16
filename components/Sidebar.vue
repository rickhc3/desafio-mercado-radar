<template>
  <div>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow backdrop>
      <div class="px-3 py-2">
        <h4>Carrinho</h4>
        <div class="list-group">
          <div
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
            "
            v-for="product in $store.getters.$cart"
            :key="product.id"
          >
            <b-button
              @click="removeFromCart(product)"
              variant="danger"
              size="sm"
              class="mr-2"
            >
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
            </b-button>
            <b-img :src="product.image" class="mr-3" width="30" height="30" />
            <span>
              {{ product.title }}
            </span>
            <span>
              {{ formatMoney(product.price) }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <b-button @click="$store.dispatch('emptyCart')" variant="danger">
            Limpar Carrinho
          </b-button>

          <b-button
            :href="`/cart/${$store.getters.$cart.length}`"
            variant="primary"
            class="ml-2"
          >
            Ver Carrinho
          </b-button>
        </div>
        <div class="text-right">
          <span>
            Total do Carrinho:
            {{ formatMoney($store.getters.$cartTotal) }}
          </span>
          <span>
            Taxa: {{ formatMoney(tax5Percent($store.getters.$cartTotal)) }}
          </span>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script lang="ts">
import { Product } from "@/models/Product";

export default {
  computed: {
    $cart(): Product[] {
      return this.$store.getters.$cart;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    generateRandomMinutes() {
      return Math.floor(Math.random() * 60);
    },

    tax5Percent(price: number) {
      return (price / 100) * 0.5;
    },

    formatMoney(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    addToCart(product: Product) {
      this.$store.dispatch("addToCart", product);
      console.log(product);
      console.log(this.$store.getters.$cart);
    },
    removeFromCart(product: Product) {
      this.$store.dispatch("removeFromCart", product);
    },
  },
};
</script>
