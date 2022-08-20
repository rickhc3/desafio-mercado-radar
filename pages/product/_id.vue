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
                  <a href="#reviews" data-scroll="">
                    <div class="star-rating">
                      <i class="star-rating-icon ci-star-filled active"></i
                      ><i class="star-rating-icon ci-star-filled active"></i
                      ><i class="star-rating-icon ci-star-filled active"></i
                      ><i class="star-rating-icon ci-star-filled active"></i
                      ><i class="star-rating-icon ci-star"></i>
                    </div>
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
                      {{ $store.getters.$rating.count }} Reviews / Nota Média:
                      {{ $store.getters.$rating.rate }}
                    </span></a
                  >
                  <b-button class="btn-wishlist me-0 me-lg-n3" type="button">
                    <b-icon icon="heart"></b-icon>
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
  computed: {
    $products() {
      return this.$store.getters.$product;
    },
  },
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
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
        toaster: "b-toaster-top-center",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },
  },
});
</script>
