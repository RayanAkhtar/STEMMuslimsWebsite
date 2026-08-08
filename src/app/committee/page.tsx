import CommitteeView from './CommitteeView';
import { CURRENT_YEAR, YEAR_LINKS } from '@/lib/committees';

/* Fully static: the committee data is imported at build time, so no API
   call or filesystem read happens at runtime (both were unreliable on
   Cloudflare Workers). Previous years live at /committee/<year>. */
export default function CommitteePage() {
    return <CommitteeView label={CURRENT_YEAR.label} data={CURRENT_YEAR.data} years={YEAR_LINKS} />;
}
