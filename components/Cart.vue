<template>
  <div>
    <h4>Carrinho</h4>
    <div class="container">
      <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in $cart">
                <td>
                  <span>
                    {{ product.title }}
                  </span>
                </td>
                <td>
                  <span>
                    {{ formatMoney(product.price) }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="removeFromCart(product)"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/models/Product";
export default {
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit("SET_CART", JSON.parse(localStorage.getItem("cart")));
    }
  },

  methods: {
    formatMoney(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    removeFromCart(product: Product) {
      this.$store.dispatch("removeFromCart", product);
      this.$bvToast.toast(`${product.title} removido do carrinho`, {
        title: "Produto Removido",
        autoHideDelay: 2000,
        appendToast: true,
        variant: "success",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },
  },

  computed: {
    $cart(): Product[] {
      return this.$store.getters.$cart;
    },
  },
};
</script>

<style>
</style>