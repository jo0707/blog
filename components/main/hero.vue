<script setup lang="ts">
import RunningText from './RunningText.vue';

</script>

<template>
  <div class="container mx-auto h-[32rem]">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center place-items-center h-full">
      <div class="px-6">
        <RunningText text="Joshua's Writings" :speed="50"
          class="text-black dark:text-slate-100 font-semibold leading-tight text-4xl md:text-5xl my-5">

        </RunningText>
        <p class="dark:text-slate-100 text-lg">
          Writing the journey of building, breaking, and learning in technology
        </p>
      </div>
      <div class="px-6 justify-self-center">
      </div>
    </div>
  </div>
</template>
