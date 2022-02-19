<template>
  <div>
    <h1>ชำระเงิน</h1>
    <button class="btn btn-success" @click="GO">กลับหน้าร้าน</button>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      totalPrice: 'cart/totalPrice',
    }),
    ...mapState({
      store: (state) => state.cart.store,
      total: (state) => state.cart.total,
    }),
  },
  methods: {
    GO() {
      this.$router.push(`/${this.store}`)
    },
  },
}
</script>
