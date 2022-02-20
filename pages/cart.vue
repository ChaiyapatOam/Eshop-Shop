<template>
  <div class="container">
    <div class="row bg-light py-3">
      <div class="col text-center">ตะกร้าสินค้า</div>
    </div>
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th scope="col">สินค้า</th>
          <th scope="col">ชิ้นละ</th>
          <th scope="col">จำนวน</th>
          <th scope="col">รวม</th>
          <th scope="col">ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="itemCount == 0">
          <td colspan="5" class="text-center">คุณไม่มีของในตะกร้า</td>
        </tr>
        <tr v-for="(c, i) in cart" :key="i">
          <td>
            <img :src="c.product.image" width="50" height="55" /> &nbsp; &nbsp;
            {{ c.product.name }}
          </td>
          <td>{{ c.product.price }}</td>
          <td>
            <!-- ลบ -->
            <i class='bx bx-minus' @click="handleSubtractProduct(c.product.id)" ></i>
            {{ c.quantity }}
            <!-- บวก -->
            <i class='bx bx-plus' @click="handleAddProduct(c.product)"></i>
          </td>

          <td>{{ c.product.price * c.quantity }}</td>
          <td>
            <button
              class="btn small btn-danger mx-1"
              @click="handleRemoveProduct(c.product.id)"
            >
              <fa icon="trash-can" />
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
export default {
  name: 'Pages',
  head() {
    return {
      title: 'รถเข็น',
    }
  },
  computed: {
    ...mapState({ cart: (state) => state.cart.cart }),
    ...mapGetters({
      itemCount: 'cart/itemCount',
      totalPrice: 'cart/totalPrice',
    }),
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
    handleAddProduct(product) {
      this.addProduct(product)
    },
    handleSubtractProduct(id) {
      this.subtractProduct(id)
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
}
</script>
