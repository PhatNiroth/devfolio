<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number, message: string } }>()

useSeoMeta({
  title: '404 — Page Not Found | Niroth',
  description: 'The page you are looking for does not exist.'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl" />
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="text-center max-w-lg"
    >
      <p class="text-8xl sm:text-9xl font-bold text-primary-500 leading-none select-none">
        {{ error.statusCode }}
      </p>

      <h1 class="text-2xl sm:text-3xl font-bold mt-4 mb-2">
        Page Not Found
      </h1>

      <p class="text-gray-500 dark:text-gray-400 mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <UButton size="lg" color="primary" @click="handleError">
          <UIcon name="i-lucide-home" class="mr-1.5" />
          Back to Home
        </UButton>
        <UButton size="lg" variant="outline" to="/blog">
          <UIcon name="i-lucide-book-open" class="mr-1.5" />
          Read the Blog
        </UButton>
      </div>
    </div>
  </div>
</template>
