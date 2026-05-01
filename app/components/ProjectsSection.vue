<script setup lang="ts">
const projects = [
  {
    title: 'FlowPay',
    description: 'Real-time payment processing platform with multi-currency support, fraud detection, and a merchant dashboard. Handles $2M+ in daily transactions.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Vue 3', 'Stripe'],
    github: 'https://github.com/niroth/flowpay',
    demo: 'https://flowpay.demo',
    featured: true,
    color: 'from-primary-500/20 to-orange-500/20'
  },
  {
    title: 'DataStream',
    description: 'High-throughput event streaming pipeline built on Kafka. Processes 100k+ events/second with real-time dashboards and alerting.',
    tags: ['Go', 'Kafka', 'ClickHouse', 'React', 'Grafana'],
    github: 'https://github.com/niroth/datastream',
    demo: 'https://datastream.demo',
    featured: true,
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    title: 'DevKit CLI',
    description: 'Open-source CLI tool for scaffolding production-ready microservices with Docker, CI/CD, and observability baked in. 2k+ GitHub stars.',
    tags: ['Go', 'Docker', 'GitHub Actions', 'Open Source'],
    github: 'https://github.com/niroth/devkit',
    demo: null,
    featured: true,
    color: 'from-green-500/20 to-teal-500/20'
  },
  {
    title: 'ContentAI',
    description: 'AI-powered content management system with auto-tagging, SEO scoring, and multi-author workflows.',
    tags: ['Next.js', 'Python', 'OpenAI', 'Supabase'],
    github: 'https://github.com/niroth/contentai',
    demo: 'https://contentai.demo',
    featured: false,
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    title: 'ShopEdge',
    description: 'Headless e-commerce engine with a composable storefront, inventory management, and analytics.',
    tags: ['Nuxt 3', 'Medusa.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/niroth/shopedge',
    demo: 'https://shopedge.demo',
    featured: false,
    color: 'from-indigo-500/20 to-blue-500/20'
  },
  {
    title: 'AuthForge',
    description: 'Self-hosted authentication service with OAuth2, SAML, magic links, and a management UI.',
    tags: ['Go', 'JWT', 'Redis', 'Vue 3'],
    github: 'https://github.com/niroth/authforge',
    demo: null,
    featured: false,
    color: 'from-violet-500/20 to-purple-500/20'
  }
]

const filter = ref('All')
const filters = ['All', 'Featured']
const filtered = computed(() =>
  filter.value === 'Featured' ? projects.filter(p => p.featured) : projects
)
</script>

<template>
  <section id="projects" class="py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="text-center mb-12"
      >
        <p class="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">Work</p>
        <h2 class="text-3xl sm:text-4xl font-bold">Projects</h2>
        <p class="text-muted mt-4 max-w-xl mx-auto">
          A selection of things I've built — from open-source tools to production SaaS products.
        </p>

        <div class="flex justify-center gap-2 mt-6">
          <UButton
            v-for="f in filters"
            :key="f"
            :color="filter === f ? 'primary' : 'neutral'"
            :variant="filter === f ? 'solid' : 'ghost'"
            size="sm"
            @click="filter = f"
          >
            {{ f }}
          </UButton>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, i) in filtered"
          :key="project.title"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
        >
          <UCard class="h-full card-hover group relative overflow-hidden">
            <div :class="['absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br', project.color]" />
            <div class="relative">
              <div class="flex items-start justify-between mb-3">
                <h3 class="font-bold text-lg">{{ project.title }}</h3>
                <UBadge v-if="project.featured" color="primary" variant="subtle" size="xs">
                  Featured
                </UBadge>
              </div>
              <p class="text-sm text-muted leading-relaxed mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-1.5 mb-4">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <div class="flex items-center gap-2 pt-2 border-t border-border">
                <UButton
                  :to="project.github"
                  target="_blank"
                  icon="i-simple-icons-github"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                >
                  Code
                </UButton>
                <UButton
                  v-if="project.demo"
                  :to="project.demo"
                  target="_blank"
                  icon="i-lucide-external-link"
                  color="primary"
                  variant="ghost"
                  size="xs"
                >
                  Live Demo
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <div class="text-center mt-10">
        <UButton
          to="https://github.com/niroth"
          target="_blank"
          color="neutral"
          variant="outline"
          icon="i-simple-icons-github"
          trailing-icon="i-lucide-arrow-right"
        >
          See all on GitHub
        </UButton>
      </div>
    </div>
  </section>
</template>
