<script lang="ts" setup>
import Fuse from 'fuse.js'
import type { BlogPost } from '~/types/blog'

const { data } = await useAsyncData('all-blog-post', () => queryCollection('content').all())

const elementPerPage = ref(5)
const pageNumber = ref(1)
const searchTest = ref('')
const selectedCategory = ref('')

const formattedData = computed(() => {
  return (
    data.value?.map((articles) => {
      const meta = articles.meta as unknown as BlogPost
      return {
        path: articles.path,
        title: articles.title || 'no-title available',
        description: articles.description || 'no-description available',
        image: meta.image || '/not-found.jpg',
        alt: meta.alt || 'no alter data available',
        ogImage: meta.ogImage || '/not-found.jpg',  
        date: (new Date(meta.date)).toLocaleDateString() || 'unknown-date',
        tags: meta.tags || [],
        published: meta.published || false,
      }
    }) || []
  )
})

const fuse = computed(() => {
  return new Fuse(formattedData.value, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.4,
    includeScore: false,
  })
})

// Get all unique categories/tags
const allCategories = computed(() => {
  const tags = formattedData.value.flatMap(post => post.tags || [])
  return [...new Set(tags)].sort()
})

// Filter data by category first, then search
const categoryFilteredData = computed(() => {
  if (!selectedCategory.value) {
    return formattedData.value
  }
  return formattedData.value.filter(post =>
    post.tags && post.tags.includes(selectedCategory.value)
  )
})

const searchData = computed(() => {
  if (!searchTest.value.trim()) {
    return categoryFilteredData.value
  }

  const fuse = new Fuse(categoryFilteredData.value, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.4,
    includeScore: false,
  })

  const results = fuse.search(searchTest.value)
  return results.map((result) => result.item)
})

const paginatedData = computed(() => {
  const startInd = (pageNumber.value - 1) * elementPerPage.value
  const endInd = pageNumber.value * elementPerPage.value

  return searchData.value.slice(startInd, endInd)
})

function onPreviousPageClick() {
  if (pageNumber.value > 1) pageNumber.value -= 1
}

const totalPage = computed(() => {
  const ttlContent = searchData.value.length || 0
  return Math.ceil(ttlContent / elementPerPage.value)
})

function onNextPageClick() {
  if (pageNumber.value < totalPage.value) pageNumber.value += 1
}

function filterByCategory(category: string) {
  selectedCategory.value = category
  pageNumber.value = 1 // Reset to first page when filtering
}

function clearFilters() {
  selectedCategory.value = ''
  searchTest.value = ''
  pageNumber.value = 1
}

// Reset page number when search changes
watch([searchTest, selectedCategory], () => {
  pageNumber.value = 1
})

useHead({
  title: 'Blog Archive',
  meta: [
    {
      name: 'description',
      content: 'Browse all blog posts by category or search through our complete archive of articles.',
    },
  ],
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: 'Blog Archive',
    description: 'Browse all blog posts by category or search through our complete archive of articles.',
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <ArchiveHero />
    <div class="px-4 max-md:mt-16">
      <UInput v-model="searchTest" placeholder="Search" size="lg" icon="material-symbols:search" class="w-full" />
    </div>

    <!-- Category Filter -->
    <div class="px-4 mt-6">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <h3 class="text-lg font-semibold text-zinc-800 dark:text-slate-100">Filter by Category:</h3>
        <UButton @click="clearFilters" variant="soft" color="neutral" size="xs">
          Clear All
        </UButton>
      </div>

      <div class="flex flex-wrap gap-2">
        <UButton :variant="selectedCategory === '' ? 'solid' : 'soft'" color="neutral" size="sm"
          @click="filterByCategory('')">
          All Posts ({{ formattedData.length }})
        </UButton>

        <UButton v-for="category in allCategories" :key="category"
          :variant="selectedCategory === category ? 'solid' : 'soft'" color="neutral" size="sm"
          @click="filterByCategory(category)">
          {{ category }} ({{formattedData.filter(post => post.tags?.includes(category)).length}})
        </UButton>
      </div>

      <!-- Active filters display -->
      <div v-if="selectedCategory || searchTest" class="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
        <div class="flex items-center gap-2 text-sm text-zinc-600 dark:text-slate-400">
          <span>Active filters:</span>
          <span v-if="selectedCategory"
            class="px-2 py-1 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 rounded">
            Category: {{ selectedCategory }}
          </span>
          <span v-if="searchTest"
            class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
            Search: "{{ searchTest }}"
          </span>
          <span class="ml-2 font-medium">{{ searchData.length }} post(s) found</span>
        </div>
      </div>
    </div>
    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in paginatedData" :key="post.title">
        <ArchiveCard :path="post.path" :title="post.title" :date="post.date" :description="post.description"
          :image="post.image" :alt="post.alt" :og-image="post.ogImage" :tags="post.tags" :published="post.published" />
      </template>

      <ArchiveCard v-if="paginatedData.length <= 0" title="No Post Found" image="/not-found.jpg" />
    </div>

    <div class="flex justify-center items-center space-x-6">
      <UButton :disabled="pageNumber <= 1" @click="onPreviousPageClick" variant="soft" color="neutral" size="sm"
        icon="i-mdi-chevron-left">
        Previous
      </UButton>

      <p class="text-sm font-medium">{{ pageNumber }} / {{ totalPage }}</p>

      <UButton :disabled="pageNumber >= totalPage" @click="onNextPageClick" variant="soft" color="neutral" size="sm"
        trailing-icon="i-mdi-chevron-right">
        Next
      </UButton>
    </div>
  </main>
</template>
