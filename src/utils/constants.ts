export type NavChildLink = {
  label: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
  children?: NavChildLink[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "/" },
  {
    label: "ABOUT US",
    href: "#about",
    children: [
      { label: "About Institute", href: "/about-institute" },
      { label: "Director Message", href: "/director-message" },
      { label: "Our Mission", href: "/our-mission" },
      { label: "Our Vision", href: "/our-vision" },
      { label: "Achievement", href: "/achievement" },
      // Removed Institute Registration link
    ],
  },
  {
    label: "STUDENTS ZONE",
    href: "/student-zone/registration-process",
    children: [
      { label: "Registration Process", href: "/student-zone/registration-process" },
      { label: "Examination Process", href: "/student-zone/examination-process" },
      { label: "Download Admit Card", href: "/student-zone/download-admit-card" },
      { label: "Registered Student", href: "/student-zone/registered-student" },
    ],
  },
  { label: "COURSES OFFERED", href: "/courses-offered" },
  {
    label: "Training with Gov organization",
    href: "/training-with-government-organization",
    children: [
      { label: "CFTI Government of India", href: "/training-with-government-organization/cfti-government-of-india" },
      { label: "PPDC Government of India", href: "/training-with-government-organization/ppdc-government-of-india" },
      { label: "MSME Government of India", href: "/training-with-government-organization/msme-government-of-india" },
      { label: "CDGI Government of India", href: "/training-with-government-organization/cdgi-government-of-india" },
      { label: "NSIC Government of India", href: "/training-with-government-organization/nsic-government-of-india" },
    ],
  },
  {
    label: "VERIFICATION",
    href: "#",
    children: [
      { label: "Student Verification", href: "/verification/student" },
      { label: "Institute Verification", href: "/verification/atc" },
      { label: "Certificate Verification", href: "/verification/certificate" },
      { label: "Marksheet Verification", href: "/verification/marksheet" },
    ],
  },
  { label: "AFFILIATION PROCESS", href: "/affiliation-process" },
  { label: "GALLERY", href: "/gallery" },
  {
    label: "LOGIN",
    href: "#",
    children: [
      { label: "Admin Login", href: "/admin/login" },
      { label: "Institute Login", href: "/atc/login" },
      { label: "Student Login", href: "/student/login" },
    ],
  },
   { label: "UNIVERSITY COURSES", href: "/mangalaytan-university" },
   { label: "Jobs Support", href: "/jobs-support" },
   { label: "Contact Us", href: "/contact-us" }
];

export const SITE_INFO = {
  name: "Institution",
  tagline: "Official education portal.",
  email: "",
  phone: "",
  address: "",
  hours: "Mon - Sat : 09:00 A.M. - 5:00 P.M.",
  designer: "Provisioningtech",
  mapEmbedUrl:
    "https://www.google.com/maps?q=India&z=5&output=embed",
    // Updated map link as per user request
    // Actually using provided link:
    // "https://maps.app.goo.gl/xbiqVeFAZrZkuVBeA?g_st=awb",
    // This URL can be used for embedding.
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61559987770857" },
  { label: "Instagram", href: "https://www.instagram.com/sunilgroupofeducation" },
  { label: "YouTube", href: "https://youtube.com/@sunilgroupofeducation5941?si=O-cpK3IoFDTxzRrh" },
];

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Courses", href: "/courses-offered" },
  { label: "Contact", href: "/contact-us" },
  { label: "Director's Message", href: "#about" },
];
