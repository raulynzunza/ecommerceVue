import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const counterCart = ref(0)  
  const products = ref([])
  
  function changeCounterCart() {
    counterCart.value++  
  }

  function changeProductsCart(newProduct) {
    products.value.push(newProduct)
  }

  return { counterCart, changeCounterCart, products, changeProductsCart }
})
