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
      <header className="relative mx-auto max-w-2xl px-5 pt-24 pb-10 text-center">
        <div className="absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[36px] border-4 border-white/80 bg-white/95 shadow-2xl">
          {logo ? (
            <img
              src={logo}
              alt={`${brand} logo`}
              className="h-24 w-24 object-contain"
              loading="eager"
              fetchPriority="high"
              width={96}
              height={96}
            />
          ) : (
            <div className="grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-amber-500 to-rose-600">
              <span className="text-3xl font-black tracking-widest text-white drop-shadow">{initials}</span>
            </div>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 bg-clip-text text-transparent drop-shadow">
            {brand}
          </span>
        </h1>
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
          className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs shadow hover:bg-white"
        >
          <Share2 size={14} /> Share
        </button>
      </header>
    </div>
  );
}
