<template>
  <div class="text-center">
    <h1>ชำระเงิน</h1>
    <h3>ยอดที่ต้องชำระ {{ totalPrice }} บาท</h3>
    <br />
    <img src="../static/pay.jpg" class="img-fluid" width="600" height="800" />
    <br />
    <button class="btn btn-success" @click="genQR">กลับหน้าร้าน</button>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { sessionToken } from '../libs/sessionStorage'
import axios from 'axios'
export default {
  computed: {
    ...mapGetters({
      totalPrice: 'cart/totalPrice',
    }),
    ...mapState({
      store: (state) => state.cart.store,
    }),
  },
  data() {
    return {
      token: null,
    }
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
    async test() {},
    async genQR() {
      // const token = this.token
      const token = 'de6b9c23-fbcc-4836-87a8-d31684cf048d'
      const amount = this.totalPrice
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'accept-language': 'EN',
          authorization: `Bearer ${token}`,
          requestUId: '1b01dff2-b3a3-4567-adde-cd9ddjhjhjhj73c8b6d',
          resourceOwnerId: 'l72c003nmnnna1a84454b0886dd105590474cf5',
        },
      }
      var headers = {
        'Content-Type': 'application/json',
        'accept-language': 'EN',
        authorization: `Bearer ${token}`,
        requestUId: '1b01dff2-b3a3-4567-adde-cd9ddjhjhjhj73c8b6d',
        resourceOwnerId: 'l72c003nmnnna1a84454b0886dd105590474cf5',
      }
      var data = {
        qrType: 'PP',
        ppType: 'BILLERID',
        ppId: '875147368312544',
        amount: '1.00',
        ref1: 'REFERENCE1',
        ref2: 'REFERENCE2',
        ref3: 'SCB',
      }
      console.log(headers)
      console.log(data)
      // const qrcode = await axios({
      //   method: 'post',
      //   url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
      //     data: data,
      //   headers: {
      //     'Content-Type': 'Application/JSON',
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      //     'Access-Control-Allow-Headers': 'authorization',
      //     authorization: `Bearer ${token}`,
      //     requestUId: '1b01dff2-b3a3-4567-adde-cd9dd73c8b6d',
      //     resourceOwnerId: 'l72c003nmnnna1a84454b0886dd105590474cf5',
      //   },
      // })
      const qrcode = await axios.post(
        'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
        data,
        config
      )
      console.log(qrcode)
    },
  },
  async mounted() {
    this.token = sessionToken.getToken()
    if (!this.token) {
      this.$router.push('/checkout')
    }
    console.log(this.token)
    // await this.genQR()
  },
}
</script>
