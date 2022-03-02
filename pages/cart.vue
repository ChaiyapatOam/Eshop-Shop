<template>
  <div class="container">
    <div class="row bg-light py-3">
      <div class="col text-center">
        <h4>ตะกร้าสินค้า</h4>
      </div>
    </div>
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th scope="col">สินค้า</th>
          <th scope="col">ราคา</th>
          <!-- <th scope="col">รวม</th> -->
          <th scope="col">ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="itemCount == 0">
          <td colspan="5" class="text-center">
            คุณไม่มีของในตะกร้า <br />
            <button class="btn small btn-success" @click="Back">
              ย้อนกลับ
            </button>
          </td>
        </tr>
        <tr v-for="(c, i) in cart" :key="i">
          <td>
            {{ c.product.name }} <br />
            <div>
              <img :src="c.product.image" width="50" height="55" /> &nbsp;
              &nbsp;
        
              <i class="bx bx-minus" @click="handleSubtractProduct(c.product.id, c.quantity)"></i>

              {{ c.quantity }}

              <i class="bx bx-plus" @click="handleAddProduct(c.product)"></i>
            </div>
          </td>
          <td>{{ c.product.price }}</td>

          <td>
            <button
              class="btn small btn-danger mx-1"
              @click="handleRemoveProduct(c.product.id)"
            >
              <i class="bx bx-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="itemCount > 0">
        <tr>
          <td colspan="5" class="text-right">
            <h4>ราคารวม {{ totalPrice }} บาท</h4>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <button class="btn small btn-danger float-left" @click="Back">
              ย้อนกลับ
            </button>
            <nuxt-link
              to="/checkout"
              class="btn btn-primary float-right"
              @click="total"
              >สั่งซื้อ</nuxt-link
            >
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { StoreAuth } from '../libs/sessionStorage'
import axios from 'axios'
export default {
  name: 'Pages',
  head() {
    return {
      title: 'รถเข็น',
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
    }),
    ...mapGetters({
      itemCount: 'cart/itemCount',
      totalPrice: 'cart/totalPrice',
    }),
  },
  data() {
    return {
      store: null,
      products: '',
      mycart: '',
    }
  },
  methods: {
    ...mapMutations({
      addProduct: 'cart/addProduct',
      subtractProduct: 'cart/subtractProduct',
      removeProduct: 'cart/removeProduct',
    }),
    ...mapActions({
      clearCartData: 'cart/clearCartData',
      saveTotal: 'cart/saveTotal',
    }),
    async fetchData() {
      const { data } = await axios.get(
        `https://ai-ani.me/api/v1/store/${this.store}`,
        {
          headers: {
            'Content-Type': 'Application/JSON',
            // Authorization: `Bearer ${token}`,
          },
        }
      )
      // console.log(data[0].products)
      const product = data[0].products
      let p = product.map((p) => {
        let name = p.id
        return name
      })
      this.products = p

      const mycart = this.cart
      let c = mycart.map((c) => {
        let id = c.product.id
        return id
      })
      this.mycart = c
    },
    Cart() {
      const mycart = this.mycart
      const products = this.products

      for (var i = 0; i < mycart.length; i++) {
        if (products.indexOf(mycart[i]) === -1) {
          this.removeProduct(mycart[i])
        }
      }
    },
    handleAddProduct(product) {
      this.addProduct(product)
    },
    handleSubtractProduct(id, quantity) {
      if (quantity > 1) {
        this.subtractProduct(id)
      }
    },
    handleRemoveProduct(id) {
      this.removeProduct(id)
    },
    handleClearCart() {
      this.clearCartData()
    },
    Back() {
      this.$router.go(-1)
    },
    total() {
      this.saveTotal(this.totalPrice)
    },
  },
  async mounted() {
    const storeAuth = StoreAuth.getStoreAuth()
    this.store = storeAuth
    try {
      await this.fetchData()
      this.Cart()
    } catch (err) {
      console.log(err)
      this.$router.push('/')
    }
  },
}
</script>
