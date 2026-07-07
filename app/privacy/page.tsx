import type { Metadata } from 'next'
import { LegalDoc, type LegalSection } from '@/components/LegalDoc'

const SITE_URL = 'https://alchemizedbiohealing.com'

export const metadata: Metadata = {
  title: 'Privacy Policy | Alchemized BioHealing Institute',
  description: 'How Alchemized BioHealing Institute collects, uses and protects your information. Política de privacidad.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
  openGraph: { title: 'Privacy Policy · Alchemized BioHealing Institute', url: `${SITE_URL}/privacy`, type: 'website' },
}

const EN: LegalSection[] = [
  { h: 'Who we are', p: ['Alchemized BioHealing Institute ("we", "us") is a longevity, regenerative-medicine and holistic wellness institute in Miami, at 2970 Coral Way, Miami, FL 33145. You can reach us at hola@alchemizedbiohealing.com or +1 (305) 305-3820.'] },
  { h: 'Information we collect', p: ['We only collect what you choose to give us: your name and email when you use our assessments, chat with our AI concierge Lumina, request a booking, or write to us. Our Biological Age Calculator processes your answers to generate your result and does not store them. We may collect basic, anonymous usage data to keep the site working well.'] },
  { h: 'How we use your information', p: ['To respond to you, send the results or summaries you request, schedule and confirm appointments, and occasionally share offerings you have expressed interest in. We do not sell your personal information.'] },
  { h: 'Our AI assistants', p: ['Lumina, Lyra and the Soul Assessment are educational wellness tools. They do not diagnose or prescribe. To generate their responses, the messages you send may be processed by our AI provider (Anthropic). Please avoid sharing sensitive medical details you would not want processed by a third-party AI service.'] },
  { h: 'Service providers we use', p: ['We rely on trusted providers to operate the site: Supabase (secure database), Resend (email delivery) and Anthropic (AI responses). They process your data only to provide their service to us and are not permitted to use it for their own purposes.'] },
  { h: 'Health information', p: ['We are a wellness institute. Any health-related information you share is treated as confidential and used only to serve you. Where formal clinical records exist, they are handled by the treating provider under applicable law.'] },
  { h: 'Cookies & language', p: ['We use minimal cookies. A Google Translate cookie remembers your language choice (English or Spanish) so the site stays in your language.'] },
  { h: 'Your choices', p: ['You may ask us to access, correct or delete your information at any time by emailing hola@alchemizedbiohealing.com. We will respond within a reasonable time.'] },
  { h: 'Security', p: ['We take reasonable measures to protect your information. No method of transmission or storage is 100% secure, but we work to keep your data safe.'] },
  { h: 'Children', p: ['This website and its services are intended for adults (18+). We do not knowingly collect information from children.'] },
  { h: 'Changes to this policy', p: ['We may update this Privacy Policy from time to time. The latest version will always be posted on this page.'] },
]

const ES: LegalSection[] = [
  { h: 'Quiénes somos', p: ['Alchemized BioHealing Institute ("nosotros") es un instituto de longevidad, medicina regenerativa y bienestar holístico en Miami, en 2970 Coral Way, Miami, FL 33145. Puedes escribirnos a hola@alchemizedbiohealing.com o llamarnos al +1 (305) 305-3820.'] },
  { h: 'Información que recopilamos', p: ['Solo recopilamos lo que decides darnos: tu nombre y correo cuando usas nuestras evaluaciones, conversas con nuestra concierge de IA Lumina, solicitas una cita o nos escribes. Nuestra Calculadora de Edad Biológica procesa tus respuestas para generar tu resultado y no las guarda. Podemos recopilar datos de uso básicos y anónimos para mantener el sitio funcionando bien.'] },
  { h: 'Cómo usamos tu información', p: ['Para responderte, enviarte los resultados o resúmenes que solicitas, agendar y confirmar citas, y ocasionalmente compartirte servicios en los que has mostrado interés. No vendemos tu información personal.'] },
  { h: 'Nuestros asistentes de IA', p: ['Lumina, Lyra y la Evaluación del Alma son herramientas educativas de bienestar. No diagnostican ni recetan. Para generar sus respuestas, los mensajes que envías pueden ser procesados por nuestro proveedor de IA (Anthropic). Evita compartir datos médicos sensibles que no quieras que procese un servicio de IA externo.'] },
  { h: 'Proveedores que utilizamos', p: ['Nos apoyamos en proveedores de confianza para operar el sitio: Supabase (base de datos segura), Resend (envío de correos) y Anthropic (respuestas de IA). Procesan tus datos solo para prestarnos su servicio y no pueden usarlos para fines propios.'] },
  { h: 'Información de salud', p: ['Somos un instituto de bienestar. Cualquier información de salud que compartas se trata como confidencial y se usa solo para atenderte. Cuando existan registros clínicos formales, el profesional tratante los maneja conforme a la ley aplicable.'] },
  { h: 'Cookies e idioma', p: ['Usamos cookies mínimas. Una cookie de Google Translate recuerda tu idioma (inglés o español) para que el sitio se mantenga en tu idioma.'] },
  { h: 'Tus opciones', p: ['Puedes pedirnos acceder, corregir o eliminar tu información en cualquier momento escribiendo a hola@alchemizedbiohealing.com. Responderemos en un tiempo razonable.'] },
  { h: 'Seguridad', p: ['Tomamos medidas razonables para proteger tu información. Ningún método de transmisión o almacenamiento es 100% seguro, pero trabajamos para mantener tus datos a salvo.'] },
  { h: 'Menores', p: ['Este sitio y sus servicios están dirigidos a personas adultas (mayores de 18 años). No recopilamos información de menores de forma consciente.'] },
  { h: 'Cambios a esta política', p: ['Podemos actualizar esta Política de Privacidad de vez en cuando. La versión más reciente siempre estará publicada en esta página.'] },
]

export default function Page() {
  return <LegalDoc titleEn="Privacy Policy" titleEs="Política de Privacidad" updated="Effective / Vigente: July 2026" en={EN} es={ES} />
}
