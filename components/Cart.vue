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
                <tr v-for="(product, i) in $cart" :key="i">
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
                      @click="removeFromCart(i)"
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
      <div class="row">
        <div class="text-right">
          <span>
            Total do Carrinho:
            {{ formatMoney($store.getters.$cartTotal) }}
          </span>
          <span>
            Imposto: {{ formatMoney(tax5Percent($store.getters.$cartTotal)) }}
          </span>
          <span>
            Total com Imposto:
            {{ formatMoney(totalWithTax($store.getters.$cartTotal)) }}
          </span>
        </div>
      </div>
      <div class="row">
        <div class="text-center">
          <button
            class="btn btn-sm btn-danger"
            @click="finishPurchase"
          >
            Finalizar Compra
          </button>
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
      this.$store.commit(
        "SET_PRODUCTS_CART",
        JSON.parse(localStorage.getItem("cart"))
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
    removeFromCart(product: Product) {
      this.$store.dispatch("removeFromCart", product);
      this.$bvToast.toast(`${product.title} removido do carrinho`, {
        title: "Produto Removido",
        autoHideDelay: 2000,
        appendToast: true,
        variant: "success",
        toaster: "b-toaster-top-center",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
    },

    tax5Percent(price: number) {
      return (price / 100) * 5;
    },

    totalWithTax(price: number) {
      return price + this.tax5Percent(price);
    },

    finishPurchase() {
      this.$store.dispatch('emptyCart')
      this.$bvToast.toast(`Compra finalizada`, {
        title: "Compra Finalizada",
        autoHideDelay: 2000,
        appendToast: true,
        variant: "success",
        toaster: "b-toaster-top-center",
      });
      localStorage.setItem("cart", JSON.stringify(this.$store.getters.$cart));
      this.$router.push('/')
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
};
</script>

<style>
</style>