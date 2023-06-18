<template>
  <section class="flex w-[50%] mx-auto my-0 h-[100vh] justify-center items-center">
    <form
      class="flex flex-col w-full text-center gap-2"
      @submit="onSubmit"
      @keypress.enter="onSubmit"
    >
      <h1>Register to platform</h1>
      <input
        type="text"
        placeholder="Name"
        class="bg-transparent placeholder:text-gray-dark p-2 border rounded"
        v-model="name"
      />
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
      <div v-if="incorrectFlag" class="bg-red">
        <p class="text-gray-light">Email already in use</p>
      </div>
    </form>
  </section>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"

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
  }).then(() => {
    router.push('/login')
  })
  .catch(() => {
    incorrectFlag.value = true    
  })
}
</script>

<style scoped>

</style>