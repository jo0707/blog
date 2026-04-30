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

const shareUrl = computed(() => `${seoData.mySite}${path}`)

const shareToInstagram = async () => {
  const instagramShareData = {
    title: data.value.title,
    text: data.value.description,
    url: shareUrl.value,
  }

  try {
    if (navigator.share) {
      await navigator.share(instagramShareData)
      return
    }

    await navigator.clipboard?.writeText(shareUrl.value)
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
  } catch {
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
  }
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
          <button class="social-share-button social-share-button--instagram social-share-button--styled p-1"
            style="--color-brand: #E4405F" aria-label="Share with Instagram" @click="shareToInstagram">
            <svg class="social-share-button__icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
              width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
            </svg>
            <span class="social-share-button__label">Share</span>
          </button>
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
