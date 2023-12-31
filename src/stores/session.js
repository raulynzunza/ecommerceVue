import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const sessionFlag = ref(false)  
  const userName = ref('')
  
  function changeFlagSession() {
    if(sessionFlag.value) {
      sessionFlag.value = false
    }
    else {
      sessionFlag.value = true
    }    
  }


  return { sessionFlag, changeFlagSession, userName }
})
