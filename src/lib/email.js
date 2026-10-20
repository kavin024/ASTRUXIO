import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

/**
 * Sends the contact form through your own EmailJS account when configured.
 *
 * The reconstruction deliberately does not embed the production site's EmailJS
 * credentials. Without a local .env file the form runs in demo mode: it uses the
 * same sending -> success UI but never transmits an email.
 */
export async function sendContactEmail(params) {
  if (!configured) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { demo: true }
  }

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
}
