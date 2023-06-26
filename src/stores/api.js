import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
  const url = ref('https://ecommerceapi-production-a214.up.railway.app/api')

  return { url }
})
