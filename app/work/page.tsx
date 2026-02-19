import { Metadata } from 'next';
import { getRealisations } from '@/lib/supabase';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
  title: 'Nos Réalisations | Diez Agency',
  description: 'Découvrez tous nos projets : dashboards, automatisations, applications mobiles et sites web sur-mesure réalisés pour nos clients.',
  openGraph: {
    title: 'Nos Réalisations | Diez Agency',
    description: 'Découvrez tous nos projets réalisés pour nos clients.',
    url: 'https://diez-agency.com/work',
  },
};

export default async function WorkPage() {
  const realisations = await getRealisations();

  return <WorkClient realisations={realisations} />;
}
