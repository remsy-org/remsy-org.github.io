export interface Publication {
  title: string;
  authors: string;
  journal: string;
  volume?: string;
  pages?: string;
  year: number;
  doi?: string;
  url?: string;
  pdf?: boolean;
  openAccess?: boolean;
  abstract?: string;
  keywords?: string[];
  featured?: boolean;
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  const publicationFiles = import.meta.glob('/src/pages/publications/*.md');
  const publications: Publication[] = [];

  for (const path in publicationFiles) {
    const file = await publicationFiles[path]() as any;
    const frontmatter = file.frontmatter;
    
    if (frontmatter && frontmatter.featured === true) {
      publications.push({
        title: frontmatter.title,
        authors: frontmatter.authors,
        journal: frontmatter.journal,
        volume: frontmatter.volume,
        pages: frontmatter.pages,
        year: frontmatter.year,
        doi: frontmatter.doi,
        url: frontmatter.url,
        pdf: frontmatter.pdf,
        openAccess: frontmatter.openAccess,
        abstract: frontmatter.abstract,
        keywords: frontmatter.keywords,
        featured: frontmatter.featured
      });
    }
  }

  // Sort by year (newest first)
  publications.sort((a, b) => b.year - a.year);
  
  return publications;
}

export async function getAllPublications(): Promise<Publication[]> {
  const publicationFiles = import.meta.glob('/src/pages/publications/*.md');
  const publications: Publication[] = [];

  for (const path in publicationFiles) {
    const file = await publicationFiles[path]() as any;
    const frontmatter = file.frontmatter;
    
    if (frontmatter) {
      publications.push({
        title: frontmatter.title,
        authors: frontmatter.authors,
        journal: frontmatter.journal,
        volume: frontmatter.volume,
        pages: frontmatter.pages,
        year: frontmatter.year,
        doi: frontmatter.doi,
        url: frontmatter.url,
        pdf: frontmatter.pdf,
        openAccess: frontmatter.openAccess,
        abstract: frontmatter.abstract,
        keywords: frontmatter.keywords,
        featured: frontmatter.featured
      });
    }
  }

  // Sort by year (newest first)
  publications.sort((a, b) => b.year - a.year);
  
  return publications;
}