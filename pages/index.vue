<script lang="ts" setup>
import { navbarData } from '~/data'

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Welcome To Joshua\'s Blog Site. Read all about technology, web development, and more!',
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Hi 👋',
  title: navbarData.homeTitle,
  description: 'Welcome To Joshua\'s Blog Site. Read all about technology, web development, and more!',
  link: '/profile.jpg',
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 sm:px-6 lg:px-8">
    <MainHero />
    <MainTrending />
  </main>
</template>
