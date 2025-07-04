<script setup lang="ts">
import { MainRunningText } from '#components';

const showAnswer = ref(false);

onMounted(() => {
  setTimeout(() => {
    showAnswer.value = true;
  }, 2500);
})

useHead({
  title: '404',
  meta: [
    {
      name: 'description',
      content: 'Page not found',
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Wrong Path',
  title: '404',
  description: 'Page Not Found',
})
</script>

<template>
  <div class="container grid place-content-center max-w-3xl h-full mx-auto">
    <div class="text-center"></div>
    <div class="text-8xl font-bold text-gray-300 mb-8 select-none">404</div>
    <MainRunningText :speed="35" class="text-lg text-gray-600" text="Is this a 404 or a feature in beta?" />
    <MainRunningText v-if="showAnswer" :speed="50" class="text-lg text-gray-800 font-medium" text="Yes." />
  </div>
</template>
