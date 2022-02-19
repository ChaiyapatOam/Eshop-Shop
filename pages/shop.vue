<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-3">
        <a class="navbar-brand" href="#"> Bootstrap</a>
        <!-- <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!--  <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Home</a></li>
                    </ul>
                    
                    <form class="d-flex">
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi-cart-fill me-1"></i>
                            Cart
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form> --> 
        </div>
      </div>
     <CartSummary />
    </nav>
    <!-- Header-->
    <header class="bg-dark py-3">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h2 class="display-4 fw-bolder">ยินดีต้อนรับ</h2>
          <h1 class="display-4 fw-bolder">{{this.$route.params.id}} anime</h1>
          <p class="lead fw-normal text-white-50 mb-0">
            With this shop hompeage template
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
              <img
                class="card-img-top"
                :src="product.image"
                alt="..."
              />
              <!-- Product details-->
              <div class="card-body">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">{{product.name}}</h5>
                  <!-- Product price-->
                  <h6>ราคา {{product.price}} บาท</h6>
                   
                </div>
              </div>
              <!-- Product actions-->
              <div class=" text-center" style="margin-bottom: 20px;">
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
import CartSummary from '../components/CartSummary.vue'
export default {
  components: {
    CartSummary,
  },
    async asyncData({ $axios, params }) {
    const param = "anime" //params.id
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
}
</script>

<style scoped></style>
