<script setup lang="ts">
const form = reactive({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const sent = ref(false)
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })
    sent.value = true
  }
  catch (e: unknown) {
    error.value = (e as { data?: { message?: string } })?.data?.message || 'Something went wrong. Please try again.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <section id="contact" class="py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="text-center mb-16"
      >
        <p class="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">Contact</p>
        <h2 class="text-3xl sm:text-4xl font-bold">Let's Work Together</h2>
        <p class="text-muted mt-4 max-w-xl mx-auto">
          Have a project in mind, or just want to chat? I'm always open to interesting conversations.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12">
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 500 } }"
          class="space-y-6"
        >
          <div>
            <h3 class="font-bold text-xl mb-2">Get in touch</h3>
            <p class="text-muted">I typically respond within 24 hours. For urgent matters, email me directly.</p>
          </div>

          <div class="space-y-4">
            <a href="mailto:niroth@example.com" class="flex items-center gap-4 group">
              <div class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p class="text-xs text-muted">Email</p>
                <p class="font-medium group-hover:text-primary-500 transition-colors">niroth@example.com</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/niroth" target="_blank" class="flex items-center gap-4 group">
              <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <UIcon name="i-simple-icons-linkedin" class="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p class="text-xs text-muted">LinkedIn</p>
                <p class="font-medium group-hover:text-blue-500 transition-colors">linkedin.com/in/niroth</p>
              </div>
            </a>

            <a href="https://github.com/niroth" target="_blank" class="flex items-center gap-4 group">
              <div class="w-12 h-12 rounded-xl bg-neutral-500/10 flex items-center justify-center group-hover:bg-neutral-500/20 transition-colors">
                <UIcon name="i-simple-icons-github" class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs text-muted">GitHub</p>
                <p class="font-medium group-hover:text-foreground transition-colors">github.com/niroth</p>
              </div>
            </a>
          </div>

          <UCard class="bg-primary-500/5 border-primary-500/20">
            <div class="flex items-start gap-3">
              <UIcon name="i-lucide-calendar" class="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
              <div>
                <p class="font-semibold text-sm">Schedule a call</p>
                <p class="text-xs text-muted mt-1">Book a 30-min intro call to discuss your project needs.</p>
                <UButton size="xs" color="primary" variant="subtle" class="mt-3" to="https://cal.com/niroth" target="_blank">
                  Book a time
                </UButton>
              </div>
            </div>
          </UCard>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 500 } }"
        >
          <UCard>
            <div v-if="sent" class="text-center py-8">
              <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-green-500" />
              </div>
              <h3 class="font-bold text-xl mb-2">Message sent!</h3>
              <p class="text-muted">Thanks for reaching out. I'll get back to you within 24 hours.</p>
              <UButton class="mt-6" color="neutral" variant="outline" @click="sent = false">
                Send another
              </UButton>
            </div>

            <form v-else class="space-y-4" @submit.prevent="submit">
              <div class="grid sm:grid-cols-2 gap-4">
                <UFormField label="Name" required>
                  <UInput v-model="form.name" placeholder="John Doe" required />
                </UFormField>
                <UFormField label="Email" required>
                  <UInput v-model="form.email" type="email" placeholder="john@example.com" required />
                </UFormField>
              </div>

              <UFormField label="Subject" required>
                <UInput v-model="form.subject" placeholder="Project inquiry" required />
              </UFormField>

              <UFormField label="Message" required>
                <UTextarea
                  v-model="form.message"
                  placeholder="Tell me about your project..."
                  :rows="5"
                  required
                />
              </UFormField>

              <UAlert v-if="error" color="error" variant="subtle" :description="error" />

              <UButton
                type="submit"
                color="primary"
                block
                size="lg"
                :loading="loading"
                trailing-icon="i-lucide-send"
              >
                Send Message
              </UButton>
            </form>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
