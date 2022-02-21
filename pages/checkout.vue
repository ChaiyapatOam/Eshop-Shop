<template>
  <div class="row mt-3">
    <div class="col-12">
      <form @submit.prevent="POST">
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
          <label v-if="!$v.phone.minLength" class="is-invalid">เบอร์โทรศัพท์ไม่ถูกต้อง</label>
          <label v-if="!$v.phone.maxLength" class="is-invalid">เบอร์โทรศัพท์ไม่ถูกต้อง</label>
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, minLength,maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  head() {
    return {
      title: 'CheckOut',
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
    phone: { required, minLength: minLength(10),maxLength: maxLength(10) },
    name: { required },
    address: { required },
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      store: (state) => state.cart.store,
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
      const res = await axios.put(
        `https://ai-ani.me/api/v1/users`,
        body
      )
      console.log(res.data)
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
      if (res.status == 200) {
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
