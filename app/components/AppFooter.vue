<script setup lang="ts">
const socials = [
  { icon: 'i-simple-icons-github', href: 'https://github.com/PhatNiroth', label: 'GitHub' },
  { icon: 'i-simple-icons-linkedin', href: 'https://www.linkedin.com/in/niroth-phat-836a5424a/', label: 'LinkedIn' },
  { icon: 'i-simple-icons-x', href: 'https://x.com/niroth', label: 'X / Twitter' }
]
</script>

<template>
  <footer class="border-t border-border mt-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p class="font-bold text-lg">
            <span class="gradient-text">Niroth</span>
            <span class="text-muted">.dev</span>
          </p>
          <p class="text-sm text-muted mt-1">Senior Full Stack Developer</p>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            v-for="s in socials"
            :key="s.href"
            :to="s.href"
            target="_blank"
            :icon="s.icon"
            :aria-label="s.label"
            color="neutral"
            variant="ghost"
          />
        </div>
      </div>

      <USeparator class="my-6" />

      <p class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }} Niroth. Built with Nuxt 3 & Nuxt UI.
      </p>
    </div>
  </footer>
</template>
