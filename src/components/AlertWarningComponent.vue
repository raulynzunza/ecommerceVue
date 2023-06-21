<template>
  <div
    class="flex p-4 mb-4 text-sm text-gray-light border border-gray-light rounded-lg bg-gray-light dark:bg-red dark:text-gray-light dark:border-gray-light"
    role="alert"
  >
    <svg
      aria-hidden="true"
      class="flex-shrink-0 inline w-5 h-5 mr-3"
      fill="#d3dce6"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="font-bold">Email or password is incorrect</span>
    </div>
  </div>
</template>

<script setup></script>
