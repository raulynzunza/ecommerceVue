<template>
  <header class="bg-transparent">
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center justify-between md:justify-between">
        <router-link class="block text-teal-600" to="/">
          <img src="../assets/logo.svg" alt="logo" class="w-[5rem] cursor-pointer" />
        </router-link>
        <nav aria-label="Global" class="hidden md:block" v-if="pinia.sessionFlag">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <router-link class="text-gray-500 transition hover:text-gray-500/75" to="/dashboard">
                Dashboard
              </router-link>
            </li>

            <li>
              <router-link class="text-gray-500 transition hover:text-gray-500/75" to="/addProduct">
                New product
              </router-link>
            </li>
            <li
              class="flex items-center gap-6 bg-pink p-2 rounded hover:cursor-pointer hover:bg-pink-hover bg-pink-not-hover"
              @click="cartClick"
            >
              <i class="fa-solid fa-cart-shopping text-gray-light text-xl"></i>
              <span class="text-gray-light font-bold">{{ cartCounter.counterCart }}</span>
            </li>
            <button
              @click="logout"
              class="text-pink-hover rounded p-3 hover:bg-gray hover:text-gray-dark text-gray-500 transition hover:text-gray-500/75"
            >
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span class="ml-3">Log out</span>
            </button>
          </ul>
        </nav>

        <div class="flex items-center gap-4" v-else>
          <div class="sm:flex sm:gap-4">
            <router-link
              class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-dark transition hover:text-black sm:block"
              to="/register"
            >
              Register
            </router-link>
            <router-link
              class="hidden rounded-md bg-pink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-pink-hover sm:block"
              to="/login"
            >
              Login
            </router-link>
          </div>
        </div>
        <button
          class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden relative z-20"
          @click="toggleClick"
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    <ToggleMenu v-if="toggle" />
  </header>
  <Modal v-if="logoutFlag" info="Are you sure you want to log out?" @to-do="confirm" />
</template>

<script setup>
import { useCartStore } from '../stores/cartShop'
import router from '../router'
import { onMounted, ref } from 'vue'
import { useSessionStore } from '../stores/session'
import Modal from '../components/ModalComponent.vue'
import ToggleMenu from './ToggleMenu.vue'

const cartCounter = useCartStore()
const pinia = useSessionStore()
const logoutFlag = ref(false)
const toggle = ref(false)

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

const toggleClick = () => {
  toggle.value ? (toggle.value = false) : (toggle.value = true)
}

onMounted(() => {
  pinia.sessionFlag = localStorage.getItem('session')
  pinia.userName = localStorage.getItem('userName')
})
</script>

<style scoped></style>
