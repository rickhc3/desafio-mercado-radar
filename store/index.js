export const state = () => ({
  products: [],
  product: {},
  productRating: {},
  cart: [],
  cartTotal: 0,
  wishlist: [],
  alsoLike: [],
  search: ''
})

export const mutations = {
  SET_PRODUCTS(state, products) {
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
    state.alsoLike = alsoLike
  },
  SET_PRODUCTS_SEARCH(state, search) {
    state.products = state.products.map(product => {
      if (product.title.toLowerCase().includes(search.toLowerCase())) {
        return product
      }
    })
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
        context.commit('SET_PRODUCT_RATING', response.rating)
      })
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

  setAlsoLike(context, alsoLike) {
    context.commit('SET_PRODUCTS_ALSO_LIKE', alsoLike)
  },
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
  $wishlist(state) {
    return state.wishlist
  },
  $alsoLike(state) {
    return state.alsoLike
  },

  $valueSearch(state) {
    return state.search
  },



}
