import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Product } from "~/models/Product"

interface Rating {
  rate: number
  count: number
}

export const state = () => ({
  products: [] as Product[],
  product: {} as Product,
  productRating: {} as Rating,
  cart: [] as Product[],
  cartTotal: 0,
  wishlist: [] as Product[],
  alsoLike: [] as Product[],
  search: '' as string,
})
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_PRODUCTS(state, products: Product[]) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  SET_PRODUCT_RATING(state, productRating) {
    state.productRating = productRating
  },
  ADD_PRODUCT_TO_CART(state, cart) {
    state.cart.push(cart)
  },
  SET_PRODUCTS_CART(state, cart) {
    state.cart = cart
  },
  REMOVE_PRODUCT_CART(state, product) {
    state.cart.splice(product, 1)
  },
  ADD_PRODUCT_WISHLIST(state, wishlist) {
    state.wishlist.push(wishlist)
  },
  REMOVE_PRODUCT_WISHLIST(state, product) {
    state.wishlist.splice(product, 1)
  },
  SET_PRODUCTS_WISHLIST(state, wishlist) {
    state.wishlist = wishlist
  },
  SET_PRODUCTS_ALSO_LIKE(state, alsoLike) {
    state.alsoLike.push(alsoLike)
  }
}

export const actions: ActionTree<RootState, RootState> = {
 async fetchProducts(context) {
    return this.$axios.$get('https://fakestoreapi.com/products')
      .then(response => {
        context.commit('SET_PRODUCTS', response)
      })
  },

  async fetchProduct(context, id) {
    return this.$axios.$get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        context.commit('SET_PRODUCT', response)
        context.commit('SET_PRODUCT_RATING', response.rating)
      })
  },

  async alsoLike(context) {
    for (let i = 0; i < 4; i++) {
      this.$axios.$get(`https://fakestoreapi.com/products/${Math.floor(Math.random() * 20) + 1}`)
      .then(response => {
        context.commit('SET_PRODUCTS_ALSO_LIKE', response)
      })
    }
  },

  addToCart(context, product) {
    context.commit('ADD_PRODUCT_TO_CART', product)
  },

  removeFromCart(context, product) {
    context.commit('REMOVE_PRODUCT_CART', product)
  },

  emptyCart(context) {
    context.commit('SET_PRODUCTS_CART', [])
  },

  setCart(context, cart) {
    context.commit('SET_PRODUCTS_CART', cart)
  },

  addToWishlist(context, product) {
    context.commit('ADD_PRODUCT_WISHLIST', product)
  },

  removeFromWishlist(context, product) {
    context.commit('REMOVE_PRODUCT_WISHLIST', product)
  },
  setWishlist(context, wishlist) {
    context.commit('SET_PRODUCTS_WISHLIST', wishlist)
  },
}

export const getters:GetterTree<RootState, RootState> = {
  $allProducts(state) {
    return state.products
  },
  $product(state) {
    return state.product
  },
  $rating(state) {
    return state.productRating
  },
  $cart(state) {
    return state.cart
  },
  $cartTotal(state) {
    return state.cart.reduce((total, product) => {
      return total + product.price
    }, 0)
  },
  $wishlist(state) {
    return state.wishlist
  },
  $alsoLike(state) {
    return state.alsoLike
  },



}
