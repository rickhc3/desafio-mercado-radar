<template>
  <div>
    <main class="mt-5">
      <div class="container mt-3">
        <!-- Gallery + details-->
        <div class="bg-light shadow-lg rounded-3 px-4 py-3 mb-5">
          <div class="px-lg-3">
            <h1 class="h3 mb-0">{{ $store.getters.$product.title }}</h1>

            <div class="row">
              <!-- Product gallery-->
              <div class="col-lg-7 pe-lg-0 pt-lg-4">
                <b-img :src="$store.getters.$product.image" fluid></b-img>
              </div>
              <!-- Product details-->
              <div class="col-lg-5 pt-4 pt-lg-0">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <span
                      class="
                        d-inline-block
                        fs-sm
                        text-body
                        align-middle
                        mt-1
                        ms-1
                      "
                    >
                      {{ $store.getters.$rating.count }} Reviews <br />Avaliação média dos clientes:
                      <b-form-rating
                        v-model="$store.getters.$rating.rate"
                        readonly
                        show-value
                        show-value-max
                        no-border
                      ></b-form-rating>
                    </span>
                  </div>
                  <b-button class="btn-wishlist me-0 me-lg-n3" type="button" @click="addFavorite($store.getters.$product)">
                    <b-icon
                    icon="heart-fill"
                    v-if="checkFavorite($store.getters.$product)"
                  ></b-icon>
                  <b-icon icon="heart" v-else></b-icon>
                  </b-button>
                </div>
                <div class="mb-3">
                  <span
                    class="h3 fw-normal text-accent me-1"
                    v-if="$store.getters.$product.price"
                    >{{ `${formatMoney($store.getters.$product.price)}` }}</span
                  >
                  <hr />
                  <p class="fs-sm text-muted pb-2">
                    {{ $store.getters.$product.description }}
                  </p>
                  <b-button
                    @click="addToCart($store.getters.$product)"
                    variant="primary"
                    block
                  >
                    Adicionar ao Carrinho
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="container py-5 my-md-3">
        <h2 class="h3 text-center pb-4">Você também pode gostar de...</h2>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Product } from "@/models/Product";

export default Vue.extend({
  head() {
    return {
      title: this.$store.getters.$product.title,
    };
  },
  computed: {
    $products() {
      return this.$store.getters.$product;
    },
  },
  mounted() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  methods: {
    generateRandomMinutes() {
      return Math.floor(Math.random() * 60);
    },
    formatMoney(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
    fetchRandomProduct() {
      this.$store.dispatch("fetchProduct", Math.floor(Math.random() * 10));
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
      console.log(product);
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
