import { Download, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { buildWhatsAppLink } from "../utils/shopUtils";

export function ActionButtons({
  whatsapp,
  whatsappMessage,
  phone,
  phoneDisplay,
  mapLink,
  onSaveContact,
  reviewLink,
}) {
  const whatsappLink = buildWhatsAppLink(whatsapp, whatsappMessage);

  const whatsappCard = whatsappLink ? (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl bg-white p-4 shadow hover:shadow-md"
    >
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 transition group-hover:scale-105">
        <MessageCircle />
      </div>
      <p className="mt-2 text-center text-sm font-semibold">WhatsApp</p>
    </a>
  ) : (
    <div className="rounded-2xl bg-white p-4 shadow opacity-60">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
        <MessageCircle />
      </div>
      <p className="mt-2 text-center text-sm font-semibold">WhatsApp</p>
    </div>
  );

  return (
    <section className="mx-auto mt-1 max-w-xl px-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {whatsappCard}

        <a href={`tel:${phone}`} className="group rounded-2xl bg-white p-4 shadow hover:shadow-md">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 transition group-hover:scale-105">
            <Phone />
          </div>
          <p className="mt-2 text-center text-sm font-semibold">Call {phoneDisplay}</p>
        </a>

        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl bg-white p-4 shadow hover:shadow-md"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 transition group-hover:scale-105">
            <MapPin />
          </div>
          <p className="mt-2 text-center text-sm font-semibold">Directions</p>
        </a>

        <button type="button" onClick={onSaveContact} className="group rounded-2xl bg-white p-4 shadow hover:shadow-md">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 transition group-hover:scale-105">
            <Download />
          </div>
          <p className="mt-2 text-center text-sm font-semibold">Save Contact</p>
        </button>

        {reviewLink && (
          <a
            href={reviewLink}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl bg-white p-4 shadow hover:shadow-md"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 transition group-hover:scale-105">
              <Star />
            </div>
            <p className="mt-2 text-center text-sm font-semibold">Review Us</p>
          </a>
        )}
      </div>
    </section>
  );
}
