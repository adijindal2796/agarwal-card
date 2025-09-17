import { Instagram, MessageCircle, ShoppingBag } from "lucide-react";
import { buildWhatsAppLink } from "../utils/shopUtils";

export function HighlightsSection({ catalog, instagram, whatsapp }) {
  if (!catalog?.length) {
    return null;
  }

  const whatsappLink = buildWhatsAppLink(whatsapp);

  return (
    <section className="mx-auto mt-8 max-w-xl px-5">
      <h2 className="text-lg font-semibold">Shop Highlights</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {catalog.map((item, idx) => (
          <a
            key={`${item.name}-${idx}`}
            href={item.href}
            className={`relative overflow-hidden rounded-2xl p-4 shadow transition hover:shadow-md ${
              item.image ? "text-white" : "bg-white"
            }`}
          >
            {item.image && (
              <>
                <img
                  src={item.image}
                  alt={item.imageAlt || item.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900/70 via-stone-900/40 to-stone-900/80" />
              </>
            )}
            {!item.image && (
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-amber-300 to-rose-300 opacity-40" />
            )}
            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-900">
                <ShoppingBag size={18} />
              </div>
              <p className={`mt-3 text-sm font-semibold ${item.image ? "text-white" : "text-stone-900"}`}>
                {item.name}
              </p>
              <p className={`text-xs ${item.image ? "text-stone-100" : "text-stone-600"}`}>{item.note}</p>
            </div>
          </a>
        ))}
      </div>
      {(instagram || whatsappLink) && (
        <div className="mt-5 flex flex-col items-center gap-2 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Connect with us</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-stone-900"
              >
                <Instagram size={16} /> Instagram
              </a>
            )}
            {instagram && whatsappLink && <span className="text-stone-400">•</span>}
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-stone-900"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
