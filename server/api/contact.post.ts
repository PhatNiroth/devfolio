import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    throw createError({ statusCode: 400, message: 'All fields are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, message: 'Invalid email address.' })
  }

  const config = useRuntimeConfig()

  if (!config.resendApiKey) {
    console.warn('RESEND_API_KEY not set — skipping email send.')
    return { success: true }
  }

  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({
    from: 'Portfolio Contact <contact@niroth.dev>',
    to: 'niroth@example.com',
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <h2>New message from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  })

  return { success: true }
})
