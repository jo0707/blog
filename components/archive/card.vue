<script lang="ts" setup>
interface Props {
  path?: string
  title?: string
  date?: string
  description?: string
  image?: string
  alt?: string
  ogImage?: string
  tags?: Array<string>
  published?: boolean
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog.jpg',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog.jpg',
  tags: () => [],
  published: false,
})
</script>

<template>
  <UCard class="md:h-48 group rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    :ui="{ body: 'p-0 sm:p-0' }">
    <NuxtLink :to="path" class="grid grid-cols-1 md:grid-cols-10 gap-0 md:gap-1 min-h-[200px] md:h-40">
      <!-- Image Section -->
      <div class="md:col-span-3 h-36 md:h-full">
        <NuxtImg class="h-full w-full object-cover object-cover" width="300" :src="image" :alt="alt" />
      </div>

      <!-- Content Section -->
      <div class="md:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
        <div class="">
          <h2
            class="line-clamp-1 md:line-clamp-1 text-ellipsis text-lg sm:text-xl font-semibold text-black dark:text-slate-100 group-hover:text-gray-600 dark:group-hover:text-slate-600 leading-tight">
            {{ title }}
          </h2>
          <p
            class="mt-1 text-ellipsis line-clamp-1 md:line-clamp-1 text-sm sm:text-base text-gray-700 dark:text-slate-300 group-hover:text-gray-400 dark:group-hover:text-slate-600">
            {{ description }}
          </p>

          <!-- Tags -->
          <div class="mt-3 flex items-center gap-1 flex-wrap">
            <p v-for="tag in tags.slice(0, 3)" :key="tag"
              class="text-xs bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded px-2 py-1 font-semibold">
              {{ tag }}
            </p>
            <p v-if="tags.length > 3" class="text-xs text-gray-500 dark:text-slate-400">
              +{{ tags.length - 3 }} more
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex flex-row justify-between items-center pt-2 sm:space-y-0 max-md:mt-4">
          <div class="text-black dark:text-slate-100 group-hover:underline">
            <p class="text-sm sm:text-base font-medium">Read More</p>
          </div>
          <div class="text-gray-600 dark:text-slate-400 text-xs sm:text-sm">
            <p>{{ formatDate(date) }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </UCard>
</template>
