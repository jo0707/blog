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
  <UCard class="group h-40 rounded-none" :ui="{ body: 'p-0 sm:p-0' }">
    <NuxtLink :to="path" class="grid grid-cols-1 sm:grid-cols-10 gap-1 h-full">
      <div class="sm:col-span-3">
        <NuxtImg class="h-full w-full object-cover object-center transition-all duration-500" width="300" :src="image"
          :alt="alt" />
      </div>
      <div class="sm:col-span-7 p-5">
        <h2
          class="text-xl font-semibold text-black dark:text-slate-100 group-hover:text-gray-600 dark:group-hover:text-slate-600">
          {{ title }}
        </h2>
        <p
          class="text-ellipsis line-clamp-1 text-gray-700 dark:text-slate-300 group-hover:text-gray-400 dark:group-hover:text-slate-600">
          {{ description }}
        </p>

        <div class="flex items-center gap-1 flex-wrap mt-1">
          <p v-for="tag in tags" :key="tag"
            class="text-xs bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-slate-200 rounded px-[8px] py-[4px] font-semibold">
            {{ tag }}
          </p>
        </div>
        <div class="grow"></div>
        <div class="flex place-content-between group-hover:underline text-sky-700 dark:text-sky-400 items-center pt-2">
          <div class="text-black dark:text-slate-100 flex place-content-center justify-center">
            <p>Read More</p>
          </div>
          <div>
            <div class="text-gray-600 dark:text-slate-100 text-sm mt-2 mb-1 md:flex md:space-x-6">
              <div class="flex items-center">
                <p>{{ date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </UCard>
</template>
