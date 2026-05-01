<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-preview', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <section id="blog" class="py-24 bg-elevated/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="flex items-end justify-between mb-12"
      >
        <div>
          <p class="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">Writing</p>
          <h2 class="text-3xl sm:text-4xl font-bold">Latest Articles</h2>
          <p class="text-muted mt-2">Thoughts on engineering, architecture, and developer culture.</p>
        </div>
        <UButton to="/blog" variant="ghost" color="neutral" trailing-icon="i-lucide-arrow-right" class="hidden sm:flex">
          All Articles
        </UButton>
      </div>

      <div v-if="posts && posts.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in posts"
          :key="post.path"
          :to="post.path"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 100 } }"
        >
          <UCard class="h-full card-hover">
            <div class="flex flex-col h-full">
              <div class="flex items-center gap-2 mb-3">
                <UBadge color="primary" variant="subtle" size="xs">{{ post.category || 'Engineering' }}</UBadge>
                <span class="text-xs text-muted">{{ post.readTime || '5 min read' }}</span>
              </div>
              <h3 class="font-bold text-lg leading-snug mb-2 group-hover:text-primary-500 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-sm text-muted leading-relaxed flex-1">{{ post.description }}</p>
              <div class="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <UAvatar size="xs" icon="i-lucide-user" />
                <span class="text-xs text-muted">Niroth · {{ new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</span>
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>

      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="i in 3"
          :key="i"
          class="card-hover"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: (i - 1) * 100 } }"
        >
          <div class="flex items-center gap-2 mb-3">
            <UBadge color="primary" variant="subtle" size="xs">Engineering</UBadge>
            <span class="text-xs text-muted">8 min read</span>
          </div>
          <h3 class="font-bold text-lg leading-snug mb-2">
            {{ ['Building Scalable APIs with Node.js and PostgreSQL', 'From Monolith to Microservices: Lessons Learned', 'The Developer Experience Gap: Why DX Matters'][i - 1] }}
          </h3>
          <p class="text-sm text-muted leading-relaxed">
            {{ ['A deep dive into designing APIs that grow gracefully under load.', 'What I learned migrating a 5-year-old Rails app to microservices.', 'Why developer experience is the silent multiplier on team velocity.'][i - 1] }}
          </p>
          <div class="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <UAvatar size="xs" icon="i-lucide-user" />
            <span class="text-xs text-muted">Niroth · Coming soon</span>
          </div>
        </UCard>
      </div>

      <div class="text-center mt-8 sm:hidden">
        <UButton to="/blog" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">
          All Articles
        </UButton>
      </div>
    </div>
  </section>
</template>
