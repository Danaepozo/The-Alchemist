import type { Metadata } from 'next'
import { LegalDoc, type LegalSection } from '@/components/LegalDoc'

const SITE_URL = 'https://alchemizedbiohealing.com'

export const metadata: Metadata = {
  title: 'Terms of Service | Alchemized BioHealing Institute',
  description: 'The terms for using the Alchemized BioHealing Institute website and its wellness tools. Términos de servicio.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
  openGraph: { title: 'Terms of Service · Alchemized BioHealing Institute', url: `${SITE_URL}/terms`, type: 'website' },
}

const EN: LegalSection[] = [
  { h: 'Acceptance', p: ['By using this website you agree to these Terms of Service. If you do not agree, please do not use the site.'] },
  { h: 'What we offer', p: ['Alchemized BioHealing Institute is a longevity, regenerative-medicine and holistic wellness sanctuary in Miami. The website presents our services, memberships, retreats and free educational tools.'] },
  { h: 'Not medical advice', p: ['The content of this website, and our AI assistants (Lumina, Lyra, the Soul Assessment and the Biological Age Calculator), are for education and general wellness only. They do not diagnose, treat, cure or prescribe, and are not a substitute for professional medical care. Using the website or the AI does not create a doctor–patient relationship. Always consult a qualified healthcare provider about your individual situation, and in an emergency call 911.'] },
  { h: 'About our AI assistants', p: ['Our AI tools offer general, educational guidance and may occasionally be inaccurate. Do not rely on them for medical, legal or financial decisions.'] },
  { h: 'Appointments & memberships', p: ['Bookings made on the site are requests; a session is confirmed by our team. Membership benefits, prices and minimum terms are as described and may change over time. Specific arrangements are confirmed directly with you.'] },
  { h: 'Payments', p: ['Any payments are arranged directly with the Institute; the applicable terms are provided to you at the time of purchase.'] },
  { h: 'Intellectual property', p: ['All content, branding, and the AI experiences on this site are the property of Alchemized BioHealing Institute and may not be copied or reused without our written permission.'] },
  { h: 'Acceptable use', p: ['Please use the site lawfully. Do not attempt to disrupt, reverse-engineer or misuse the website or its AI tools.'] },
  { h: 'Limitation of liability', p: ['To the fullest extent permitted by law, Alchemized BioHealing Institute is not liable for indirect or incidental damages arising from use of the website or its tools. Wellness therapies carry inherent considerations; always consult your healthcare provider before beginning any protocol.'] },
  { h: 'Governing law', p: ['These Terms are governed by the laws of the State of Florida, United States.'] },
  { h: 'Changes', p: ['We may update these Terms from time to time. Continued use of the site means you accept the updated Terms.'] },
]

const ES: LegalSection[] = [
  { h: 'Aceptación', p: ['Al usar este sitio web aceptas estos Términos de Servicio. Si no estás de acuerdo, por favor no uses el sitio.'] },
  { h: 'Qué ofrecemos', p: ['Alchemized BioHealing Institute es un santuario de longevidad, medicina regenerativa y bienestar holístico en Miami. El sitio presenta nuestros servicios, membresías, retiros y herramientas educativas gratuitas.'] },
  { h: 'No es consejo médico', p: ['El contenido de este sitio, y nuestros asistentes de IA (Lumina, Lyra, la Evaluación del Alma y la Calculadora de Edad Biológica), son solo para educación y bienestar general. No diagnostican, tratan, curan ni recetan, y no sustituyen la atención médica profesional. Usar el sitio o la IA no crea una relación médico–paciente. Consulta siempre a un profesional de salud calificado sobre tu situación, y en una emergencia llama al 911.'] },
  { h: 'Sobre nuestros asistentes de IA', p: ['Nuestras herramientas de IA ofrecen orientación general y educativa y pueden equivocarse ocasionalmente. No te bases en ellas para decisiones médicas, legales o financieras.'] },
  { h: 'Citas y membresías', p: ['Las reservas hechas en el sitio son solicitudes; una sesión la confirma nuestro equipo. Los beneficios de membresía, precios y plazos mínimos son los descritos y pueden cambiar con el tiempo. Los detalles específicos se confirman directamente contigo.'] },
  { h: 'Pagos', p: ['Cualquier pago se coordina directamente con el Instituto; los términos aplicables se te informan al momento de la compra.'] },
  { h: 'Propiedad intelectual', p: ['Todo el contenido, la marca y las experiencias de IA de este sitio son propiedad de Alchemized BioHealing Institute y no pueden copiarse ni reutilizarse sin nuestro permiso por escrito.'] },
  { h: 'Uso aceptable', p: ['Usa el sitio de forma lícita. No intentes interrumpir, hacer ingeniería inversa ni dar mal uso al sitio o a sus herramientas de IA.'] },
  { h: 'Limitación de responsabilidad', p: ['En la máxima medida permitida por la ley, Alchemized BioHealing Institute no es responsable por daños indirectos o incidentales derivados del uso del sitio o sus herramientas. Las terapias de bienestar conllevan consideraciones propias; consulta siempre a tu profesional de salud antes de comenzar cualquier protocolo.'] },
  { h: 'Ley aplicable', p: ['Estos Términos se rigen por las leyes del Estado de Florida, Estados Unidos.'] },
  { h: 'Cambios', p: ['Podemos actualizar estos Términos de vez en cuando. El uso continuado del sitio significa que aceptas los Términos actualizados.'] },
]

export default function Page() {
  return <LegalDoc titleEn="Terms of Service" titleEs="Términos de Servicio" updated="Effective / Vigente: July 2026" en={EN} es={ES} />
}
