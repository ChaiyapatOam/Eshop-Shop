<template>
  <main>
    <Header></Header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1>สินค้าทั้งหมด</h1>
          <div class="a-spacing-large"></div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div
          v-for="product in products"
          :key="product._id"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-5 col-4 br bb"
        >
          <div class="history-box">
            <!-- Product image -->

            <img :src="product.image" class="img-fluid ratio" />

            <!-- Product Title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{ product.name }}</div>
              </span>
            </div>

            <!-- Product Price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">ราคา {{ product.price }} บาท</span>
              </span>
            </div>
            <!-- Product Button  -->
            <div class="a-row">
              <button class="btn btn-primary" @click="AddProduct(product)">
                เพิ่มลงตะกร้า
              </button>
              <button class="btn btn-success" @click="Buynow(product)">
                ซื้อเลย
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from '../components/Header.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  async asyncData({ $axios, params }) {
    const param = params.id
    try {
      let response = await $axios.$get(
        `http://localhost:3000/api/v1/store/${param}`
      )
      // console.log(response)
      // console.log(response[0].products)
      return {
        param: param,
        products: response[0].products,
      }
    } catch (err) {}
  },
  component: {
    Header,
  },
  methods: {
    // ...mapActions({ initializeCart: "cart/initializeCart"}),
    ...mapActions({
      clearCartData: 'cart/clearCartData',
      clearStore: 'cart/clearStore',
      saveStore: 'cart/saveStore',
    }),
    ...mapMutations({
      addProduct: 'cart/addProduct',
    }),
    AddProduct(product) {
      this.addProduct(product)
    },
    Buynow(product) {
      this.addProduct(product)
      this.$router.push('/cart')
    },
    Store() {
      if (this.store != this.$route.params.id) {
      this.clearCartData()
        this.clearStore()
      }
      console.log(this.store)
    },
  },
  computed: {
    ...mapState({
      store: (state) => state.cart.store,
    }),
  },
  created() {
    // console.log(this.store)
  },
   mounted() {
     this.Store()
    this.saveStore(this.$route.params.id)
  },
}
</script>

<style scoped>
.ratio {
  aspect-ratio: auto 4 / 3;

  height: 120px;
  background-size: cover;
  background-position: center;
}
</style>
