<template>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" id="NAV">
    <div class="container-fluid">
      <h1 class="navbar-brand" to="#">{{this.$route.params.id}} </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item active">
            <a class="nav-link" href="http://localhost:8000/login"
              >Admin</a
            >
          </li>
        </ul>
      </div>
    </div>
    <CartSummary />
  </nav>
</template>

<script>
import CartSummary from './CartSummary.vue'
import { mapState } from 'vuex'
export default {
  name: 'Header',
  components: {
    CartSummary,
  },
  computed: {
    ...mapState({
      store: (state) => state.cart.store,
    }),
  },

}
</script>
<style scoped>
.NAV {
  background-color: aquamarine;
}
</style>
