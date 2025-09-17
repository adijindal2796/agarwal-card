import { MapPin, Share2 } from "lucide-react";

export function ShopHeader({
  brand,
  description,
  address,
  mapLink,
  initials,
  backgroundImage,
  onShare,
  logo,
}) {
  return (
    <div className="relative isolate">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage }} />
      <header className="relative mx-auto max-w-xl px-5 pt-10 pb-6 text-center">
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-2xl bg-white shadow-lg">
          {logo ? (
            <img
              src={logo}
              alt={`${brand} logo`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-amber-500 to-rose-600">
              <span className="text-3xl font-black tracking-widest text-white drop-shadow">{initials}</span>
            </div>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">{brand}</h1>
        <p className="mt-1 text-sm text-stone-600">{description}</p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-700">
          <MapPin size={16} className="shrink-0" />
          <a
            className="underline decoration-dotted hover:opacity-80"
            href={mapLink}
            target="_blank"
            rel="noreferrer"
          >
            {address}
          </a>
        </div>

        <button
          type="button"
          onClick={onShare}
          className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs shadow hover:bg-white"
        >
          <Share2 size={14} /> Share
        </button>
      </header>
    </div>
  );
}
