<script setup lang="ts">
const categories = [
  {
    label: 'Frontend',
    icon: 'i-lucide-monitor',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    skills: ['Vue 3 / Nuxt 3', 'React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebSockets']
  },
  {
    label: 'Backend',
    icon: 'i-lucide-server',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    skills: ['Node.js / Bun', 'Go', 'Python', 'REST & GraphQL', 'gRPC', 'tRPC']
  },
  {
    label: 'Database',
    icon: 'i-lucide-database',
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Supabase']
  },
  {
    label: 'DevOps & Cloud',
    icon: 'i-lucide-cloud',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
  },
  {
    label: 'Tools',
    icon: 'i-lucide-wrench',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    skills: ['Git', 'GitHub Actions', 'Postman', 'Figma', 'Linear', 'Datadog']
  },
  {
    label: 'Architecture',
    icon: 'i-lucide-layers',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    skills: ['Microservices', 'Event-Driven', 'CQRS', 'DDD', 'Clean Arch.', 'Monorepos']
  }
]
</script>

<template>
  <section id="skills" class="py-24 bg-elevated/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="text-center mb-16"
      >
        <p class="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">Skills</p>
        <h2 class="text-3xl sm:text-4xl font-bold">My Tech Stack</h2>
        <p class="text-muted mt-4 max-w-xl mx-auto">
          A curated set of tools and technologies I use to build fast, reliable, and maintainable systems.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(cat, i) in categories"
          :key="cat.label"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 80 } }"
        >
          <UCard class="h-full card-hover">
            <div class="flex items-center gap-3 mb-4">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', cat.bg]">
                <UIcon :name="cat.icon" :class="['w-5 h-5', cat.color]" />
              </div>
              <h3 class="font-semibold">{{ cat.label }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="skill in cat.skills"
                :key="skill"
                color="neutral"
                variant="subtle"
                size="sm"
              >
                {{ skill }}
              </UBadge>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
