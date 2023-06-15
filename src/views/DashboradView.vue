<template>
  <div class="w-[80%] mx-auto mt-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3">    
    <CardComponent v-for="item in mainPictures" :key="item.id" :image=item />   
  </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue'
import { mainPictures } from '../mocks/index'
</script>

<style scoped>

</style>