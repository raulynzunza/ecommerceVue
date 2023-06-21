<template>
  <Navbar />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/NavbarComponent.vue'
import './assets/main.css'
import { useCartStore } from './stores/cartShop'
import { useApiStore } from './stores/api'
import { onMounted } from 'vue'
import axios from 'axios'

const piniaCart = useCartStore()
const piniaApi = useApiStore()

onMounted(async () => {
  if (localStorage.getItem('userId')) {
    await axios
      .get(piniaApi.url + '/cart/products/' + localStorage.getItem('userId'))
      .then((resp) => {
        piniaCart.products = resp.data
        piniaCart.countProductsCart()
      })
  }
})
</script>

<style scoped></style>
