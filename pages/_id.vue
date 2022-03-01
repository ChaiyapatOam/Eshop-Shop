<template>
  <div>
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container px-4 px-lg-3">
        <a class="navbar-brand" href="#"> {{ this.$route.params.id }}</a>
        <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
        </div> -->
        <div class="float-right">
          <button class="btn btn-outline-dark" @click="cart">
            <i class="bx bx-cart" style="font-size: 26px"></i>
            <span class="badge badge-warning bg-dark text-white ms-1 rounded-pill" id="lblCartCount">{{itemCount}}</span>
          </button>
        </div>
      </div>

      <!-- <CartSummary /> -->
    </nav>
    <!-- Header-->
    <header class="bg-dark py-3">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h2 class="display-4 fw-bolder" v-if="products">
            ยินดีต้อนรับสู่ร้าน
          </h2>
          <h1 class="display-4 fw-bolder" v-if="products">
            {{ this.$route.params.id }}
          </h1>
          <h2 class="display-4 fw-bolder" v-else>
            ขออภัยไม่พบร้านค้า หรือ ร้านค้าปิดอยู่
          </h2>
          <p class="lead fw-normal text-white-50 mb-0">
            <!-- Text -->
          </p>
        </div>
      </div>
    </header>
    <!-- Section-->
    <!-- <section class="py-15"> -->
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <!-- Product Card -->
        <div class="col mb-5" v-for="(product, index) in products" :key="index">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" :src="product.image" alt="..." />

            <!-- Product details-->
            <div class="card-body">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{ product.name }}</h5>

                <!-- Product price-->
                <h6>ราคา {{ product.price }} บาท</h6>
              </div>
            </div>
            <!-- Product actions-->
            <div class="text-center" style="margin-bottom: 20px">
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
    <!-- </section> -->
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: this.store,
    }
  },
  async asyncData({ $axios, params }) {
    const param = params.id
    try {
      let response = await $axios.$get(
        `https://ai-ani.me/api/v1/store/${param}`
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
    cart() {
      this.$router.push('/cart')
    },
  },
  computed: {
    ...mapState({
      store: (state) => state.cart.store,
    }),
    ...mapGetters({
      itemCount: 'cart/itemCount',
    }),
  },
  async mounted() {
    await this.clearStore()
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
.d-flex {
  display: flex !important;
}
 .badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
}
.badge:empty {
  display: none;
}

.btn .badge {
  position: relative;
  top: -1px;
} 

/* .badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
} */

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
    font-size: 12px;
    background: #ff0000;
    color: #fff;
    padding: 3 3px;
    vertical-align: top;
    margin-left: -10px; 
}
</style>
