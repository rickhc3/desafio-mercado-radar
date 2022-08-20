<template>
  <div>
    <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">

        <b-card title="Favoritos">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, i) in products" :key="i">
                    <td>
                      <a :href="`/product/${product.id}`">
                      <img
                        :src="product.image"
                        class="img-fluid"
                        width="50"
                        height="50"
                      /></a>
                    </td>
                    <td>{{ product.title }}</td>
                    <td>{{ formatMoney(product.price) }}</td>
                    <td>
                      <b-button
                        variant="success"
                        @click="addToCart(product)"
                        v-b-tooltip.hover
                        title="Adicionar ao Carrinho"
                        size="sm"
                      >
                        <b-icon icon="cart-plus" aria-hidden="true"></b-icon>
                      </b-button>
                      <b-button
                        variant="danger"
                        @click="removeProduct(i)"
                        v-b-tooltip.hover
                        title="Remover do Favoritos"
                        size="sm"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-card>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Product } from "@/models/Product";
export default Vue.extend({
  computed: {
    products() : Product[] {
      return this.$store.getters.$wishlist;
    },
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit("SET_PRODUCTS_CART", JSON.parse(localStorage.getItem("cart") as string));
    }

    if (localStorage.getItem("wishlist")) {
      this.$store.commit(
        "SET_PRODUCTS_WISHLIST",
        JSON.parse(localStorage.getItem("wishlist") as string)
      );
    }
  },
  methods: {
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
    removeProduct(product: Product) {
      this.ModalConfirm(
        "Tem certeza?",
        "Esta ação não pode ser desfeita!"
      ).then(async (r) => {
        if (r) {
          this.$store.dispatch("removeFromWishlist", product);
          localStorage.setItem(
            "wishlist",
            JSON.stringify(this.$store.getters.$wishlist)
          );
          await this.ModalInfo("Info", `Produto removido dos favoritos`);
        }
      });
    },
    formatMoney(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },

    ModalConfirm(title: string, text: string = "") {
      return new Promise((resolve, reject) => {
        this.$bvModal
          .msgBoxConfirm(text, {
            title: title,
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            okTitle: "Sim",
            cancelTitle: "Não",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value: any) => {
            resolve(value);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    },

    ModalInfo(title: string, text: string = "") {
      return new Promise((resolve, reject) => {
        this.$bvModal
          .msgBoxOk(text, {
            title: title,
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            okTitle: "Ok",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value: any) => {
            resolve(value);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    },
  },
});
</script>

<style>
</style>