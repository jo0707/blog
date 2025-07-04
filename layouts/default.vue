<template>
  <div class="gd-container font-sans bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
    <header
      class="sticky top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <MainHeader />
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<style scoped>
.gd-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
