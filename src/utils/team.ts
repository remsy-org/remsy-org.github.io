import { defaultLocale, getStrings, type Locale } from '../i18n';

// Team member pages (src/pages/team/*.md) are written in English. For another
// language, a member's file may add translated fields with the language as suffix:
//
//   name_he: "..."       name
//   position_he: "..."   position (otherwise a general one is used, from the role)
//   research_he: "..."   research topic (otherwise shown in English)

type Frontmatter = Record<string, any>;

export function localizeMember<T extends Frontmatter>(member: T, locale: Locale = defaultLocale): T {
  if (locale === defaultLocale) return member;
  const positions = getStrings(locale).team.positions;
  return {
    ...member,
    title: member[`name_${locale}`] || member.title,
    position: member[`position_${locale}`] || positions[member.role] || member.position,
    research: member[`research_${locale}`] || member.research,
  };
}
