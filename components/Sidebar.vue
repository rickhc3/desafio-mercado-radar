<template>
  <div>
    <b-sidebar id="sidebar-cart" title="Carrinho" right shadow backdrop>
      <div class="p-2 my-2">
        <div class="list-group" v-if="$store.getters.$cart.length > 0"
>
          <div
            class="
              list-group-item
              d-flex
              justify-content-center
              align-items-center
              my-2
            "
            v-for="(product, i) in $store.getters.$cart"
            :key="i"
          >
            <div class="d-flex flex-column">
              <div class="d-flex justify-content-between">
                <b-img
                  :src="product.image"
                  class="mr-2"
                  width="50"
                  height="50"
                />

                <span>{{ product.title }}</span>
                <span>{{ formatMoney(product.price) }}</span>
              </div>
              <div class="d-flex justify-content-end">
                <b-button variant="danger" @click="removeFromCart(product, i)" size="sm">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center" v-else>
          <h5>Nenhum produto no carrinho</h5>
        </div>
        <div v-if="$store.getters.$cart.length > 0">
          <hr>
        <div class="text-left">
          <span>
            <b>Total do Carrinho</b>:
            {{ formatMoney($store.getters.$cartTotal) }}
          </span> <br>
          <span>
            <b>Imposto</b>: {{ formatMoney(tax5Percent($store.getters.$cartTotal)) }}
          </span>
          <span><br>
            <b>Total com Imposto</b>:
            {{ formatMoney(totalWithTax($store.getters.$cartTotal)) }}
          </span>
        </div>
        <hr>
        <div class="text-center">
          <b-button @click="$store.dispatch('emptyCart')" variant="danger">
            Limpar Carrinho
          </b-button>

          <b-button :href="`/cart`" variant="primary" class="ml-2">
            Ver Carrinho
          </b-button>
        </div>
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

  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit(
        "SET_PRODUCTS_CART",
        JSON.parse(localStorage.getItem("cart") as string)
      );
    }

    if (localStorage.getItem("wishlist")) {
      this.$store.commit(
        "SET_PRODUCTS_WISHLIST",
        JSON.parse(localStorage.getItem("wishlist") as string)
      );
    }
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    generateRandomMinutes() {
      return Math.floor(Math.random() * 60);
    },

    tax5Percent(price: number) {
      return (price / 100) * 5;
    },

    totalWithTax(price: number) {
      return price + this.tax5Percent(price);
    },

    formatMoney(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    removeFromCart(product: Product, i: number) {
      this.$store.dispatch("removeFromCart", i);
      this.$bvToast.toast(`${product.title} removido do carrinho`, {
        title: "Produto Removido",
        autoHideDelay: 2000,
        appendToast: true,
        variant: "success",
        toaster: "b-toaster-top-center",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },
  },
};
</script>
