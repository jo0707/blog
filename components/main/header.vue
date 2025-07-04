<script setup lang="ts">
import { navbarData } from '../../data'

const colorMode = useColorMode()
colorMode.preference = 'light' // default color mode

function onClick(val: string) {
  colorMode.preference = val
}

const route = useRoute()
function isActive(path: string) {
  return route.path.startsWith(path)
}

// Mobile menu state
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>

<template>
  <div
    class="py-3 sm:py-5 border-b bg-white dark:bg-slate-900 border-gray-300 dark:border-gray-800 font-semibold sticky top-0 z-50">
    <div class="flex px-4 sm:px-6 container max-w-5xl justify-between mx-auto items-center">
      <!-- Logo/Title -->
      <div class="flex-shrink-0">
        <NuxtLink to="/"
          class="text-lg sm:text-xl lg:text-2xl font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          {{ navbarData.homeTitle }}
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
        <!-- Desktop Navigation -->
        <ul class="hidden sm:flex items-center space-x-4 lg:space-x-6 text-sm lg:text-base">
          <li>
            <NuxtLink to="/" :class="{ 'underline decoration-2 underline-offset-4': $route.path === '/' }"
              class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-2 py-1">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blogs" :class="{ 'underline decoration-2 underline-offset-4': $route.path === '/blogs' }"
              class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-2 py-1">
              Posts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" aria-label="About me"
              :class="{ 'underline decoration-2 underline-offset-4': $route.path === '/about' }"
              class="hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-2 py-1" title="About Me">
              About
            </NuxtLink>
          </li>
        </ul>

        <!-- Mobile Navigation -->
        <div class="sm:hidden">
          <UDropdown :items="[
            [
              { label: 'Home', to: '/', icon: 'heroicons:home' },
              { label: 'Posts', to: '/blogs', icon: 'heroicons:document-text' },
              { label: 'About', to: '/about', icon: 'heroicons:user' }
            ]
          ]">
            <UButton icon="heroicons:bars-3" variant="ghost" size="sm" color="neutral" />
          </UDropdown>
        </div>

        <!-- Theme Toggle -->
        <div class="flex-shrink-0">
          <ClientOnly>
            <UButton :icon="colorMode.value === 'light' ? 'material-symbols:light-mode' : 'material-symbols:dark-mode'"
              variant="ghost" size="sm" color="neutral"
              :title="colorMode.value === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
              @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')" />
            <template #fallback>
              <Icon name="svg-spinners:180-ring" size="20" />
            </template>
          </ClientOnly>
        </div>
      </nav>
    </div>
  </div>
</template>
