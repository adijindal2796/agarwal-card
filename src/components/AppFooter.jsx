import { Instagram, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../utils/shopUtils";

export function AppFooter({ brand, instagram, whatsapp }) {
  const whatsappLink = buildWhatsAppLink(whatsapp);

  return (
    <footer className="mx-auto max-w-xl px-5 py-10 text-center text-xs text-stone-500">
      <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
      <p className="mt-1">Crafted for QR visits • Built with ❤️</p>
      {(instagram || whatsappLink) && (
        <div className="mt-3 flex items-center justify-center gap-3 text-sm text-stone-600">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-stone-800"
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
              className="inline-flex items-center gap-1 hover:text-stone-800"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          )}
        </div>
      )}
    </footer>
  );
}
