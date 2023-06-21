import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
    const url = ref('http://localhost:8000/api')


  return { url }
})
