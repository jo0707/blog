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
    <div class="w-4/6 md:w-4/5 m-auto">
      <NuxtImg :src="image || ''" :alt="alt || ''" width="600"
        class="w-full rounded shadow h-32 md:h-72  content-center object-cover" />
      <div class="flex gap-2 place-content-between mt-2">

        <div class="flex place-content-center gap-1 flex-wrap">
          <NuxtLink v-for="tag in tags" :key="tag" :to="`/blogs?category=${tag.toLocaleLowerCase()}`">
            <span
              class="text-xs bg-gray-200 dark:bg-slate-900 rounded px-2 py-1 font-semibold hover:bg-gray-300 dark:hover:bg-slate-800 transition-colors duration-200">{{
                tag }}</span>
          </NuxtLink>
        </div>
        <p class="text-zinc-600 dark:text-slate-100 text-sm self-center">{{ date || '' }}</p>
      </div>
    </div>

    <div class="flex flex-col py-4">
      <p class=" italic text-sm sm:text-base max-w-xl mx-auto text-center text-zinc-800 dark:text-slate-300">
        {{ description }}
      </p>


    </div>
  </header>
</template>
