<script setup lang="ts">
const highlights = [
  { icon: 'i-lucide-map-pin', label: 'Location', value: 'Remote / Global' },
  { icon: 'i-lucide-briefcase', label: 'Role', value: 'Senior Full Stack Developer' },
  { icon: 'i-lucide-graduation-cap', label: 'Focus', value: 'Scalable Systems & DX' },
  { icon: 'i-lucide-heart', label: 'Loves', value: 'Open Source & Clean Code' }
]
</script>

<template>
  <section id="about" class="py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <p class="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">About Me</p>
          <h2 class="text-3xl sm:text-4xl font-bold mb-6">
            Crafting digital experiences that scale
          </h2>
          <div class="space-y-4 text-muted leading-relaxed">
            <p>
              I'm a Senior Full Stack Developer with 4+ years of experience building production systems across fintech, SaaS, and e-commerce. I thrive at the intersection of backend reliability and frontend polish.
            </p>
            <p>
              My stack spans Node.js, PHP, Vue/Nuxt, React/Next.js, PostgreSQL, Redis, and cloud infrastructure on AWS and GCP. I care deeply about developer experience — good abstractions, good docs, good tooling.
            </p>
            <p>
              When I'm not shipping features, I'm contributing to open source, writing technical articles, or mentoring junior developers.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-8">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="flex items-start gap-3"
            >
              <div class="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <UIcon :name="item.icon" class="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p class="text-xs text-muted">{{ item.label }}</p>
                <p class="text-sm font-medium">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 600 } }"
          class="space-y-4"
        >
          <UCard class="card-hover">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-building-2" class="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p class="font-semibold">Lead Engineer — TechCorp</p>
                <p class="text-sm text-muted">2022 – Present</p>
                <p class="text-sm text-muted mt-1">Led a team of 8 engineers building a real-time analytics platform.</p>
              </div>
            </div>
          </UCard>

          <UCard class="card-hover">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-building" class="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p class="font-semibold">Senior Developer — StartupXYZ</p>
                <p class="text-sm text-muted">2019 – 2022</p>
                <p class="text-sm text-muted mt-1">Built the core payment infrastructure from 0 to $10M ARR.</p>
              </div>
            </div>
          </UCard>

          <UCard class="card-hover">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-laptop" class="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p class="font-semibold">Full Stack Developer — Freelance</p>
                <p class="text-sm text-muted">2017 – 2019</p>
                <p class="text-sm text-muted mt-1">Delivered 20+ projects for clients across 10 countries.</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
