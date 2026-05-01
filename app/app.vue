<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' }
  ],
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  title: 'Niroth — Senior Full Stack Developer',
  description: 'Senior Full Stack Developer specializing in building scalable web applications, APIs, and developer tools.',
  ogTitle: 'Niroth — Senior Full Stack Developer',
  ogDescription: 'Senior Full Stack Developer specializing in building scalable web applications, APIs, and developer tools.',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <AppNavbar />
    <UMain>
      <NuxtPage />
    </UMain>
    <AppFooter />
  </UApp>
</template>
