<script setup lang="ts">
import { navbarData } from '../../data'

const colorMode = useColorMode()
function onClick(val: string) {
  colorMode.preference = val
}

const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="py-5 border-b bg-white dark:bg-slate-900 border-gray-300 dark:border-gray-800 font-semibold">
    <div class="flex px-6 container max-w-5xl justify-between mx-auto items-baseline">
      <ul class="flex items-baseline space-x-5">
        <li class="text-base sm:text-2xl font-bold">
          <NuxtLink to="/">
            {{ navbarData.homeTitle }}
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
        <li>
          <NuxtLink to="/" :class="{ underline: $route.path === '/' }">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/blogs" :class="{ underline: $route.path === '/blogs' }">Posts</NuxtLink>
        </li>
        <li title="About Me">
          <NuxtLink to="/about" aria-label="About me" :class="{ underline: $route.path === '/about' }">
            About
          </NuxtLink>
        </li>
        <li>
          <ClientOnly>
            <UButton :icon="colorMode.value === 'light' ? 'material-symbols:light-mode' : 'material-symbols:dark-mode'"
              variant="ghost" size="sm" color="neutral"
              :title="colorMode.value === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
              @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')" />
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20" />
            </template>
          </ClientOnly>
        </li>
      </ul>
    </div>
  </div>
</template>
