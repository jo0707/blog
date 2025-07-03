<script lang="ts" setup>
const route = useRoute()

// Get category from route params
const category = computed(() => {
  const name = route.params.category || ''
  if (Array.isArray(name)) return name.at(0) || ''
  return name
})

// Redirect to the new blog page with category filter
const targetUrl = `/blogs?category=${encodeURIComponent(category.value)}`
await navigateTo(targetUrl, { replace: true })
</script>

<template>
  <div class="container max-w-5xl mx-auto text-zinc-600 px-4 py-8">
    <p>Redirecting to {{ category }} posts...</p>
  </div>
</template>
