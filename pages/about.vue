<script setup lang="ts">
import { aboutPage, footerData, navbarData, socialLinks } from '~/data'

useHead({
  title: 'About',
  meta: [
    {
      name: 'description',
      content: footerData.aboutAuthor,
    },
  ],
})

defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: navbarData.homeTitle,
  description: 'Dive into web development with me and learn Js, Ts, Vue, Nuxt, Docker, k8s',
  link: '/joshua.jpg',
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <div class="container mx-auto h-[32rem]">
      <div class="grid grid-cols-1 sm:grid-cols-2 items-center place-items-center h-full">
        <!-- Left side - Title -->
        <div class="px-6">
          <h2 class="text-black dark:text-slate-100 font-semibold leading-tight text-4xl md:text-5xl w-full">
            {{ aboutPage.title }}</h2>
          <MainRunningText :text="aboutPage.description" :speed="50" class="dark:text-slate-100 text-lg">
          </MainRunningText>
        </div>

        <!-- Right side - Details -->
        <div class="px-6 space-y-6">
          <div>
            <h3 class="text-2xl font-bold text-zinc-800 dark:text-slate-100 mb-3">About Me</h3>
            <p class="dark:text-slate-100 text-base leading-relaxed">
              {{ aboutPage.aboutMe }}
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-zinc-800 dark:text-slate-100 mb-3">What I Do</h3>
            <p class="dark:text-slate-100 text-base leading-relaxed">
              {{ footerData.authorInterest }}
            </p>
          </div>

          <!-- Footer Links -->
          <div>
            <h3 class="text-2xl font-bold text-zinc-800 dark:text-slate-100 mb-3">Connect</h3>
            <div class="flex flex-wrap gap-3">
              <UButton href="https://github.com/jo0707" icon="mdi:github-box" target="_blank" aria-label="GitHub"
                color="neutral" variant="soft" size="sm">
                GitHub
              </UButton>
              <UButton href="https://linkedin.com/in/joshuapaltisinaga" icon="mdi:linkedin" target="_blank"
                aria-label="LinkedIn" color="neutral" variant="soft" size="sm">
                LinkedIn
              </UButton>
              <UButton href="https://itsjo.works" icon="mdi:web-box" target="_blank" aria-label="My Site"
                color="neutral" variant="soft" size="sm">
                Portfolio
              </UButton>
              <UButton href="/rss.xml" icon="mdi:rss-box" target="_blank" aria-label="RSS Feed" color="neutral"
                variant="soft" size="sm">
                RSS
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
