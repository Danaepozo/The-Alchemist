import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Regenerative Medicine in Miami · PRP, Peptides, Stem Cells & DiscSeel®',
  description: 'Regenerative medicine in Miami (Coral Gables) with Dr. Michael J. Meighen — PRP, exosomes, peptide therapy, prolotherapy, regenerative orthopedics and the non-surgical DiscSeel® procedure for back & neck pain. Heal at the root.',
  keywords: 'regenerative medicine Miami, PRP Miami, stem cell therapy, exosomes, peptide therapy, DiscSeel, prolotherapy, regenerative orthopedics, Dr. Michael Meighen, Coral Gables',
  alternates: { canonical: '/regenerative-medicine-miami' },
}

const data: LandingData = {
  path: '/regenerative-medicine-miami',
  eyebrow: 'Regenerative Medicine · Miami',
  h1: 'Regenerative Medicine in Miami',
  lead: [
    '<strong>Regenerative medicine</strong> empowers your body to heal itself — repairing tissue, resolving pain at its root and restoring function, without masking symptoms. At <strong>Alchemized BioHealing Institute</strong> in Coral Gables, Miami, regenerative medicine is led by <strong>Dr. Michael J. Meighen</strong>, double board-certified in Physical Medicine &amp; Rehabilitation and Pain Medicine, with 25+ years of experience.',
    'From <strong>PRP and exosomes</strong> to <strong>peptide therapy</strong> and the non-surgical <strong>DiscSeel®</strong> procedure, the goal is the same: regenerate, don’t just medicate.',
  ],
  sections: [
    { h2: 'A root-cause approach', p: [
      'Dr. Meighen rejects the “sick-care” model where symptoms are treated and root causes ignored. Using image-guided procedures, advanced diagnostics and an n=1 (individualized) philosophy, regenerative medicine targets the origin of pain and dysfunction — joints, tendons, ligaments and discs — to rebuild what conventional medicine often rushes to operate on.',
    ] },
    { h2: 'DiscSeel® — a non-surgical alternative', p: [
      'For chronic back and neck pain from damaged or torn spinal discs, the <strong>DiscSeel® Procedure</strong> uses Fibrin, a natural biologic sealant, to seal tears and stimulate the disc’s own healing — no surgery, no fusion. Dr. Meighen is one of only ~30 DiscSeel®-trained providers in the world.',
    ] },
  ],
  bullets: { h2: 'Regenerative therapies we offer', items: [
    'PRP (Platelet-Rich Plasma) & Platelet-Rich injections',
    'Exosome therapy & mesenchymal cell options',
    'Prolotherapy / Prolozone',
    'Peptide therapy for recovery & repair (BPC-157, TB-500, AOD-9604)',
    'DiscSeel® for chronic back & neck pain',
    'Regenerative orthopedics (knee, shoulder, hip, spine)',
    'P-Shot & O-Shot for sexual health',
  ] },
  faq: [
    { q: 'What is regenerative medicine?', a: 'Regenerative medicine uses your body’s own biology — platelets, growth factors, peptides and biologics — to repair tissue and resolve pain at its root rather than only masking symptoms. At Alchemized BioHealing Institute it is led by Dr. Michael J. Meighen in Miami.' },
    { q: 'Where can I get regenerative medicine in Miami?', a: 'At Alchemized BioHealing Institute, 2970 Coral Way, Miami, FL 33145 (Coral Gables). Call 305-305-3820 to book a consultation with Dr. Meighen.' },
    { q: 'Is DiscSeel® surgery?', a: 'No. DiscSeel® is a non-surgical, image-guided injection that uses Fibrin to seal torn spinal discs — no fusion, no open surgery. Each case is individually evaluated by Dr. Meighen.' },
    { q: 'What conditions can regenerative medicine help with?', a: 'Osteoarthritis, rotator cuff and tendon injuries, ligament injuries, degenerative disc disease and chronic back/neck pain are commonly addressed. Results vary; care is personalized.' },
  ],
  related: [['Biohacking', '/biohacking-miami'], ['Peptide Therapy', '/peptide-therapy-miami'], ['Hormone Optimization', '/hormone-optimization-miami'], ['Dr. Meighen', '/about/meighen'], ['Services', '/services']],
  ctaLabel: 'Book a regenerative consult',
  keywords: 'regenerative medicine Miami, PRP, exosomes, peptides, DiscSeel, regenerative orthopedics',
}

export default function Page() { return <LandingPage data={data} /> }
