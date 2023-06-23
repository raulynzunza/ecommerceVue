<template>
  <section class="container flex flex-col">
    <form
      class="flex flex-col w-2/3 text-center gap-2 mb-10 box-border px-24 py-14 bg-[#ececec] rounded-xl"
      @submit="onSubmit"
      @keypress.enter="onSubmit"
    >
      <img src="../assets/logo.svg" alt="logo" class="w-[10rem] self-center" />
      <h1 class="title text-lg font-bold">Register to triangle shop!</h1>
      <input
        type="email"
        placeholder="name"
        class="bg-transparent placeholder:text-gray-dark p-2 border-b-2 border-pink focus:outline-none"
        v-model="name"
      />
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
        Register
      </button>
      <p class="my-3">
        Already have an account?
        <a href="/login" class="font-bold ml-2 text-pink">Login</a>
      </p>
      <AlertWarningComponent v-if="incorrectFlag" info="Email already in use" />
    </form>
  </section>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

import router from '../router'

const name = ref(null)
const email = ref(null)
const password = ref(null)
const incorrectFlag = ref(false)

const onSubmit = async (e) => {
  e.preventDefault()
  const params = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  await axios({
    url: 'http://localhost:8000/api/users',
    method: 'post',
    params: params
  })
    .then(() => {
      router.push('/login')
    })
    .catch(() => {
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
