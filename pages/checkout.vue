<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-12">
        <h4
          class="d-flex justify-content-between align-items-center mb-3 text-center"
        >
          <span class="text-primary text-center">สินค้า</span>
          <span class="badge bg-primary rounded-pill">{{ itemCount }}</span>
        </h4>

        <ul class="list-group mb-3">
          <li
            class="list-group-item d-flex justify-content-between lh-sm"
            v-for="(c, i) in cart"
            :key="i"
          >
            <div>
              <h6 class="my-0">{{ c.product.name }}</h6>
              <small class="text-muted">{{ c.product.description }}</small>
            </div>
            <span class="text-muted">{{ c.product.price }}</span>
          </li>

          <li class="list-group-item d-flex justify-content-between">
            <h5 class="text">ราคารวม </h5>
            <strong>{{ total }}</strong>
          </li>
        </ul>
        <hr style="margin-top:50px; margin-bottom:30px;"/>
        <form @submit.prevent="POST">
          <h4
            class="d-flex justify-content-between align-items-center mb-3 text-center"
          >
            <span class="text-primary text-center">ที่อยู่จัดส่ง</span>
          </h4>
          <div class="form-group m-2">
            <label for="phone">ใส่เบอร์โทรศัพท์ของท่าน</label>
            <input
              type="text"
              name="phone"
              id="phone"
              class="form-control"
              v-model="phone"
              :class="{ 'is-invalid': submitted && $v.phone.$error }"
            />
            <label v-if="!$v.phone.minLength" class="is-invalid"
              >เบอร์โทรศัพท์ไม่ถูกต้อง</label
            >
            <label v-if="!$v.phone.maxLength" class="is-invalid"
              >เบอร์โทรศัพท์ไม่ถูกต้อง</label
            >
          </div>

          <div class="form-group m-2" v-if="sw == true">
            <label for="name">ชื่อ</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              v-model="name"
              :class="{ 'is-invalid': submitted && $v.name.$error }"
            />
            <label v-if="!$v.name.required" class="text-red">โปรดใส่ชื่อ</label>
          </div>
          <div class="form-group m-2" v-if="sw == true">
            <label for="address">ที่อยู่</label>
            <input
              type="text"
              name="address"
              id="address"
              class="form-control"
              v-model="address"
              :class="{ 'is-invalid': submitted && $v.address.$error }"
            />
            <label v-if="!$v.address.required">โปรดใส่ทึ่อยู่</label>
          </div>
        </form>
      </div>

      <!-- Button -->
      <div class="col-12 text-center">
        <button class="btn btn-secondary m-1" @click="Back">ย้อนกลับ</button>
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  head() {
    return {
      title: 'ทำการสั่งซื้อ',
    }
  },
  components: {},
  data() {
    return {
      phone: '',
      name: '',
      address: '',
      sw: false,
      submitted: false,
    }
  },
  validations: {
    phone: { required, minLength: minLength(10), maxLength: maxLength(10) },
    name: { required },
    address: { required },
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      store: (state) => state.cart.store,
    }),
    ...mapGetters({
      itemCount: 'cart/itemCount',
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
      const res = await axios.put(`https://ai-ani.me/api/v1/users`, body)
      // console.log(res.data)
      // console.log(this.cart)
      // console.log(this.store);
      if (res.data) {
        this.name = res.data.name
        this.address = res.data.address
      }
      if (this.phone) this.sw = true
    },
    async POST(e) {
      this.submitted = true

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      const body = {
        store: this.store,
        name: this.name,
        phone: this.phone,
        address: this.address,
        cart: JSON.stringify(this.cart),
        total: this.total,
      }
      console.log(body)
      const res = await axios.post(`https://ai-ani.me/api/v1/orders`, body)
      console.log(res);
      if (res.status == 200) {
        // this.clearCartData()
        this.$router.push('/purchase')
      }
    },
    Back() {
      this.$router.go(-1)
    },
  },
  mounted() {

  },
}
</script>
<style>
.swal2-wide {
  width: 850px !important;
}
</style>
