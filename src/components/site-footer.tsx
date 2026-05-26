import logoMark from "@/assets/logo-mark.jpg";
import { Instagram, Facebook, Youtube, Send } from "lucide-react";
import { useLang } from "@/lib/lang-context";

export function SiteFooter() {
  const { t } = useLang();
  const cols = [
    {
      title: "Organic House",
      links: [t.footer.about, t.footer.stores, t.footer.blog, "Careers"],
    },
    {
      title: t.footer.contact,
      links: [t.footer.delivery, t.footer.returns, "FAQ", "Help center"],
    },
    {
      title: "Legal",
      links: [t.footer.privacy, "Terms", "Cookies", "Compliance"],
    },
  ];

  return (
    <footer className="bg-forest text-cream mt-24">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img src={logoMark} alt="Organic House" className="size-12 rounded-full" />
              <div className="font-display text-2xl text-gold">Organic House</div>
            </div>
            <p className="text-cream/70 max-w-sm text-sm leading-relaxed">
              A curated marketplace for vitamins, supplements, and organic essentials — built around a healthier, more conscious everyday.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Instagram, Facebook, Youtube, Send].map((Icon, i) => (
                <a key={i} href="#" className="size-10 grid place-items-center rounded-full border border-cream/15 hover:bg-gold hover:text-forest-deep hover:border-gold transition">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-gold font-display text-lg mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-cream/70 hover:text-cream text-sm transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payments */}
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} Organic House. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {["VISA", "MC", "Apple Pay", "G Pay", "Click", "Payme", "Uzum"].map((p) => (
              <span key={p} className="px-3 h-8 grid place-items-center rounded-md bg-cream/10 text-cream/80 text-[11px] font-semibold tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
