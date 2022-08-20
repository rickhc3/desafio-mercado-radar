<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <b-card title="Carrinho">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, i) in $cart" :key="i">
                    <td class="text-center">
                      <a :href="`/product/${product.id}`">
                        <img
                          :src="product.image"
                          class="img-fluid"
                          width="50"
                          height="50"
                      /></a>
                    </td>
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
                      <b-button
                        variant="danger"
                        @click="removeFromCart(product, i)"
                        v-b-tooltip.hover
                        title="Remover do Carrinho"
                        size="sm"
                      >
                        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-card>
          <div class="row my-4">
            <div class="col-8"></div>
            <div class="col-4">
              <div class="text-left p-1">
                <span>
                  <b>Total do Carrinho</b>:
                  {{ formatMoney($store.getters.$cartTotal) }}
                </span>
                <br />
                <span>
                  <b>Imposto</b>:
                  {{ formatMoney(tax5Percent($store.getters.$cartTotal)) }}
                </span>
                <span
                  ><br />
                  <b>Total com Imposto</b>:
                  {{ formatMoney(totalWithTax($store.getters.$cartTotal)) }}
                </span>
              </div>
              <div class="text-center">
                <b-button variant="success" @click="finishPurchase">
                  Finalizar Compra
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Product } from "@/models/Product";
export default Vue.extend({
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit(
        "SET_PRODUCTS_CART",
        JSON.parse(localStorage.getItem("cart") as string)
      );
    }
  },

  methods: {
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
        toaster: "b-toaster-top-right",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },

    tax5Percent(price: number) {
      return (price / 100) * 5;
    },

    totalWithTax(price: number) {
      return price + this.tax5Percent(price);
    },

    finishPurchase(product: Product) {
      this.ModalConfirm(
        "Deseja finalizar a compra?",
        " "
      ).then(async (r) => {
        this.$store.dispatch("emptyCart");
        if (r) {
          this.$store.dispatch("removeFromWishlist", product);
          localStorage.setItem(
            "wishlist",
            JSON.stringify(this.$store.getters.$wishlist)
          );
          await this.ModalInfo("Info", `Compra finalizada`);
          
          this.$router.push("/");
          localStorage.setItem(
            "cart",
            JSON.stringify(this.$store.getters.$cart)
          );
        }
      });
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

  computed: {
    $cart(): Product[] {
      return this.$store.getters.$cart;
    },
  },
});
</script>

<style>
</style>