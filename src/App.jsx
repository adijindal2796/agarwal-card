import React, { useMemo } from "react";
import { ActionButtons } from "./components/ActionButtons";
import { AppFooter } from "./components/AppFooter";
import { HighlightsSection } from "./components/HighlightsSection";
import { InfoCards } from "./components/InfoCards";
import { ShopHeader } from "./components/ShopHeader";
import { StickyBar } from "./components/StickyBar";
import { shopConfig } from "./config/shopConfig";
import {
  buildJsonLd,
  createMotifBackground,
  createVCardDownload,
  getInitials,
  getShareUrl,
} from "./utils/shopUtils";

export default function App() {
  const shareUrl = useMemo(() => getShareUrl(shopConfig.links), []);
  const effectiveShareUrl = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
  const initials = useMemo(() => getInitials(shopConfig.brand), []);
  const backgroundImage = useMemo(() => createMotifBackground(), []);
  const jsonLd = useMemo(() => buildJsonLd(shopConfig, effectiveShareUrl), [effectiveShareUrl]);

  const handleSaveContact = () => {
    createVCardDownload(shopConfig, effectiveShareUrl);
  };

  const handleShare = async () => {
    if (!effectiveShareUrl) {
      return;
    }

    const data = {
      title: shopConfig.brand,
      text: shopConfig.messaging.shareText,
      url: effectiveShareUrl,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
      } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(effectiveShareUrl);
        alert("Link copied to clipboard!");
      } else if (typeof window !== "undefined") {
        window.open(effectiveShareUrl, "_blank");
      }
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8ee] via-[#fff3e0] to-[#fde6e6] text-stone-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ShopHeader
        brand={shopConfig.brand}
        description={shopConfig.description}
        address={shopConfig.location.fullAddress}
        mapLink={shopConfig.links.map}
        initials={initials}
        backgroundImage={backgroundImage}
        onShare={handleShare}
      />

      <ActionButtons
        whatsapp={shopConfig.contact.whatsapp}
        whatsappMessage={shopConfig.messaging.whatsappCta}
        phone={shopConfig.contact.phone}
        phoneDisplay={shopConfig.contact.phoneDisplay}
        mapLink={shopConfig.links.map}
        onSaveContact={handleSaveContact}
        reviewLink={shopConfig.links.review}
      />

      <HighlightsSection
        catalog={shopConfig.catalog}
        instagram={shopConfig.links.instagram}
        whatsapp={shopConfig.contact.whatsapp}
      />

      <InfoCards
        hours={shopConfig.hours}
        location={shopConfig.location}
        mapLink={shopConfig.links.map}
        contact={shopConfig.contact}
        links={shopConfig.links}
      />

      <AppFooter
        brand={shopConfig.brand}
        instagram={shopConfig.links.instagram}
        whatsapp={shopConfig.contact.whatsapp}
      />

      <StickyBar
        whatsapp={shopConfig.contact.whatsapp}
        whatsappMessage={shopConfig.messaging.whatsappSticky}
        onSaveContact={handleSaveContact}
      />
    </div>
  );
}
