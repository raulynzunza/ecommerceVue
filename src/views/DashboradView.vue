<template>
  <main class="flex justify-center items-center mt-10">
    <Spinner v-if="charging" />
    <div
      v-else
      class="w-[80%] h-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center items-center gap-3"
    >
      <CardComponent v-for="item in products" :key="item.id" :image="item" />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CardComponent from '../components/CardComponent.vue'
import router from '../router'
import Spinner from '../components/SpinnerComponent.vue'
import axios from 'axios'
import { useApiStore } from '../stores/api'

const products = ref([])
const charging = ref(false)
const piniaApi = useApiStore()

onMounted(async () => {
  if (!localStorage.getItem('userId')) {
    router.push('/')
  }
  charging.value = true
  await axios.get(piniaApi.url + '/products').then((resp) => {
    charging.value = false
    products.value = resp.data
  })
})
</script>

<style scoped></style>
