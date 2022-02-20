<template>
  <div class="float-right text-black">
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    />
    <!-- <a href="/cart"   class="text-white">   -->
    <div class="row text-black">
      <a href="/cart">
        <i class="bx bx-cart" style="font-size: 30px"></i>
      </a>
    </div>
    <!--<a href="/cart">  
      <fa icon="shopping-cart" style="font-size:24px" ></fa>        
      <span class="badge badge-warning" id="lblCartCount" v-if="itemCount > 0">
        {{ itemCount }}
      </span> 
    </a>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      itemCount: 'cart/itemCount',
      totalPrice: 'cart/totalPrice',
    }),
  },
}
</script>
<style scoped>
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 10px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#lblCartCount {
  font-size: 15px;
  background: #ff0000;
  color: #fff;
  padding: 0 3px;
  vertical-align: top;
  /* margin-left: 2px; */
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
