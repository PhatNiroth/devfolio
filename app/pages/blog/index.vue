<script setup lang="ts">
useSeoMeta({
  title: 'Blog — Niroth',
  description: 'Articles on engineering, architecture, and developer culture.'
})

const { data: posts } = await useAsyncData('blog-all', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

const search = ref('')
const filtered = computed(() => {
  if (!posts.value) return []
  if (!search.value) return posts.value
  const q = search.value.toLowerCase()
  return posts.value.filter(p =>
    p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="mb-12"
    >
      <p class="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">Writing</p>
      <h1 class="text-4xl font-bold mb-4">Blog</h1>
      <p class="text-muted">Thoughts on engineering, architecture, and building software that lasts.</p>

      <UInput
        v-model="search"
        class="mt-6 max-w-sm"
        placeholder="Search articles..."
        icon="i-lucide-search"
      />
    </div>

    <div v-if="filtered.length > 0" class="space-y-6">
      <NuxtLink
        v-for="(post, i) in filtered"
        :key="post.path"
        :to="post.path"
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 300, delay: i * 60 } }"
        class="block"
      >
        <UCard class="card-hover group">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <UBadge color="primary" variant="subtle" size="xs">{{ post.category || 'Engineering' }}</UBadge>
                <span class="text-xs text-muted">{{ post.readTime || '5 min read' }}</span>
              </div>
              <h2 class="font-bold text-xl group-hover:text-primary-500 transition-colors">{{ post.title }}</h2>
              <p class="text-muted text-sm mt-2 leading-relaxed">{{ post.description }}</p>
              <p class="text-xs text-muted mt-3">{{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="w-5 h-5 text-muted group-hover:text-primary-500 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
          </div>
        </UCard>
      </NuxtLink>
    </div>

    <div v-else class="text-center py-20">
      <UIcon name="i-lucide-file-text" class="w-12 h-12 text-muted mx-auto mb-4" />
      <p class="text-muted">No articles yet. Check back soon.</p>
    </div>
  </div>
</template>
