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
      qrBase64:
        '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',
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
        // const res = await axios.post(
        //   // 'https://api.unforgettravel.com/api/v1/checkConfirm',
        //   'http://localhost:3000/api/v1/checkConfirm',

        //   {
        //     ref1: ref1,
        //     ref2: ref2,
        //   }
        // )
        // console.log(res)
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
        // if (res.status == 200) {
        // }
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
    // this.qrBase64 = sessionToken.getToken()
    // if (!this.qrBase64) {
    //   this.$router.push('/checkout')
    // }
    // console.log(this.qrBase64)
    // await this.genQR()
    // await this.onPurchase()
  },
}
</script>
