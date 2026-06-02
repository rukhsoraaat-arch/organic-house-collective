import { Search, Heart, ShoppingBag, User, MessageCircle, Menu, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useCart } from "@/lib/cart-context";
import type { Lang } from "@/lib/i18n";
import logoMark from "@/assets/logo-mark.jpg";

const langs: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
];

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    t.nav.vitamins, t.nav.sugarFree, t.nav.glutenFree,
    t.nav.snacks, t.nav.beauty, t.nav.tea, t.nav.baby,
    t.nav.desserts, t.nav.bread, t.nav.drinks,
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl shadow-soft" : "bg-background"
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden md:block border-b border-border/50 bg-forest text-cream">
        <div className="container mx-auto px-6 flex items-center justify-between text-xs h-9">
          <span className="tracking-wide opacity-80">{t.header.freeDelivery}</span>
          <div className="flex items-center gap-5 opacity-90">
            <a href="#stores" className="hover:text-gold transition-colors">{t.header.storeLocator}</a>
            <a href="#delivery" className="hover:text-gold transition-colors">{t.header.delivery}</a>
            <a href="#help" className="hover:text-gold transition-colors">{t.header.help}</a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-4 md:gap-8">
        <button className="md:hidden p-2 -ml-2 text-foreground" aria-label="Menu">
          <Menu className="size-5" />
        </button>

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img src={logoMark} alt="Organic House" className="size-10 md:size-12 rounded-full object-cover" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg md:text-xl text-forest tracking-wide">Organic House</div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t.tagline}</div>
          </div>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              className="w-full h-12 pl-11 pr-4 rounded-full bg-secondary/60 border border-transparent focus:border-forest focus:bg-card focus:outline-none transition text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2 ml-auto">
          {/* Lang */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 px-3 h-10 rounded-full text-sm font-medium text-forest hover:bg-secondary transition"
            >
              {langs.find((l) => l.code === lang)?.label}
              <ChevronDown className="size-3.5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-2xl bg-card shadow-lift border border-border overflow-hidden">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition ${
                      lang === l.code ? "text-forest font-semibold" : "text-foreground"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <IconBtn label={t.header.account}><User className="size-5" /></IconBtn>
          <IconBtn label={t.header.wishlist} badge="3"><Heart className="size-5" /></IconBtn>
          <IconBtn onClick={() => setIsCartOpen(true)} label={t.header.cart} badge={totalItems > 0 ? String(totalItems) : undefined}><ShoppingBag className="size-5" /></IconBtn>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={t.searchPlaceholder}
            className="w-full h-11 pl-11 pr-4 rounded-full bg-secondary/60 border border-transparent focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Categories nav */}
      <nav className="hidden lg:block border-t border-border/60">
        <div className="container mx-auto px-6">
          <ul className="flex items-center gap-7 h-12 text-sm overflow-x-auto scrollbar-none">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="relative text-foreground/80 hover:text-forest transition whitespace-nowrap font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function IconBtn({
  children, label, badge, onClick,
}: { children: React.ReactNode; label: string; badge?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative size-10 grid place-items-center rounded-full text-forest hover:bg-secondary transition cursor-pointer"
    >
      {children}
      {badge && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-gold text-forest-deep text-[10px] font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}

export function AssistantButton() {
  const { t } = useLang();
  return (
    <button className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 pl-4 pr-5 h-14 rounded-full bg-forest text-cream shadow-lift hover:bg-forest-deep transition">
      <MessageCircle className="size-5 text-gold" />
      <span className="text-sm font-medium hidden sm:inline">{t.assistant}</span>
      <span className="absolute -top-1 -right-1 size-3 rounded-full bg-gold animate-pulse" />
    </button>
  );
}
