<template>
  <b-container class="my-4">
    <b-form-input
      size="sm"
      class="mr-sm-2"
      placeholder="Pesquisar produtos"
      v-model="search"
    ></b-form-input>
    <div
      class="row d-flex justify-content-center"
      v-for="i in Math.ceil($allProducts.length / 4)"
      :key="i"
    >
      <b-card-group deck class="my-2">
        <b-card
          v-for="(product, i) in $allProducts.slice((i - 1) * 4, i * 4)"
          :key="i"
          :title="product.title"
        >
          <template>
            <div class="my-auto">
              <a :href="`/product/${product.id}`">
                <b-card-img
                  :src="product.image"
                  :alt="alt"
                  @load="loaded = true"
                  v-show="loaded"
                  fluid
                />
                <b-spinner v-show="loaded == false || error" />
              </a>
            </div>
          </template>

          <template #footer>
            <p class="h3 text-center">{{ formatMoney(product.price) }}</p>
            <div class="text-center">
              <b-button-group size="sm">
                <b-button @click="addToCart(product)" block variant="success "
                  >Adicionar ao Carrinho</b-button
                >
                <b-button
                  @click="addFavorite(product)"
                  size="sm"
                  variant="danger"
                  v-b-tooltip.hover
                  title="Marcar como favorito"
                >
                  <b-icon
                    icon="heart-fill"
                    v-if="checkFavorite(product)"
                  ></b-icon>
                  <b-icon icon="heart" v-else></b-icon>
                </b-button>
              </b-button-group>
            </div>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Product } from "@/models/Product";

export default Vue.extend({
  data() {
    return {
      search: "",
      loaded: false,
      error: false,
    };
  },
  computed: {
    $allProducts() {
      return this.$store.getters.$allProducts.filter((product: Product) => {
        return product.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
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
        toaster: "b-toaster-top-right",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },

    addFavorite(product: Product) {
      if (this.checkFavorite(product)) {
        this.$store.dispatch("removeFromWishlist", product);
        this.$bvToast.toast(`${product.title} removido dos favoritos`, {
          title: "Produto removido dos Favoritos",
          autoHideDelay: 2000,
          appendToast: true,
          variant: "danger",
          toaster: "b-toaster-top-right",
        });
      } else {
        this.$store.dispatch("addToWishlist", product);
        this.$bvToast.toast(`${product.title} adicionado aos favoritos`, {
          title: "Produto Adicionado aos Favoritos",
          autoHideDelay: 2000,
          appendToast: true,
          variant: "success",
          toaster: "b-toaster-top-right",
        });
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(this.$store.getters.$wishlist)
      );
    },

    checkFavorite(product: Product) {
      return this.$store.getters.$wishlist.includes(product);
    },
  },
});
</script>

<style scoped>
.card-img,
.card-img-top {
  padding: 10px;
}

.card-header {
  background-color: #fff;
}
</style>