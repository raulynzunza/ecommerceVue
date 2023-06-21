<template>
  <section class="container flex flex-col">
    <form
      class="flex flex-col w-full text-center gap-2 mb-10"
      @submit="onSubmit"
      @keypress.enter="onSubmit"
    >
      <h1 class="title">Login to platform</h1>
      <input
        type="email"
        placeholder="email"
        class="bg-transparent placeholder:text-gray-dark p-2 border rounded"
        v-model="email"
      />
      <input
        type="password"
        placeholder="password"
        class="bg-transparent placeholder:text-gray-dark p-2 border rounded"
        v-model="password"
      />
      <button class="bg-purple rounded p-1 hover:bg-purple-hover hover:text-gray-light">
        Login
      </button>
      <AlertWarningComponent v-if="incorrectFlag" info="Incorrect email or password!" />
    </form>
    <SpinnerComponent v-if="chargingFlag" />
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
