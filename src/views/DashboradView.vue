<template>
  <div class="w-[80%] pt-32 mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3">    
    <CardComponent v-for="item in mainPictures" :key="item.id" :image=item />   
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import CardComponent from '../components/CardComponent.vue'
import { mainPictures } from '../mocks/index'
import router from '../router'

onMounted(() => {
  if(!localStorage.getItem('userId')){
    router.push('/')
  }
})

</script>

<style scoped>

</style>