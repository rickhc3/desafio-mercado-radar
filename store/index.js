export const state = () => ({
  products: [],
  product: {},
  productRating: {},
  cart: [],
  cartTotal: 0,
  wishlist: [],
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
  REMOVE_PRODUCT_CART(state, product) {
    state.cart.splice(product, 1)
  },
  ADD_WISHLIST(state, wishlist) {
    state.wishlist.push(wishlist)
  },
  REMOVE_PRODUCT_WISHLIST(state, product) {
    state.wishlist.splice(product, 1)
  },
  SET_WISHLIST(state, wishlist) {
    state.wishlist = wishlist
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
    context.commit('REMOVE_PRODUCT_CART', product)
  },

  emptyCart(context) {
    context.commit('SET_CART', [])
  },

  setCart(context, cart) {
    context.commit('SET_CART', cart)
  },

  addToWishlist(context, product) {
    if (!context.state.wishlist.includes(product)) {
      context.commit('ADD_WISHLIST', product)
    } else {
      context.commit('REMOVE_PRODUCT_WISHLIST', product)
    }
  },

  removeFromWishlist(context, product) {
    context.commit('REMOVE_PRODUCT_WISHLIST', product)
  },
  setWishlist(context, wishlist) {
    context.commit('SET_WISHLIST', wishlist)
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
  $wishlist(state) {
    return state.wishlist
  }

}
