<template>  
  <Navbar /> 
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/NavbarComponent.vue'
import './assets/main.css'

</script>

<style scoped>
</style>