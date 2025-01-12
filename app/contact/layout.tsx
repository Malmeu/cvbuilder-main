import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - CV Diali',
  description: 'Contactez-nous pour toute question concernant nos services de création de CV et d\'accompagnement professionnel.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
