import React, { useMemo } from "react";
import { Phone, MessageCircle, MapPin, Instagram, Download, ShoppingBag, Clock, Share2, Mail, Globe } from "lucide-react";

// Single–file React component for a QR / Digital Visiting Card landing page
// ✅ Tailwind CSS classes used throughout
// ✅ Works in a standard Vite + React project
// ✅ Includes: vCard download, Web Share API, JSON‑LD for SEO
// 👉 Update the SHOP object with your real details

const SHOP = {
  brand: "Agarwal & Company",
  owner: "Agarwal & Company",
  phoneDisplay: "+91 98283 94600",
  phone: "+919828394600", // full digits, for tel:/vCard
  whatsapp: "919828394600", // numeric for wa.me
  email: "", // optional ("" to hide)
  addressLine: "Agarwal and Company, Nala Bazar Rd, Dargah Bazar, Ajmer, Rajasthan 305001",
  mapLink: "https://maps.app.goo.gl/eNPcbAJUExZCG5hi8",
  instagram: "https://www.instagram.com/agarwal_kurta_payjama?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  website: "", // optional; if blank, Instagram will be used in share/SEO URL
  hours: [
    { d: "Mon–Sat", h: "11:00 AM – 9:00 PM" },
    { d: "Sunday", h: "11:00 AM – 7:00 PM" },
  ],
  catalog: [
    { name: "Kurtas & Sets", href: "#", note: "Cotton • Silk • Festive" },
    { name: "Sherwanis", href: "#", note: "Wedding • Reception" },
    { name: "Nehru Jackets", href: "#", note: "Solid • Brocade" },
    { name: "Pathani Sets", href: "#", note: "Classic • Comfortable" },
    { name: "Jodhpuri Suits", href: "#", note: "Bandhgala • Formal" },
  ],
};

export default function App() {
  const initials = useMemo(() => {
    const words = SHOP.brand.split(/\s+/).filter(Boolean);
    const pick = words.filter(w => /[A-Za-z]/.test(w)).slice(0, 2);
    return pick.map(w => w[0]).join("").toUpperCase();
  }, []);

  // Subtle Indian motif background (inline SVG -> data URL)
  const bgUrl = useMemo(() => {
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
  }, []);

  const shareUrl = SHOP.website || SHOP.instagram || (typeof window !== "undefined" ? window.location.href : "");

  // Schema.org JSON‑LD (LocalBusiness / ClothingStore)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore"],
    name: SHOP.brand,
    url: shareUrl || undefined,
    telephone: SHOP.phone.replace(/\+/g, ""),
    email: SHOP.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nala Bazar Rd, Dargah Bazar",
      addressLocality: "Ajmer",
      addressRegion: "Rajasthan",
      postalCode: "305001",
      addressCountry: "IN",
    },
    sameAs: [SHOP.instagram].filter(Boolean),
    openingHours: SHOP.hours.map(h => `${h.d} ${h.h}`),
  };

  const onSaveVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${SHOP.owner};;;`,
      `FN:${SHOP.brand}`,
      `ORG:${SHOP.brand}`,
      `TEL;TYPE=CELL:${SHOP.phone}`,
      SHOP.email ? `EMAIL;TYPE=work:${SHOP.email}` : null,
      shareUrl ? `URL:${shareUrl}` : null,
      `ADR;TYPE=WORK:;;${SHOP.addressLine};;;;`,
      "END:VCARD",
    ].filter(Boolean).join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${SHOP.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onShare = async () => {
    const data = {
      title: SHOP.brand,
      text: "Men's ethnic wear in Ajmer — tap to view contact & directions",
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } else {
        window.open(shareUrl, "_blank");
      }
    } catch (_) {
      // user cancelled share — ignore
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8ee] via-[#fff3e0] to-[#fde6e6] text-stone-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header / Brand */}
      <div className="relative isolate">
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: bgUrl }} />
        <header className="relative mx-auto max-w-xl px-5 pt-10 pb-6 text-center">
          <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 shadow-lg grid place-items-center">
            <span className="text-3xl font-black tracking-widest text-white drop-shadow">{initials}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">{SHOP.brand}</h1>
          <p className="mt-1 text-sm text-stone-600">Men's ethnic wear • Ajmer</p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-700">
            <MapPin size={16} className="shrink-0" />
            <button className="underline decoration-dotted hover:opacity-80" onClick={() => window.open(SHOP.mapLink, "_blank")}>{SHOP.addressLine}</button>
          </div>

          <button onClick={onShare} className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs shadow hover:bg-white">
            <Share2 size={14} /> Share
          </button>
        </header>
      </div>

      {/* Primary CTA buttons */}
      <section className="mx-auto mt-1 max-w-xl px-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <a href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Hi! Saw your QR card — looking for men's ethnic wear.")}`} target="_blank" rel="noreferrer" className="group rounded-2xl bg-white p-4 shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 group-hover:scale-105 transition">
              <MessageCircle className="" />
            </div>
            <p className="mt-2 text-center text-sm font-semibold">WhatsApp</p>
          </a>
          <a href={`tel:${SHOP.phone}`} className="group rounded-2xl bg-white p-4 shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 group-hover:scale-105 transition">
              <Phone />
            </div>
            <p className="mt-2 text-center text-sm font-semibold">Call {SHOP.phoneDisplay}</p>
          </a>
          <a href={SHOP.mapLink} target="_blank" rel="noreferrer" className="group rounded-2xl bg-white p-4 shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 group-hover:scale-105 transition">
              <MapPin />
            </div>
            <p className="mt-2 text-center text-sm font-semibold">Directions</p>
          </a>
          <button onClick={onSaveVCard} className="group rounded-2xl bg-white p-4 shadow hover:shadow-md">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 group-hover:scale-105 transition">
              <Download />
            </div>
            <p className="mt-2 text-center text-sm font-semibold">Save Contact</p>
          </button>
        </div>
      </section>

      {/* Catalog / Highlights */}
      <section className="mx-auto max-w-xl px-5 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Shop Highlights</h2>
          <a href={SHOP.instagram} target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 underline decoration-dotted">
            <Instagram size={16} /> Instagram
          </a>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {SHOP.catalog.map((c, idx) => (
            <a key={idx} href={c.href} className="relative overflow-hidden rounded-2xl bg-white p-4 shadow hover:shadow-md">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-amber-300 to-rose-300 opacity-40"/>
              <ShoppingBag className="" />
              <p className="mt-2 text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-stone-600">{c.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-xl px-5 mt-8 grid gap-3">
        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5" />
            <div>
              <p className="font-semibold">Store Hours</p>
              <ul className="mt-1 text-sm text-stone-700">
                {SHOP.hours.map((row, i) => (
                  <li key={i} className="flex justify-between"><span>{row.d}</span><span>{row.h}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5" />
            <div>
              <p className="font-semibold">Find Us</p>
              <p className="mt-1 text-sm text-stone-700">{SHOP.addressLine}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <a href={SHOP.mapLink} target="_blank" rel="noreferrer" className="rounded-full bg-stone-900 px-3 py-1.5 text-white hover:opacity-90">Open in Maps</a>
                <button onClick={() => { navigator.clipboard.writeText(SHOP.addressLine); }} className="rounded-full bg-stone-100 px-3 py-1.5 hover:bg-stone-200">Copy address</button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {SHOP.email && (
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={`mailto:${SHOP.email}`}><Mail size={16}/> {SHOP.email}</a>
            )}
            {SHOP.email && <span className="text-stone-400">•</span>}
            {(SHOP.website || SHOP.instagram) && (
              <a className="inline-flex items-center gap-2 hover:opacity-80" href={(SHOP.website || SHOP.instagram)} target="_blank" rel="noreferrer"><Globe size={16}/> Website</a>
            )}
            {(SHOP.website || SHOP.instagram) && <span className="text-stone-400">•</span>}
            <a className="inline-flex items-center gap-2 hover:opacity-80" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-xl px-5 py-10 text-center text-xs text-stone-500">
        <p>© {new Date().getFullYear()} {SHOP.brand}. All rights reserved.</p>
        <p className="mt-1">Crafted for QR visits • Built with ❤️</p>
      </footer>

      {/* Sticky bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-xl px-4 pb-4">
        <div className="rounded-2xl bg-stone-900/95 backdrop-blur supports-[backdrop-filter]:bg-stone-900/80 text-white shadow-lg">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <button onClick={onSaveVCard} className="flex items-center justify-center gap-2 py-3 hover:bg-white/5">
              <Download size={18}/> <span className="text-sm font-semibold">Save Contact</span>
            </button>
            <a href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent("Hi! Need details about your men's collection.")}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 hover:bg-white/5">
              <MessageCircle size={18}/> <span className="text-sm font-semibold">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
