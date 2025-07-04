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

        <!-- Mobile Navigation Button -->
        <div class="sm:hidden">
          <UButton icon="heroicons:bars-3" variant="ghost" size="sm" color="neutral" @click="toggleMobileMenu"
            :aria-expanded="isMobileMenuOpen" aria-label="Toggle mobile menu" />
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

    <!-- Mobile Navigation Menu -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-show="isMobileMenuOpen"
        class="sm:hidden border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-slate-900">
        <div class="px-4 py-3 space-y-1">
          <NuxtLink to="/" @click="closeMobileMenu"
            :class="{ 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white': $route.path === '/' }"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Icon name="heroicons:home" class="inline w-5 h-5 mr-2" />
            Home
          </NuxtLink>
          <NuxtLink to="/blogs" @click="closeMobileMenu"
            :class="{ 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white': $route.path === '/blogs' }"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Icon name="heroicons:document-text" class="inline w-5 h-5 mr-2" />
            Posts
          </NuxtLink>
          <NuxtLink to="/about" @click="closeMobileMenu"
            :class="{ 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white': $route.path === '/about' }"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Icon name="heroicons:user" class="inline w-5 h-5 mr-2" />
            About
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
