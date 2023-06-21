<template>
  <nav class="flex justify-between max-w-[80%] mx-auto items-center">
    <img
      src="../assets/logo.svg"
      alt="logo"
      class="w-[5rem] cursor-pointer"
      @click="router.push('/')"
    />
    <div class="flex items-center gap-6" v-if="!pinia.sessionFlag">
      <p @click="router.push('/register')" class="cursor-pointer py-1 px-2 hover:bg-gray rounded">
        Register
      </p>
      <router-link to="/login" class="text-gray-light bg-pink p-2 rounded-lg hover:bg-pink-hover"
        >Login</router-link
      >
    </div>
    <div class="flex gap-6 items-center" v-else>
      <router-link to="/dashboard" class="rounded hover:bg-gray p-1">DASHBOARD</router-link>
      <router-link to="/addProduct" class="rounded hover:bg-gray p-1">NEW PRODUCT</router-link>
      <div
        class="flex items-center gap-6 bg-pink p-2 rounded hover:cursor-pointer hover:bg-pink-hover bg-pink-not-hover"
        @click="cartClick"
      >
        <i class="fa-solid fa-cart-shopping text-gray-light text-xl"></i>
        <span class="text-gray-light font-bold">{{ cartCounter.counterCart }}</span>
      </div>
      <span>{{ pinia.userName }}</span>
      <button
        @click="logout"
        class="text-pink-hover rounded p-3 text-xl hover:bg-gray hover:text-gray-dark"
      >
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span class="ml-3">Log out</span>
      </button>
    </div>
  </nav>
  <Modal v-if="logoutFlag" info="Are you sure you want to log out?" @to-do="confirm" />
</template>

<script setup>
import { useCartStore } from '../stores/cartShop'
import router from '../router'
import { onMounted, ref } from 'vue'
import { useSessionStore } from '../stores/session'
import Modal from '../components/ModalComponent.vue'

const cartCounter = useCartStore()
const pinia = useSessionStore()
const logoutFlag = ref(false)

const cartClick = () => {
  router.push('/cart')
}

const logout = () => {
  logoutFlag.value = true
}

const session = () => {
  if (localStorage.getItem('userId') !== undefined) {
    pinia.sessionFlag = false
  } else {
    pinia.sessionFlag = true
  }
}

const confirm = () => {
  logoutFlag.value = false
  localStorage.clear()
  session()
  pinia.sessionFlag = false
  router.push('/')
}

onMounted(() => {
  pinia.sessionFlag = localStorage.getItem('session')
  pinia.userName = localStorage.getItem('userName')
})
</script>

<style scoped></style>
