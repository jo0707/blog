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
  description: 'I am Joshua Palti Sinaga, a software engineer and open source enthusiast.',
  link: '/joshua.jpg',
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto min-h-[32rem] py-8 sm:py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Left side - Title -->
        <div class="text-center lg:text-left">
          <h2
            class="text-black dark:text-slate-100 font-semibold leading-tight text-3xl sm:text-4xl md:text-5xl w-full">
            {{ aboutPage.title }}
          </h2>
          <MainRunningText :text="aboutPage.description" :speed="50"
            class="dark:text-slate-100 text-lg sm:text-xl">
          </MainRunningText>
        </div>

        <!-- Right side - Details -->
        <div class="space-y-6 sm:space-y-8">
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-slate-100 mb-3 sm:mb-4">About Me</h3>
            <p class="dark:text-slate-100 text-sm sm:text-base leading-relaxed text-justify">
              {{ aboutPage.aboutMe }}
            </p>
          </div>

          <!-- <div>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-slate-100 mb-3 sm:mb-4">What I Do</h3>
            <p class="dark:text-slate-100 text-sm sm:text-base leading-relaxed">
              {{ footerData.authorInterest }}
            </p>
          </div> -->

          <!-- Footer Links -->
          <div>
            <h3 class="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-slate-100 mb-3 sm:mb-4">Connect</h3>
            <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              <UButton href="https://github.com/jo0707" icon="mdi:github-box" target="_blank" aria-label="GitHub"
                color="neutral" variant="soft" size="sm" class="w-full sm:w-auto text-xs sm:text-sm">
                GitHub
              </UButton>
              <UButton href="https://linkedin.com/in/joshuapaltisinaga" icon="mdi:linkedin" target="_blank"
                aria-label="LinkedIn" color="neutral" variant="soft" size="sm"
                class="w-full sm:w-auto text-xs sm:text-sm">
                LinkedIn
              </UButton>
              <UButton href="https://itsjo.works" icon="mdi:web-box" target="_blank" aria-label="My Site"
                color="neutral" variant="soft" size="sm" class="w-full sm:w-auto text-xs sm:text-sm">
                Portfolio
              </UButton>
              <UButton href="/rss.xml" icon="mdi:rss-box" target="_blank" aria-label="RSS Feed" color="neutral"
                variant="soft" size="sm" class="w-full sm:w-auto text-xs sm:text-sm">
                RSS
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
