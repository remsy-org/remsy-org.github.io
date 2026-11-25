// Interface text in English. Every other language file has the same keys.
// Page content (hero, research, contact) lives in src/content/ instead.

export default {
  site: {
    name: 'Marine Remote Sensing Lab',
    description: 'Remote Sensing of Marine Systems - Academic Research Lab',
    brandTitle: 'Remote Sensing of Marine Systems',
    brandSubtitle: "Yoav Lehahn's research group",
    // Logo in the navigation bar (width/height: the image's size in pixels)
    universityLogo: { src: '/images/haifa-university-logo-nav.png', width: 471, height: 168 },
    universityLogoMenu: '/images/Haifa_logo_secondary_logo_dark_english.png',
    universityName: 'University of Haifa',
    universityUrl: 'https://marsci.haifa.ac.il/en',
  },
  nav: {
    home: 'Home',
    research: 'Research',
    projects: 'Projects',
    publications: 'Publications',
    team: 'Team',
    gallery: 'Gallery',
    contact: 'Contact',
    menu: 'Menu',
    language: 'Language',
  },
  hero: {
    play: 'Play background slideshow',
    pause: 'Pause background slideshow',
    showImage: 'Show background image',
    showVideo: 'Show background video',
  },
  research: {
    heading: 'Research',
  },
  team: {
    heading: 'Our Research Team',
    graduateStudents: 'Graduate Students',
    phdStudents: 'PhD Students',
    mscStudents: 'M.Sc. Students',
    viewDirectory: 'View Full Team Directory',
    directoryNote: 'Explore detailed profiles of all team members, students, and alumni',
    // Shown when a team member's file has no position in this language
    positions: {
      'principal-investigator': 'Principal Investigator',
      'lab-manager': 'Lab Manager',
      'phd-student': 'PhD Student',
      'msc-student': 'M.Sc. Student',
    } as Record<string, string>,
  },
  publications: {
    heading: 'Research Highlights',
    fallback: 'View our recent publications and research outputs',
    viewAll: 'View All Publications',
    viewArticle: 'View Article',
    openAccess: 'Open Access',
  },
  contact: {
    heading: 'Contact Information',
    address: 'Address',
    email: 'Email',
    phone: 'Phone',
  },
  gallery: {
    title: 'Gallery',
    subtitle: 'Moments from the field, the lab and above the sea',
    openPhoto: 'Open photo',
    playVideo: 'Play video',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
  },
  footer: {
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    accessibility: 'Accessibility',
  },
};
