<script setup lang="ts">
import RunningText from './RunningText.vue';

</script>

<template>
  <div class="container mx-auto md:h-[32rem] flex items-center">
    <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 w-full py-20 md:py-12">
      <div class="text-center col-span-2 lg:text-left order-2 lg:order-1">
        <RunningText text="Joshua's Writings" :speed="50"
          class="text-black dark:text-slate-100 font-semibold leading-tight text-3xl sm:text-4xl md:text-5xl my-4 md:my-5">
        </RunningText>
        <p class="dark:text-slate-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
          Writing the journey of building, breaking, and learning in technology
        </p>
      </div>
      <!-- <div class="px-4 sm:px-6 flex justify-center lg:justify-end order-1 lg:order-2">
        <img src="/img/logo.jpg" alt="Hero Image" class="w-full max-w-md rounded-lg shadow-lg">
      </div> -->
    </div>
  </div>
</template>
