<template>
  <div class="text-center">
    <h1>ชำระเงิน</h1>
    <h3>ยอดที่ต้องชำระ {{ totalPrice }} บาท</h3>
    <br />
    <!-- <img src="../static/pay.jpg" class="img-fluid" width="600" height="800" /> -->
    <img
      :src="'data:image/png;base64, ' + qrBase64"
      class="img-fluid"
      width="600"
      height="800"
    />
    <br />
    <!-- <button class="btn btn-success" @click="fetch">fetch</button>
    <button class="btn btn-success" @click="test">test</button>
    <button class="btn btn-success" @click="genQR">กลับหน้าร้าน</button> -->
    <button class="btn btn-danger" @click="Cancel">ยกเลิก</button>
    <button class="btn btn-success" @click="onPurchase">ชำระเงินแล้ว</button>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { sessionToken, BillRef } from '../libs/sessionStorage'
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
      qrBase64: null,
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
    async genQR() {
      // const token = this.token
      const token = 'de6b9c23-fbcc-4836-87a8-d31684cf048d'
      const amount = this.totalPrice
      console.log(amount)
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
      var data = {
        qrType: 'PP',
        ppType: 'BILLERID',
        ppId: '875147368312544',
        amount: `${amount}`,
        ref1: 'REFERENCE1',
        ref2: 'REFERENCE2',
        ref3: 'SCB',
      }
      console.log(data)
      const qrcode = await axios.post(
        'api/v1/payment/qrcode/create',
        data,
        config
      )
      // console.log(qrcode.data.data.qrImage)
      this.qrBase64 = qrcode.data.data.qrImage
    },
    Cancel() {
      this.$router.go(-1)
    },
    async onPurchase() {
      const ref1 = BillRef.getBillRef()
      const ref2 = BillRef.getBillRef2()
      console.log(ref1)
      try {
        const res = await axios.post('https://ai-ani.me/api/v1/checkConfirm', {
          ref1: ref1,
          ref2: ref2,
        })
        // console.log(res)
        if (res.status == 200) {
          this.$swal
            .fire({
              type: 'success',
              title: 'ชำระเงินสำเร็จ',
              timer: 2000,
              showConfirmButton: false,
              text: `ขอบคุณสำหรับการสั่งซื้อ`,
            })
            .then(this.$router.push('/products'))
          this.clearCartData()
          this.$router.push(`/${this.store}`)
        }
      } catch (err) {
        console.log(err)
        this.$swal.fire({
          type: 'error',
          title: `เกิดข้อผิดพลาด`,
          // timer: 800,
          text: `ไม่พบข้อมูลการชำระเงิน`,
          // showConfirmButton: false,
        })
      }
    },
  },
  async mounted() {
    this.qrBase64 = sessionToken.getToken()
    if (!this.qrBase64) {
      this.$router.push('/checkout')
    }
    // console.log(this.qrBase64)
    // await this.genQR()
    // await this.onPurchase()
  },
}
</script>
