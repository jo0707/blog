<script setup lang="ts">
interface Props {
  title: string
  image: string
  alt: string
  description: string
  date: string
  tags: Array<string>
}

withDefaults(defineProps<Props>(), {
  title: 'no-title',
  image: '#',
  alt: 'no-img',
  description: 'no description',
  date: 'no-date',
  tags: () => [],
})
</script>

<template>
  <header>
    <h1 class="text-xl dark:text-slate-100 md:text-3xl lg:text-4xl m-7 font-bold text-center">
      {{ title || '' }}
    </h1>
    <NuxtImg :src="image || ''" :alt="alt || ''" width="600"
      class="m-auto rounded shadow h-32 md:h-72 w-4/6 md:w-4/5 content-center object-cover" />
    <p class="text-xs sm:text-sm my-3 max-w-xl mx-auto text-center text-zinc-600 dark:text-slate-400">
      {{ description }}
    </p>
    <div class="flex w-full justify-center text-xs md:text-base my-8">
      <div class="md:flex text-black dark:text-slate-100 content-center gap-8 text-xs sm:text-sm">
        <div class="flex items-center font-semibold">
          <UIcon name="mdi:calendar" class="w-4 h-4 mr-1" />
          <p>{{ date || '' }}</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap my-5">
          <template v-for="tag in tags" :key="tag">
            <NuxtLink :to="`/blogs?category=${tag.toLocaleLowerCase()}`">
              <span
                class="bg-gray-200 dark:bg-slate-900 rounded px-2 py-1 font-semibold hover:bg-gray-300 dark:hover:bg-slate-800 transition-colors duration-200">{{
                  tag }}</span>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
