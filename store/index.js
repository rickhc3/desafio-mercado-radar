export const state = () => ({
  products: [],
  product: {}
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
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
      })
  }

}

export const getters = {
  $allProducts(state) {
    return state.products
  },
  $product(state) {
    return state.product
  }
}
