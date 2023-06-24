<template>
  <nav
    class="absolute top-0 right-0 left-0 bottom-0 bg-[#561572e9] flex flex-col justify-center items-center z-10"
  >
    <div v-if="!pinia.sessionFlag" class="flex flex-col justify-center items-center">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Sign up</router-link>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/addProduct">New product</router-link>
      <router-link to="/">Log out</router-link>
    </div>
  </nav>
</template>

<script setup>
import { useSessionStore } from '../stores/session'

const pinia = useSessionStore()
</script>

<style></style>
