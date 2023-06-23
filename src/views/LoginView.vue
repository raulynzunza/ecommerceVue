<template>
  <section class="container flex flex-col">
    <form
      class="flex flex-col w-2/3 text-center gap-2 mb-10 box-border px-24 py-14 bg-[#ececec] rounded-xl"
      @submit="onSubmit"
      @keypress.enter="onSubmit"
    >
      <img src="../assets/logo.svg" alt="logo" class="w-[10rem] self-center" />
      <h1 class="title text-lg font-bold">Login to triangle shop!</h1>
      <input
        type="email"
        placeholder="email"
        class="bg-transparent placeholder:text-gray-dark p-2 my-5 border-b-2 border-pink focus:outline-none"
        v-model="email"
      />
      <input
        type="password"
        placeholder="password"
        class="bg-transparent placeholder:text-gray-dark p-2 mb-4 border-b-2 border-pink focus:outline-none"
        v-model="password"
      />
      <button class="h-10 bg-purple rounded p-1 hover:bg-purple-hover text-gray-light font-bold">
        Login
      </button>
      <p class="my-3">
        Don't have an accound?
        <a href="/register" class="font-bold ml-2 text-pink">Create</a>
      </p>
      <AlertWarningComponent v-if="incorrectFlag" info="Incorrect email or password!" />
      <SpinnerComponent v-if="chargingFlag" class="self-center" />
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'
import { useSessionStore } from '../stores/session.js'
import { useApiStore } from '../stores/api.js'
import axios from 'axios'
import AlertWarningComponent from '../components/AlertWarningComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { useCartStore } from '../stores/cartShop'

const email = ref(null)
const password = ref(null)
const incorrectFlag = ref(false)
const chargingFlag = ref(false)
const pinia = useSessionStore()
const piniaApi = useApiStore()
const piniaCart = useCartStore()

const onSubmit = async (e) => {
  e.preventDefault()
  chargingFlag.value = true
  const params = {
    email: email.value,
    password: password.value
  }

  try {
    await axios({
      url: piniaApi.url + '/users/findUser',
      method: 'get',
      params: params
    })
      .then(async (resp) => {
        localStorage.setItem('session', true)
        pinia.userName = resp.data.name
        localStorage.setItem('userName', resp.data.name)
        localStorage.setItem('userEmail', resp.data.email)
        localStorage.setItem('userId', resp.data.id)
        localStorage.setItem('session', true)
        incorrectFlag.value = false
        pinia.sessionFlag = localStorage.getItem('session')
        chargingFlag.value = false
        await axios
          .get(piniaApi.url + '/cart/products/' + localStorage.getItem('userId'))
          .then((resp) => {
            piniaCart.products = resp.data
            piniaCart.countProductsCart()
          })
        router.push('/dashboard')
      })
      .catch(() => {
        chargingFlag.value = false
        incorrectFlag.value = true
      })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 50%;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
