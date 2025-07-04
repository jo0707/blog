<template>
  <article
    class="group border dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 text-zinc-700 mx-auto max-w-md">
    <NuxtLink to="/" class="block">
      <div
        class="h-32 sm:h-40 md:h-48 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300">
        <LogoConfused class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
      </div>
      <div class="p-4 sm:p-5 text-center">
        <h2
          class="text-xl sm:text-2xl lg:text-3xl font-semibold text-black dark:text-slate-100 pb-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
          No Posts Available
        </h2>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
          Check back later for new content
        </p>
        <div
          class="flex justify-center group-hover:underline text-sky-700 dark:text-sky-400 items-center transition-colors">
          <span class="text-sm sm:text-base mr-1">Back To Home</span>
          <LogoArrow class="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
