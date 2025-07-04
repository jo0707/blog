<script setup lang="ts">
import { blogsPage } from '~/data'
import RunningText from '../main/RunningText.vue';
</script>

<template>
  <div class="container mx-auto mb-8 md:py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 max-md:text-center items-center">
      <div class="px-6">
        <RunningText :text="blogsPage.title"
          class="text-black dark:text-slate-100 font-semibold leading-tight text-4xl md:text-5xl max-md:mb-2 my-5" />
        <p class="dark:text-slate-100">
          {{ blogsPage.description }}
        </p>
      </div>
    </div>
  </div>
</template>
