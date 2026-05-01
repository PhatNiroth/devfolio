<script setup lang="ts">
const { data: post } = await useAsyncData(
  `blog-${useRoute().path}`,
  () => queryCollection('blog').path(useRoute().path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

useSeoMeta({
  title: `${post.value.title} — Niroth`,
  description: post.value.description
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    <NuxtLink to="/blog" class="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8">
      <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
      Back to Blog
    </NuxtLink>

    <article
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    >
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <UBadge color="primary" variant="subtle">{{ post?.category || 'Engineering' }}</UBadge>
          <span class="text-sm text-muted">{{ post?.readTime || '5 min read' }}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold leading-tight mb-4">{{ post?.title }}</h1>
        <p class="text-lg text-muted">{{ post?.description }}</p>

        <div class="flex items-center gap-3 mt-6 pt-6 border-t border-border">
          <UAvatar size="sm" icon="i-lucide-user" />
          <div>
            <p class="text-sm font-medium">Niroth</p>
            <p class="text-xs text-muted">
              {{ post?.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '' }}
            </p>
          </div>
        </div>
      </div>

      <div class="prose prose-neutral dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>
    </article>
  </div>
</template>
