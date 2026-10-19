export const site = {
  name: "IngeBolsa",
  phoneDisplay: "+57 315 501 4058",
  phoneE164: "+573155014058",
  whatsapp: "573155014058",
  city: "Bogotá",
};

export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
