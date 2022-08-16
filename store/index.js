export const state = () => ({
  products: [],
  product: {},
  productRating: {},
  cart: [],
  cartTotal: 0,
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  SET_PRODUCTRATING(state, productRating) {
    state.productRating = productRating
  },
  ADD_CART(state, cart) {
    state.cart.push(cart)
  },
  SET_CART(state, cart) {
    state.cart = cart
  },
  REMOVE_PRODUCT(state, product) {
    state.cart.splice(product, 1)
  }
}

export const actions = {
  fetchProducts(context) {
    return this.$axios.$get('https://fakestoreapi.com/products')
      .then(response => {
        context.commit('SET_PRODUCTS', response)
      })
  },

  fetchProduct(context, id) {
    return this.$axios.$get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        context.commit('SET_PRODUCT', response)
        context.commit('SET_PRODUCTRATING', response.rating)
      })
  },

  addToCart(context, product) {
    context.commit('ADD_CART', product)
  },

  removeFromCart(context, product) {
    context.commit('REMOVE_PRODUCT', product)
  },

  emptyCart(context) {
    context.commit('SET_CART', [])
  },

  setCart(context, cart) {
    context.commit('SET_CART', cart)
  }

}

export const getters = {
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
  
  }
