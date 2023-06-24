<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center flex flex-col">
      <img src="../assets/logo.svg" alt="logo" class="w-[10rem] self-center" />
      <h1 class="title text-lg font-bold">Login to triangle shop!</h1>
    </div>

    <form
      class="mx-auto mb-0 mt-8 max-w-md space-y-4"
      @submit="onSubmit"
      @keypress.enter="onSubmit"
    >
      <div>
        <label for="email" class="sr-only">Email</label>

        <div class="relative">
          <input
            type="email"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-b-2 border-pink focus:outline-none"
            placeholder="Enter email"
            v-model="email"
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>

        <div class="relative">
          <input
            type="password"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-b-2 border-pink focus:outline-none"
            placeholder="Enter password"
            v-model="password"
            id="password"
          />

          <span
            class="absolute inset-y-0 end-0 grid place-content-center px-4"
            @click="seePassword"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          No account?
          <router-link class="underline" to="/register">Sign up</router-link>
        </p>

        <button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white bg-purple p-1 hover:bg-purple-hover"
        >
          Sign in
        </button>
      </div>
      <div class="flex flex-col">
        <AlertWarningComponent v-if="incorrectFlag" info="Incorrect email or password!" />
        <SpinnerComponent v-if="chargingFlag" class="self-center" />
      </div>
    </form>
  </div>
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

const seePassword = () => {
  var tipo = document.getElementById('password')
  if (tipo.type == 'password') {
    tipo.type = 'text'
  } else {
    tipo.type = 'password'
  }
}

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
        pinia.sessionFlag = true
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
