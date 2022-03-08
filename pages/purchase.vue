<template>
  <div class="text-center">
    <h1>ชำระเงิน</h1>
    <h3>ยอดที่ต้องชำระ {{ totalPrice }} บาท</h3>
    <br />
    <img src="../static/pay.jpg" class="img-fluid" width="600" height="800" />
    <br />
    <button class="btn btn-success" @click="GO">กลับหน้าร้าน</button>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      totalPrice: 'cart/totalPrice',
    }),
    ...mapState({
      store: (state) => state.cart.store,
    }),
  },
  methods: {
    ...mapActions({
      storeOrder: 'orders/storeOrderAction',
      clearCartData: 'cart/clearCartData',
    }),
    GO() {
      //if purchase success 
      // Post api /products/stock
      this.clearCartData()
      this.$router.push(`/${this.store}`)
    },
  },
}
</script>
