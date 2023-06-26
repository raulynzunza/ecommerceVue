<template>
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center flex flex-col">
      <img src="../assets/logo.svg" alt="logo" class="w-[10rem] self-center" />
      <h1 class="title text-lg font-bold">Sign up to triangle shop!</h1>
    </div>

    <form
      class="mx-auto mb-0 mt-8 max-w-md space-y-4"
      @submit="onSubmit"
      @keypress.enter="onSubmit"
    >
      <div>
        <label for="email" class="sr-only">Name</label>

        <div class="relative">
          <input
            type="text"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-b-2 border-pink focus:outline-none"
            placeholder="Enter name"
            v-model="name"
          />
        </div>
      </div>

      <div>
        <label for="password" class="sr-only">Password</label>

        <div class="relative">
          <input
            type="email"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-b-2 border-pink focus:outline-none"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
      </div>
      <div class="relative">
        <input
          type="password"
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-b-2 border-pink focus:outline-none"
          placeholder="Enter password"
          v-model="password"
          id="password"
        />

        <span class="absolute inset-y-0 end-0 grid place-content-center px-4" @click="seePassword">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
            />
          </svg>
        </span>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          Already have an account?
          <router-link class="underline" to="/login">Log in</router-link>
        </p>

        <button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white bg-purple p-1 hover:bg-purple-hover"
        >
          Sign up
        </button>
      </div>
      <div class="flex flex-col">
        <AlertWarningComponent v-if="incorrectFlag" info="Email already in use!" />
        <SpinnerComponent v-if="chargingFlag" class="self-center" />
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import AlertWarningComponent from '../components/AlertWarningComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'

import router from '../router'
import { useApiStore } from '../stores/api'

const name = ref(null)
const email = ref(null)
const password = ref(null)
const incorrectFlag = ref(false)
const chargingFlag = ref(false)
const piniaApi = useApiStore()

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
    name: name.value,
    email: email.value,
    password: password.value
  }

  await axios({
    url: piniaApi.url + '/users',
    method: 'post',
    params: params,
    headers: {
      Accept: 'application/json'
    }
  })
    .then(() => {
      chargingFlag.value = false
      router.push('/login')
    })
    .catch(() => {
      chargingFlag.value = false
      incorrectFlag.value = true
    })
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
