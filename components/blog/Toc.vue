<script setup lang="ts">
const props = defineProps<{
  articles: any
}>()

const tocOpen = inject('tocOpen', ref(true))
const toggleToc = inject('toggleToc', () => { })

const links = computed(() => {
  return props.articles?.body?.toc?.links || []
})

const activeHeading = ref('')

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    // Close TOC on mobile after clicking
    if (window.innerWidth < 1024) {
      tocOpen.value = false
    }
  }
}

const updateActiveHeading = () => {
  const headingElements = links.value
    .map((h: any) => document.getElementById(h.id))
    .filter(Boolean)

  for (let i = headingElements.length - 1; i >= 0; i--) {
    const rect = headingElements[i].getBoundingClientRect()
    if (rect.top <= 100) {
      activeHeading.value = headingElements[i].id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveHeading)
  updateActiveHeading()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<template>
  <aside
    class="toc-sidebar fixed right-0 w-64 h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto"
    :class="{ 'translate-x-0': tocOpen, 'translate-x-full': !tocOpen }">
    <UCard class="h-full rounded-none border-0">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class=" font-semibold">Table of Contents</h3>
          <UButton @click="toggleToc" icon="i-heroicons-x-mark" size="sm" variant="ghost" color="neutral"
            aria-label="Close TOC" />
        </div>
      </template>

      <div class="space-y-2">
        <div v-if="links.length === 0" class="text-sm text-gray-500 dark:text-gray-400">
          No headings found in this article.
        </div>
        <div v-else class="space-">
          <UButton v-for="link in links" :key="link.id" @click="scrollToHeading(link.id)"
            variant="link"
            color="neutral" size="sm" class="text-wrap h-auto py-2 cursor-pointer">
            <span :class="{'underline': activeHeading == link.id}" class="text-sm text-left leading-relaxed whitespace-normal">
              {{ link.text }}
            </span>
          </UButton>
        </div>
      </div>
    </UCard>
  </aside>
</template>
