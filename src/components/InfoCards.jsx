import { Fragment } from "react";
import { Clock, Globe, Mail, MapPin, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../utils/shopUtils";

export function InfoCards({
  hours = [],
  location = {},
  mapLink,
  contact = {},
  links = {},
}) {
  const handleCopyAddress = async () => {
    if (!location.fullAddress) {
      return;
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(location.fullAddress);
        alert("Address copied to clipboard!");
      }
    } catch (error) {
      console.error("Unable to copy address", error);
    }
  };

  const websiteUrl = links.website || links.instagram;
  const websiteLabel = links.website ? "Website" : "Instagram";
  const whatsappLink = buildWhatsAppLink(contact.whatsapp);
  const contactItems = [];

  if (contact.email) {
    contactItems.push({
      key: "email",
      element: (
        <a className="inline-flex items-center gap-2 hover:opacity-80" href={`mailto:${contact.email}`}>
          <Mail size={16} /> {contact.email}
        </a>
      ),
    });
  }

  if (websiteUrl) {
    contactItems.push({
      key: "website",
      element: (
        <a
          className="inline-flex items-center gap-2 hover:opacity-80"
          href={websiteUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Globe size={16} /> {websiteLabel}
        </a>
      ),
    });
  }

  if (whatsappLink) {
    contactItems.push({
      key: "whatsapp",
      element: (
        <a
          className="inline-flex items-center gap-2 hover:opacity-80"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      ),
    });
  }

  return (
    <section className="mx-auto mt-8 grid max-w-xl gap-3 px-5">
      <div className="rounded-2xl bg-white p-4 shadow">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5" />
          <div>
            <p className="font-semibold">Store Hours</p>
            <ul className="mt-1 text-sm text-stone-700">
              {hours.map(({ days, time }) => (
                <li key={`${days}-${time}`} className="flex justify-between">
                  <span>{days}</span>
                  <span>{time}</span>
                </li>
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
            <p className="mt-1 text-sm text-stone-700">{location.fullAddress}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-stone-900 px-3 py-1.5 text-white hover:opacity-90"
              >
                Open in Maps
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="rounded-full bg-stone-100 px-3 py-1.5 hover:bg-stone-200"
              >
                Copy address
              </button>
            </div>
          </div>
        </div>
      </div>

      {contactItems.length > 0 && (
        <div className="rounded-2xl bg-white p-4 shadow">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {contactItems.map((item, index) => (
              <Fragment key={item.key}>
                {index > 0 && <span className="text-stone-400">•</span>}
                {item.element}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
