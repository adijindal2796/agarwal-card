import { Download, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../utils/shopUtils";

export function StickyBar({ whatsapp, whatsappMessage, onSaveContact }) {
  const whatsappLink = buildWhatsAppLink(whatsapp, whatsappMessage);
  const whatsappAction = whatsappLink ? (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 py-3 hover:bg-white/5"
    >
      <MessageCircle size={18} />
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  ) : (
    <span className="flex items-center justify-center gap-2 py-3 text-white/70">
      <MessageCircle size={18} />
      <span className="text-sm font-semibold">WhatsApp</span>
    </span>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-xl px-4 pb-4">
      <div className="rounded-2xl bg-stone-900/95 text-white shadow-lg backdrop-blur supports-[backdrop-filter]:bg-stone-900/80">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <button
            type="button"
            onClick={onSaveContact}
            className="flex items-center justify-center gap-2 py-3 hover:bg-white/5"
          >
            <Download size={18} />
            <span className="text-sm font-semibold">Save Contact</span>
          </button>
          {whatsappAction}
        </div>
      </div>
    </div>
  );
}
