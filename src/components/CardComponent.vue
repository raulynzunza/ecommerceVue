<template>
  <article class="w-[100%] h-[70%] mb-16">
    <div class="card overflow-hidden h-full">
      <img
        loading="lazy"
        width="500"
        height="800"
        :src="props.image.image"
        :alt="props.image.name"
        class="w-full h-full object-cover hover:scale-105 cursor-pointer hover:ease-in-out duration-150"
      />
    </div>
    <section class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-extralight text-purple-hover">{{ props.image.name }}</h3>
        <p class="text-xs">{{ props.image.type }}</p>
        <p class="text-xs">{{ props.image.description }}</p>
        <p class="text-md text-pink">${{ props.image.price }}</p>
      </div>
      <div>
        <button class="text-gray-light bg-gray p-2 hover:bg-gray-dark" @click="onClick">
          <i class="fa-solid fa-cart-plus"></i>
          <span class="sr-only">Add to cart</span>
        </button>
      </div>
    </section>
  </article>
</template>

<script setup>
import axios from 'axios'
import { useCartStore } from '../stores/cartShop'
import { useApiStore } from '../stores/api'

const props = defineProps(['image'])

const pinia = useCartStore()
const piniaApi = useApiStore()

const onClick = async () => {
  const params = {
    user_id: localStorage.getItem('userId'),
    product_id: props.image.id
  }
  await axios.post(piniaApi.url + '/cart', params)
  pinia.changeCounterCart()
  pinia.changeProductsCart(props.image)
}
</script>
