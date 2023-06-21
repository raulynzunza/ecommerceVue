<template>
  <form @submit.prevent="submitForm" class="flex flex-col items-center mt-24">
    <label for="name">Name:</label>
    <input type="text" name="name" id="name" v-model="name" />
    <label for="description">Description:</label>
    <input type="text" name="description" id="description" v-model="description" />
    <label for="price">Price:</label>
    <input type="number" name="price" id="price" v-model="price" />
    <label for="type">Type:</label>
    <input type="text" name="type" id="type" v-model="type" />
    <label for="image">Image:</label>
    <input type="file" name="" id="" @change="onFileChange" />
    <button type="submit" class="rounded-full bg-gray box-border p-3">Submit</button>
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
