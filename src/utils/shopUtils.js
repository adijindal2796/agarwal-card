export const getInitials = (brand = "") => {
  const words = brand.split(/\s+/).filter(Boolean);
  const pick = words.filter(word => /[A-Za-z]/.test(word)).slice(0, 2);
  return pick.map(word => word[0]).join("").toUpperCase();
};

export const createMotifBackground = () => {
  const svg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
      <defs>
        <radialGradient id='rg' cx='50%' cy='40%' r='75%'>
          <stop offset='0%' stop-color='#ffffff'/>
          <stop offset='100%' stop-color='#fff1e6'/>
        </radialGradient>
      </defs>
      <rect width='160' height='160' fill='url(#rg)'/>
      <g fill='none' stroke='#f2d3a0' stroke-width='0.6' opacity='0.6'>
        <path d='M80 10c15 10 25 25 25 40s-10 30-25 40c-15-10-25-25-25-40s10-30 25-40z' />
        <circle cx='80' cy='80' r='55' />
        <path d='M15 80h130M80 15v130' opacity='0.25'/>
      </g>
    </svg>
  `);
  return `url("data:image/svg+xml,${svg}")`;
};

export const getShareUrl = links => {
  if (!links) return "";
  if (links.website) return links.website;
  if (links.instagram) return links.instagram;
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
};

export const buildJsonLd = (config, shareUrl) => {
  const {
    brand,
    contact,
    location,
    links,
    hours,
  } = config;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore"],
    name: brand,
    url: shareUrl || undefined,
    telephone: contact.phone.replace(/\+/g, ""),
    email: contact.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.countryCode,
    },
    sameAs: [links.instagram, links.website].filter(Boolean),
    openingHours: hours.map(({ days, time }) => `${days} ${time}`),
  };
};

const sanitizeFileName = text => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const buildVCard = (config, shareUrl) => {
  const {
    owner,
    brand,
    contact,
    location,
  } = config;

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${owner};;;`,
    `FN:${brand}`,
    `ORG:${brand}`,
    `TEL;TYPE=CELL:${contact.phone}`,
    contact.email ? `EMAIL;TYPE=work:${contact.email}` : null,
    shareUrl ? `URL:${shareUrl}` : null,
    `ADR;TYPE=WORK:;;${location.fullAddress};;;;`,
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
};

export const buildWhatsAppLink = (number, message = "") => {
  if (!number) {
    return "";
  }

  const text = message ? encodeURIComponent(message) : "";
  const query = text ? `?text=${text}` : "";
  return `https://wa.me/${number}${query}`;
};

export const downloadTextFile = (content, filename, mimeType = "text/plain") => {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export const createVCardDownload = (config, shareUrl) => {
  const vcard = buildVCard(config, shareUrl);
  const filename = `${sanitizeFileName(config.brand)}.vcf`;
  downloadTextFile(vcard, filename, "text/vcard");
};
