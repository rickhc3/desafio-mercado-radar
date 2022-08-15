<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-container>
      <b-navbar-brand href="/">Desafio - Mercado Radar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Pesquisar produtos"
            ></b-form-input>
          </b-nav-form>

          <b-button variant="dark" v-b-toggle.sidebar-right>
            <b-icon
              stacked
              icon="camera"
              variant="info"
              scale="0.75"
              shift-v="-0.25"
            ></b-icon>
            Carrinho
            <span rounded dark>0</span>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style>
</style>