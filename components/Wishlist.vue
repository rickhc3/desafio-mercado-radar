<template>
  <div>
    <h3>Favoritos</h3>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, i) in products" :key="i">
                    <td>{{ product.title }}</td>
                    <td>{{ formatMoney(product.price) }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        @click="removeProduct(i)"
                        v-b-tooltip.hover
                        title="Remover do Favoritos"
                      >
                        <b-icon icon="trash"></b-icon>
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
  </div>
</template>

<script lang="ts">
import { Product } from "@/models/Product";
export default {
  computed: {
    products() {
      return this.$store.getters.$wishlist;
    },
  },
  mounted() {
    if (localStorage.getItem("cart")) {
      this.$store.commit("SET_PRODUCTS_CART", JSON.parse(localStorage.getItem("cart")));
    }

    if (localStorage.getItem("wishlist")) {
      this.$store.commit(
        "SET_PRODUCTS_WISHLIST",
        JSON.parse(localStorage.getItem("wishlist"))
      );
    }
  },
  methods: {
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
          await this.ModalInfo("Info!", "response.message");
          this.$bvModal.show("modal-1");
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
};
</script>

<style>
</style>