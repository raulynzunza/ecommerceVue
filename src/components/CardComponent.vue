<template>
  <article class="w-[100%] mb-16">
    <div class="card overflow-hidden h-full">
        <img :src="`${props.image.src}`" :alt="props.image.alt" class="w-full h-full object-cover hover:scale-105 cursor-pointer hover:ease-in-out duration-150">
    </div>
    <section class="flex justify-between items-center">
      <div>      
        <h3 class="text-lg font-extralight text-purple-hover">{{props.image.prenda}}</h3>
        <p class="text-xs">{{props.image.categoria}}</p>
        <p class="text-md text-pink">${{props.image.precio}}</p>
      </div>
      <div>
        <button class="text-gray-light bg-gray p-2 rounded hover:bg-gray-dark" @click="onClick"><i class="fa-solid fa-cart-plus"></i></button>
      </div>    
    </section>
  </article>
</template>

<script setup>
import { useCartStore } from '../stores/cartShop'
const props = defineProps(['image'])

const pinia = useCartStore()

const onClick = () => {
  pinia.changeCounterCart()
  pinia.changeProductsCart(props.image)
}

</script>
