import { Instagram, ShoppingBag } from "lucide-react";

export function HighlightsSection({ catalog, instagram }) {
  if (!catalog?.length) {
    return null;
  }

  return (
    <section className="mx-auto mt-8 max-w-xl px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Shop Highlights</h2>
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm underline decoration-dotted"
          >
            <Instagram size={16} /> Instagram
          </a>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {catalog.map((item, idx) => (
          <a
            key={`${item.name}-${idx}`}
            href={item.href}
            className="relative overflow-hidden rounded-2xl bg-white p-4 shadow hover:shadow-md"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-amber-300 to-rose-300 opacity-40" />
            <ShoppingBag />
            <p className="mt-2 text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-stone-600">{item.note}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
