import { notFound } from 'next/navigation';
import CommitteeView from '../CommitteeView';
import { PREVIOUS_YEARS, YEAR_LINKS } from '@/lib/committees';

/* One static page per previous committee year, e.g. /committee/2324.
   Only the slugs from generateStaticParams exist; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
    return PREVIOUS_YEARS.map(({ slug }) => ({ year: slug }));
}

export default function PreviousCommitteePage({ params }: { params: { year: string } }) {
    const year = PREVIOUS_YEARS.find(y => y.slug === params.year);
    if (!year) notFound();
    return <CommitteeView label={year.label} data={year.data} years={YEAR_LINKS} />;
}
