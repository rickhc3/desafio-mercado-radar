<template>
  <div>
    <Navbar />
    <main class="page-wrapper">
      <!-- Page Title-->
      <div class="page-title-overlap bg-dark pt-4">
        <div class="container d-lg-flex justify-content-between py-2 py-lg-3">
          <div class="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 class="h3 text-light mb-0">{{ $store.getters.$product.title }}</h1>
          </div>
        </div>
      </div>
      <div class="container">
        <!-- Gallery + details-->
        <div class="bg-light shadow-lg rounded-3 px-4 py-3 mb-5">
          <div class="px-lg-3">
            <div class="row">
              <!-- Product gallery-->
              <div class="col-lg-7 pe-lg-0 pt-lg-4">
                <div class="product-gallery">
                  <div class="product-gallery-thumblist order-sm-1">
                    <b-img :src="$store.getters.$product.image"></b-img>
                  </div>
                </div>
              </div>
              <!-- Product details-->
              <div class="col-lg-5 pt-4 pt-lg-0">
                <div class="product-details ms-auto pb-3">
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      mb-2
                    "
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
                        > {{ $store.getters.$product.rating.count}} Reviews</span
                      ></a
                    >
                    <button
                      class="btn-wishlist me-0 me-lg-n3"
                      type="button"
                      data-bs-toggle="tooltip"
                      title=""
                      data-bs-original-title="Add to wishlist"
                      aria-label="Add to wishlist"
                    >
                      <i class="ci-heart"></i>
                    </button>
                  </div>
                  <div class="mb-3">
                    <span class="h3 fw-normal text-accent me-1"
                      >{{ `R$${ $store.getters.$product.price }` }}</span
                    >
                  </div>
                 
                  <div class="accordion mb-4" id="productPanels">
                    <div class="accordion-item">
                      <h3 class="accordion-header">
                        <a
                          class="accordion-button"
                          href="#productInfo"
                          role="button"
                          data-bs-toggle="collapse"
                          aria-expanded="true"
                          aria-controls="productInfo"
                          ><i
                            class="
                              ci-announcement
                              text-muted
                              fs-lg
                              align-middle
                              mt-n1
                              me-2
                            "
                          ></i
                          >Product info</a
                        >
                      </h3>
                      <div
                        class="accordion-collapse collapse show"
                        id="productInfo"
                        data-bs-parent="#productPanels"
                      >
                        <div class="accordion-body">
                          <h6 class="fs-sm mb-2">Composition</h6>
                          <ul class="fs-sm ps-4">
                            <li>Elastic rib: Cotton 95%, Elastane 5%</li>
                            <li>Lining: Cotton 100%</li>
                            <li>Cotton 80%, Polyester 20%</li>
                          </ul>
                          <h6 class="fs-sm mb-2">Art. No.</h6>
                          <ul class="fs-sm ps-4 mb-0">
                            <li>183260098</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Product description section 1-->
        <div class="row align-items-center py-md-3">
          <div class="col-lg-5 col-md-6 offset-lg-1 order-md-2">
            <img
              class="d-block rounded-3"
              src="img/shop/single/prod-img.jpg"
              alt="Image"
            />
          </div>
          <div class="col-lg-4 col-md-6 offset-lg-1 py-4 order-md-1">
            <h2 class="h3 mb-4 pb-2">High quality materials</h2>
            <h6 class="fs-base mb-3">Soft cotton blend</h6>
            <p class="fs-sm text-muted pb-2">
              {{ $store.getters.$product.description }}
            </p>
          </div>
        </div>
      </div>
      <!-- Reviews-->
      <div class="border-top border-bottom my-lg-3 py-5">
        <div class="container pt-md-2" id="reviews">
          <div class="row pb-3">
            <div class="col-lg-4 col-md-5">
              <h2 class="h3 mb-4">Reviews</h2>
              <div class="star-rating me-2">
                <i class="ci-star-filled fs-sm text-accent me-1"></i
                ><i class="ci-star-filled fs-sm text-accent me-1"></i
                ><i class="ci-star-filled fs-sm text-accent me-1"></i
                ><i class="ci-star-filled fs-sm text-accent me-1"></i
                ><i class="ci-star fs-sm text-muted me-1"></i>
              </div>
              <span class="d-inline-block align-middle"
                >4.1 Overall rating</span
              >
              <p class="pt-3 fs-sm text-muted">
                58 out of 74 (77%)<br />Customers recommended this product
              </p>
            </div>
            <div class="col-lg-8 col-md-7">
              <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3">
                  <span class="d-inline-block align-middle text-muted">5</span
                  ><i class="ci-star-filled fs-xs ms-1"></i>
                </div>
                <div class="w-100">
                  <div class="progress" style="height: 4px">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style="width: 60%"
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span class="text-muted ms-3">43</span>
              </div>
              <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3">
                  <span class="d-inline-block align-middle text-muted">4</span
                  ><i class="ci-star-filled fs-xs ms-1"></i>
                </div>
                <div class="w-100">
                  <div class="progress" style="height: 4px">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 27%; background-color: #a7e453"
                      aria-valuenow="27"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span class="text-muted ms-3">16</span>
              </div>
              <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3">
                  <span class="d-inline-block align-middle text-muted">3</span
                  ><i class="ci-star-filled fs-xs ms-1"></i>
                </div>
                <div class="w-100">
                  <div class="progress" style="height: 4px">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 17%; background-color: #ffda75"
                      aria-valuenow="17"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span class="text-muted ms-3">9</span>
              </div>
              <div class="d-flex align-items-center mb-2">
                <div class="text-nowrap me-3">
                  <span class="d-inline-block align-middle text-muted">2</span
                  ><i class="ci-star-filled fs-xs ms-1"></i>
                </div>
                <div class="w-100">
                  <div class="progress" style="height: 4px">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width: 9%; background-color: #fea569"
                      aria-valuenow="9"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span class="text-muted ms-3">4</span>
              </div>
              <div class="d-flex align-items-center">
                <div class="text-nowrap me-3">
                  <span class="d-inline-block align-middle text-muted">1</span
                  ><i class="ci-star-filled fs-xs ms-1"></i>
                </div>
                <div class="w-100">
                  <div class="progress" style="height: 4px">
                    <div
                      class="progress-bar bg-danger"
                      role="progressbar"
                      style="width: 4%"
                      aria-valuenow="4"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span class="text-muted ms-3">2</span>
              </div>
            </div>
          </div>
          <hr class="mt-4 mb-3" />
        </div>
      </div>
      <div class="container py-5 my-md-3">
        <h2 class="h3 text-center pb-4">You may also like</h2>
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
    this.count = this.$products.length;
  },
  methods: {
    generateRandomMinutes() {
      return Math.floor(Math.random() * 60);
    },
  },
});
</script>
