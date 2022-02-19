<template>
  <div class="row">
    <div class="col-12">
      <div class="form-group m-2">
        <label for="">ใส่เบอร์โทรศัพท์ของท่าน</label>
        <input type="text" class="form-control" v-model="phone" />
      </div>
      <!-- <h1>{{ phone }}</h1>
      <h1>{{name}}</h1> -->
      <div class="form-group m-2" v-if="sw == true">
        <label for="">ชื่อ</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group m-2" v-if="sw == true">
        <label for="">ที่อยู่</label>
        <input type="text" class="form-control" v-model="address" />
      </div>
    </div>
    <div class="col-12 text-center">
      <button class="btn btn-secondary m-1" @click="Back"
        >ย้อนกลับ</button
      >
      <button
        v-if="this.sw == false"
        class="btn btn-primary m-1"
        @click="Submit"
      >
        ตกลง
      </button>
      <button
        v-if="this.sw == true && this.name != '' && this.address != ''"
        class="btn btn-primary m-1"
        @click="POST"
      >
        ชำระเงิน
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import axios from 'axios'
export default {
  components: {},
  data() {
    return {
      phone: '',
      name: '',
      address: '',
      sw: false,
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      store: (state) => state.cart.store
    }),
    ...mapGetters({
      total: 'cart/totalPrice',
    }),
  },
  methods: {
    ...mapActions({
      storeOrder: 'orders/storeOrderAction',
      clearCartData: 'cart/clearCartData',
    }),
    async Submit() {
      const body = {
        phone: this.phone,
      }
      const res = await axios.put('https://test-eshop-api.herokuapp.com/api/v1/users', body)
      console.log(res.data)
      // console.log(this.cart)
      // console.log(this.store);
      if (res.data) {
        this.name = res.data.name
        this.address = res.data.address
      }
      if (this.phone) this.sw = true
      /*
     if(this.sw == true && this.name !='' && this.address !=''){
      const body ={
         store: 'anime',
         phone: this.phone,
         address: this.address,
         cart : JSON.stringify(this.cart)
       }
       console.log(body)
       await axios.post('http://localhost:3000/api/v1/orders', body) */
      //  const data = new FormData()
      //  data.append('store', 'anime')
      //  data.append('phone', this.phone)
      //  data.append('address', this.address)
      //  data.append("cart", JSON.stringify(this.cart))
      //   console.log(data);
      //  await axios.post('http://localhost:3000/api/v1/orders/add', data)
      //  }
    },
    async POST() {
      if (this.sw == true && this.name != '' && this.address != '') {
        const body = {
          store: this.store,
          phone: this.phone,
          address: this.address,
          cart: JSON.stringify(this.cart),
          total: this.total,
        }
        console.log(body)
        await axios.post('https://test-eshop-api.herokuapp.com/api/v1/orders', body)

        this.clearCartData()
        this.$router.push('/purchase')
      }
    },
    Back() {
      this.$router.go(-1)
    },
  },
}
</script>
