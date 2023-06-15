<template>
  <section class="container">
    <form class="flex flex-col w-full text-center gap-2" @submit="onSubmit" @keypress.enter="onSubmit">
      <h1>Login to platform</h1>
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
        <p class="text-gray-light">Incorrect email / passwod</p>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { users } from '../mocks'
import router from '../router'
import { useSessionStore } from '../stores/session.js'

const email = ref(null)
const password = ref(null)
const incorrectFlag = ref(false)
const pinia = useSessionStore()

const onSubmit = (e) => {
  e.preventDefault()
  users.map((user) => {
    if (user.email == email.value && user.password == password.value) {
      incorrectFlag.value = false
      pinia.changeFlagSession()
      router.push('/dashboard')
    } else {
      incorrectFlag.value = true
    }
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
