<template>
  <form @submit.prevent="submitForm" class="flex flex-col mt-12 w-1/3 mx-auto my-0">
    <h1 class="text-[1.7rem] self-center">Add new product</h1>
    <label for="name" class="mt-7">Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      v-model="name"
      class="bg-transparent placeholder:text-gray-dark p-2 border-b-2 border-pink focus:outline-none"
    />
    <label for="description" class="mt-7">Description:</label>
    <input
      type="text"
      name="description"
      id="description"
      v-model="description"
      class="bg-transparent placeholder:text-gray-dark p-2 border-b-2 border-pink focus:outline-none"
    />
    <label for="price" class="mt-7">Price:</label>
    <input
      type="number"
      name="price"
      id="price"
      v-model="price"
      class="bg-transparent placeholder:text-gray-dark p-2 border-b-2 border-pink focus:outline-none"
    />
    <label for="type" class="mt-7">Type:</label>
    <input
      type="text"
      name="type"
      id="type"
      v-model="type"
      class="bg-transparent placeholder:text-gray-dark p-2 border-b-2 border-pink focus:outline-none"
    />
    <label for="image" class="mt-7">Image:</label>
    <input
      type="file"
      name="file"
      id="file"
      @change="onFileChange"
      accept=".png, .jpg, .svg, .webp"
    />
    <button type="submit" class="rounded-full bg-pink text-white font-bold mt-6 box-border p-3">
      Submit
    </button>
  </form>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { uploadFile } from '../firebase/config.js'
import { useApiStore } from '../stores/api'

const file = ref()
const image = ref()
const piniaApi = useApiStore()
const name = ref()
const description = ref()
const price = ref()
const type = ref()

const onFileChange = (e) => {
  file.value = e.target.files[0]
}

const submitForm = async () => {
  try {
    image.value = await uploadFile(file.value)
    const params = {
      name: name.value,
      description: description.value,
      price: price.value,
      type: type.value,
      image: image.value
    }
    await axios.post(piniaApi.url + '/products', params).then((resp) => {
      console.log(resp)
    })
  } catch (e) {
    console.log(e)
  }
}
</script>
