<template>
  <main class="w-[80%] h-full mx-auto pt-32 flex">
    <section class="flex flex-col gap-4 w-[80%]">
      <div
        v-for="item in displayedProducts"
        :key="item.id"
        class="w-full h-full flex items-center gap-3"
      >
        <img :src="item.src" :alt="item.alt" class="w-[15%] h-full object-cover" />
        <div class="flex flex-col">
          <h3 class="text-[1.7rem] font-extralight text-purple-hover">{{ item.prenda }}</h3>
          <p class="text-[1rem]">{{ item.categoria }}</p>
          <h4 class="text-[1.5rem] text-pink">${{ item.precio }}</h4>
        </div>
      </div>
      <div class="flex items-center justify-between border-t0 bg-white px-4 py-3 sm:px-6">
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div></div>
          <div>
            <nav
              class="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <span
                v-if="page != 1"
                @click="page--"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:bg-gray cursor-pointer"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
              <span
                v-for="pageNumber in pages.slice(page - 1, page + 5)"
                :key="pageNumber"
                aria-current="page"
                @click="page = pageNumber"
                class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray cursor-pointer rounded"
              >
                {{ pageNumber }}
              </span>

              <span
                v-if="page < pages.length"
                @click="page++"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:bg-gray cursor-pointer"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="fixed">
        <h2 class="text-[2rem] font-bold text-gray-dark">Total:</h2>
        <h2 class="text-[2.3rem] font-extralight text-purple-hover">${{ total }}</h2>
        <button class="bg-purple hover:bg-purple-hover hover:text-gray-light rounded p-3 w-20">
          Pay
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useCartStore } from '../stores/cartShop'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const cart = useCartStore()
const total = ref(0)
const arrayProducts = ref([])
const page = ref(1)
const perPage = ref(5)
const pages = ref([])

const chargeProducts = () => {
  arrayProducts.value = [...cart.products]
}

const paginate = (products, actualPage, actualPerPage) => {
  let page = actualPage
  let perPage = actualPerPage
  let from = page * perPage - perPage
  let to = page * perPage
  return products.slice(from, to)
}

const setProducts = () => {
  let numberOfPages = Math.ceil(arrayProducts.value.length / perPage.value)
  for (let i = 1; i <= numberOfPages; i++) {
    pages.value.push(i)
  }
}

const displayedProducts = computed(() => {
  return paginate(arrayProducts.value, page.value, perPage.value)
})

onMounted(() => {
  cart.products.map((product) => {
    total.value = total.value + parseInt(product.precio)
  })
  chargeProducts()
})

watch(arrayProducts, setProducts)
</script>
