const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soruj Mahmud",
  jobTitle: "Professional Frontend Developer",
  url: "https://sorujmahmud.com",
  sameAs: [
    "https://github.com/Soruj24",
    "https://linkedin.com/in/soruj-mahmud",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "UI/UX Design",
    "Frontend Development",
  ],
  description:
    "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences. Building high-performance, accessible web applications.",
  email: "sorujmahmudb2h@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tangail",
    addressRegion: "Dhaka",
    addressCountry: "Bangladesh",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Soruj Mahmud | Frontend Developer Portfolio",
  url: "https://sorujmahmud.com",
  description:
    "Professional Frontend Developer specializing in React, Next.js, and immersive UI/UX experiences.",
  author: {
    "@type": "Person",
    name: "Soruj Mahmud",
  },
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Soruj Mahmud - Frontend Developer Portfolio",
  url: "https://sorujmahmud.com",
  description:
    "Enterprise-level frontend developer portfolio showcasing modern web applications built with React, Next.js, TypeScript, and cutting-edge technologies.",
  author: {
    "@type": "Person",
    name: "Soruj Mahmud",
  },
  genre: "Portfolio",
  inLanguage: "en-US",
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
    </>
  );
}
