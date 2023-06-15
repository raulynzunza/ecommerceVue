<template>
  <nav class="flex justify-between max-w-[80%] mx-auto items-center">
    <img src="../assets/logo.svg" alt="logo" class="w-[5rem] cursor-pointer" @click="router.push('/')"/>
    <div class="flex items-center gap-6" v-if="pinia.sessionFlag">
      <p>Register</p>
      <router-link to="/login" class="text-gray-light bg-pink p-2 rounded-lg hover:bg-pink-hover">Login</router-link>
    </div>
    <div class="flex gap-6 items-center" v-if="!pinia.sessionFlag">
      <router-link to="/dashboard" class="rounded hover:bg-gray p-1">DASHBOARD</router-link>
      <div class="flex items-center gap-6 bg-pink p-2 rounded hover:cursor-pointer hover:bg-pink-hover" @click="cartClick">
        <i class="fa-solid fa-cart-shopping text-gray-light text-xl"></i>
        <span class="text-gray-light font-bold">{{cartCounter.counterCart}}</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSessionStore } from '../stores/session.js'
import { useCartStore } from '../stores/cartShop'
import router from '../router'

const pinia = useSessionStore()
const cartCounter = useCartStore()

const cartClick = () => {
  router.push('/cart')
}

</script>

<style scoped>

</style>
