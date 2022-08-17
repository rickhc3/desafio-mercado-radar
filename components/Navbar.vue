<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
    <b-container>
      <b-navbar-brand href="/">Desafio - Mercado Radar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <b-nav-item href="/wishlist">Favoritos</b-nav-item>
      </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-button variant="dark" v-b-toggle.sidebar-cart>
            Carrinho
            <b-icon icon="cart-fill" aria-hidden="true"></b-icon>
            <span rounded dark>{{ $store.getters.$cart.length }}</span>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
    <Sidebar />
  </b-navbar>
</template>

<script lang="ts">
export default {};
</script>

<style>
</style>