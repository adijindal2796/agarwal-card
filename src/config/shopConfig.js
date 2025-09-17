import kurtaSetImage from "../assets/highlights/kurta-set.webp";
import sherwaniImage from "../assets/highlights/sherwani.webp";
import nehruJacketImage from "../assets/highlights/nehru-jacket.avif";
import pathaniImage from "../assets/highlights/pathani.webp";

export const shopConfig = {
  brand: "Agarwal Kurta Payjama",
  owner: "Agarwal Kurta Payjama",
  description: "Men's ethnic wear • Ajmer",
  contact: {
    phoneDisplay: "+91 98283 94600",
    phone: "+919828394600",
    whatsapp: "919828394600",
    email: "",
  },
  links: {
    map: "https://maps.app.goo.gl/eNPcbAJUExZCG5hi8",
    instagram:
      "https://www.instagram.com/agarwal_kurta_payjama?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    website: "https://agarwalkurta.com",
    review: "https://g.page/r/CWSLHKxEYhuKEBM/review"
  },
  location: {
    fullAddress: "Agarwal and Company, Nala Bazar Rd, Dargah Bazar, Ajmer, Rajasthan 305001",
    streetAddress: "Nala Bazar Rd, Dargah Bazar",
    locality: "Ajmer",
    region: "Rajasthan",
    postalCode: "305001",
    countryCode: "IN",
  },
  hours: [
    { days: "Mon–Sat ->", time: "   9:30 AM – 10:30 PM" },
    { days: "Sunday->", time: "11:00 AM – 7:00 PM" },
  ],
  catalog: [
    {
      name: "Kurtas & Sets",
      href: "#",
      note: "Cotton • Silk • Festive",
      image: kurtaSetImage,
      imageAlt: "Colorful embroidered kurtas hanging on a rack",
    },
    {
      name: "Sherwanis",
      href: "#",
      note: "Wedding • Reception",
      image: sherwaniImage,
      imageAlt: "Groom wearing an ornate sherwani",
    },
    {
      name: "Nehru Jackets",
      href: "#",
      note: "Solid • Brocade",
      image: nehruJacketImage,
      imageAlt: "Tailor adjusting a Nehru jacket for a customer",
    },
    {
      name: "Pathani Sets",
      href: "#",
      note: "Classic • Comfortable",
      image: pathaniImage,
      imageAlt: "Man dressed in a black pathani suit",
    },
  ],
  messaging: {
    shareText: "Men's ethnic wear in Ajmer — tap to view contact & directions",
    whatsappCta: "Hi! Saw your QR card — looking for men's ethnic wear.",
    whatsappSticky: "Hi! Need details about your men's collection.",
  },
};
