<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import { navbarData, seoData } from '~/data'

const { path } = useRoute()

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () =>
  queryCollection('content').path(path).first(),
)

if (error.value) navigateTo('/404')

const data = computed<BlogPost>(() => {
  const meta = articles?.value?.meta as unknown as BlogPost
  return {
    title: articles.value?.title || 'no-title available',
    description: articles.value?.description || 'no-description available',
    image: meta?.image || '/not-found.jpg',
    alt: meta?.alt || 'no alter data available',
    ogImage: (articles?.value?.ogImage as unknown as string) || '/not-found.jpg',
    date: meta?.date || 'not-date-available',
    tags: meta?.tags || [],
    published: meta?.published || false,
  }
})

useHead({
  title: data.value.title || '',
  meta: [
    { name: 'description', content: data.value.description },
    {
      name: 'description',
      content: data.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: navbarData.homeTitle },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      property: 'og:title',
      content: data.value.title,
    },
    {
      property: 'og:description',
      content: data.value.description,
    },
    {
      property: 'og:image',
      content: data.value.ogImage || data.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@qdnvubp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: `${seoData.mySite}/${path}`,
    },
    {
      name: 'twitter:title',
      content: data.value.title,
    },
    {
      name: 'twitter:description',
      content: data.value.description,
    },
    {
      name: 'twitter:image',
      content: data.value.ogImage || data.value.image,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${seoData.mySite}/${path}`,
    },
  ],
})


// TOC sidebar state
const tocOpen = ref(false)

onMounted(() => {
  // Set initial state based on screen size
  tocOpen.value = window.innerWidth >= 1024
  
  // Listen for resize events to update TOC state
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      tocOpen.value = true
    } else {
      tocOpen.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

const toggleToc = () => {
  tocOpen.value = !tocOpen.value
}

// Provide TOC state to child components
provide('tocOpen', tocOpen)
provide('toggleToc', toggleToc)

// Generate OG Image
defineOgImageComponent('Test', {
  headline: 'Joshua Palti Sinaga Blog 👋',
  title: articles.value?.seo.title || '',
  description: articles.value?.seo.description || '',
  link: data.value.ogImage,
})
</script>

<template>
  <div class="blog-layout">
    <!-- TOC Sidebar -->
    <BlogToc :articles="articles" />

    <!-- TOC Toggle Button -->
    <UButton @click="toggleToc" icon="i-heroicons-bars-3" size="lg" variant="outline" color="neutral"
      class="fixed top-16 md:top-22 right-4 z-40 shadow-lg backdrop-blur-sm transition-all duration-300"
      :class="{ 'opacity-0 pointer-events-none': tocOpen }" aria-label="Toggle Table of Contents" />

    <!-- Main Content -->
    <main class="main-content min-h-screen">
      <div class="content-wrapper max-w-5xl mx-auto px-6 py-8">
        <BlogHeader :title="data.title" :image="data.image" :alt="data.alt" :date="formatDate(data.date)"
          :description="data.description" :tags="data.tags" />
        <div
          class="mt-4 prose leading-relaxed prose-pre:max-w-xs max-lg:m-4 sm:prose-pre:max-w-full prose-base sm:prose-base md:prose-lg prose-h1:no-underline max-w-none prose-slate dark:prose-invert prose-img:rounded-lg prose-headings:mb-4 text-justify">
          <ContentRenderer v-if="articles" :value="articles">
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </div>

        <div class="flex flex-row flex-wrap md:flex-nowrap mt-24 gap-2 justify-center">
          <SocialShare v-for="network in ['facebook', 'twitter', 'linkedin', 'email']" :key="network" :network="network"
            :styled="true" :label="true" class="p-1" aria-label="Share with {network}" />
        </div>
      </div>
    </main>

    <!-- Overlay -->
    <div v-if="tocOpen" @click="tocOpen = false" class="fixed inset-0 bg-black/30 z-30 lg:hidden"></div>
  </div>
</template>

<style scoped>
.blog-layout {
  position: relative;
}

.main-content {
  transition: margin-right 0.3s ease;
}

.content-wrapper {
  padding-top: 2rem;
}

/* Responsive adjustments */
@media (min-width: 1024px) {
  .main-content {
    margin-right: 0;
  }

  .content-wrapper {
    max-width: 800px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
