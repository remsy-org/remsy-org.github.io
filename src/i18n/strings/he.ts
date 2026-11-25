// Interface text in Hebrew (draft translation, to be reviewed).
import type en from './en';

const he: typeof en = {
  site: {
    name: 'המעבדה לחישה מרחוק של מערכות ימיות',
    description: 'חישה מרחוק של מערכות ימיות - קבוצת מחקר אקדמית',
    brandTitle: 'חישה מרחוק של מערכות ימיות',
    brandSubtitle: 'קבוצת המחקר של יואב להן',
    // The university's three-language logo (Hebrew, English, Arabic)
    universityLogo: { src: '/images/haifa-university-logo-trilingual.png', width: 497, height: 300 },
    universityLogoMenu: '/images/haifa-university-logo-trilingual.png',
    universityName: 'אוניברסיטת חיפה',
    universityUrl: 'https://marsci.haifa.ac.il/',
  },
  nav: {
    home: 'בית',
    research: 'מחקר',
    projects: 'פרויקטים',
    publications: 'פרסומים',
    team: 'צוות',
    gallery: 'גלריה',
    contact: 'צור קשר',
    menu: 'תפריט',
    language: 'שפה',
  },
  hero: {
    play: 'הפעלת מצגת הרקע',
    pause: 'השהיית מצגת הרקע',
    showImage: 'הצגת תמונת רקע',
    showVideo: 'הצגת סרטון רקע',
  },
  research: {
    heading: 'מחקר',
  },
  team: {
    heading: 'צוות המחקר',
    graduateStudents: 'סטודנטים לתארים מתקדמים',
    phdStudents: 'דוקטורנטים',
    mscStudents: 'סטודנטים לתואר שני',
    viewDirectory: 'לכל חברי הצוות',
    directoryNote: 'פרופילים מפורטים של חברי הצוות, הסטודנטים והבוגרים',
    positions: {
      'principal-investigator': 'חוקר ראשי',
      'lab-manager': 'מנהל/ת מעבדה',
      'phd-student': 'דוקטורנט/ית',
      'msc-student': 'סטודנט/ית לתואר שני',
    },
  },
  publications: {
    heading: 'מחקרים נבחרים',
    fallback: 'הפרסומים והתוצרים המחקריים האחרונים שלנו',
    viewAll: 'לכל הפרסומים',
    viewArticle: 'למאמר',
    openAccess: 'גישה פתוחה',
  },
  contact: {
    heading: 'פרטי התקשרות',
    address: 'כתובת',
    email: 'דוא״ל',
    phone: 'טלפון',
  },
  gallery: {
    title: 'גלריה',
    subtitle: 'רגעים מהשטח, מהמעבדה וממעל לים',
    openPhoto: 'פתיחת תמונה',
    playVideo: 'הפעלת סרטון',
    close: 'סגירה',
    previous: 'הקודם',
    next: 'הבא',
  },
  footer: {
    rights: 'כל הזכויות שמורות.',
    privacy: 'מדיניות פרטיות',
    terms: 'תנאי שימוש',
    accessibility: 'נגישות',
  },
};

export default he;
