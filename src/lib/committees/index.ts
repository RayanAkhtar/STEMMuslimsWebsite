import committee2022 from './2022-2023.json';
import committee2023 from './2023-2024.json';
import committee2024 from './2024-2025.json';
import committee2025 from './2025-2026.json';

export interface MemberDetails {
    role: string;
    course: string;
    year: string;
    email: string;
    LinkedIn: string;
}

export interface PeopleDetails {
    [key: string]: MemberDetails;
}

export interface CommitteeData {
    heads: PeopleDetails;
    members: PeopleDetails;
}

export interface CommitteeYear {
    slug: string;
    label: string;
    data: CommitteeData;
}

/* Newest first. The first entry is the current committee, served at
   /committee; every earlier year gets its own static page at
   /committee/<slug>. Add new years to the top of this list. */
export const COMMITTEE_YEARS: CommitteeYear[] = [
    { slug: '2526', label: '2025-2026', data: committee2025 },
    { slug: '2425', label: '2024-2025', data: committee2024 },
    { slug: '2324', label: '2023-2024', data: committee2023 },
    { slug: '2223', label: '2022-2023', data: committee2022 },
];

export const CURRENT_YEAR = COMMITTEE_YEARS[0];
export const PREVIOUS_YEARS = COMMITTEE_YEARS.slice(1);

/* Serialisable summary that is safe to pass to client components
   (no member data attached). Ordered oldest -> newest so the year
   switcher reads left to right chronologically. */
export const YEAR_LINKS = COMMITTEE_YEARS.map(({ slug, label }) => ({
    slug,
    label,
    current: slug === CURRENT_YEAR.slug,
})).reverse();
