import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sparkles, Truck, ShieldCheck, BookOpen, Play, X } from "lucide-react";
import { LangProvider, useLang } from "@/lib/lang-context";
import { SiteHeader, AssistantButton } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard, type Product } from "@/components/product-card";
import { useState, useEffect } from "react";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";

import hero from "@/assets/hero-1.jpg";
import catVit from "@/assets/cat-vitamins.jpg";
import catOrg from "@/assets/cat-organic.jpg";
import catSf from "@/assets/cat-sugarfree.jpg";
import catGf from "@/assets/cat-glutenfree.jpg";
import catDr from "@/assets/cat-drinks.jpg";
import catSp from "@/assets/cat-sports.jpg";
import prodOmega from "@/assets/prod-omega3.jpg";
import prodCol from "@/assets/prod-collagen.jpg";
import prodVitD from "@/assets/prod-vitd.jpg";
import prodChia from "@/assets/prod-chia.jpg";
import prodAlm from "@/assets/prod-almond.jpg";
import prodMat from "@/assets/prod-matcha.jpg";

export const Route = createFileRoute("/")({
  component: () => (
    <LangProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </LangProvider>
  ),
});

function Home() {
  const [isVitaminModalOpen, setIsVitaminModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      setIsVitaminModalOpen(window.location.hash === "#vitamin-universe");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", handleHash);
    };
  }, []);

  const handleCloseModal = () => {
    window.history.pushState({}, "", window.location.pathname + window.location.search);
    setIsVitaminModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ValueStrip />
        <Categories />
        <Bestsellers />
        <PromoSplit />
        <Brands />
        <Journal />
        <Newsletter />
      </main>
      <SiteFooter />
      <AssistantButton />
      <CartDrawer />
      <VitaminUniverseModal isOpen={isVitaminModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden" id="about">
      <div className="container mx-auto px-6 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-forest text-xs font-medium tracking-wide uppercase">
              <Leaf className="size-3.5" />
              {t.hero.eyebrow}
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-forest text-balance whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="group inline-flex items-center gap-2 h-14 px-7 rounded-full bg-forest text-cream font-medium hover:bg-forest-deep transition shadow-soft">
                {t.hero.ctaPrimary}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </button>
              <button className="inline-flex items-center gap-2 h-14 px-7 rounded-full border border-forest/20 text-forest font-medium hover:bg-secondary transition">
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <Stat n="500+" l="Wellness brands" />
              <Stat n="12k+" l="Happy customers" />
              <Stat n="4.9★" l="Average rating" />
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[5/6] rounded-[2.5rem] overflow-hidden shadow-lift">
              <img src={hero} alt="Organic wellness essentials" width={1600} height={1920} className="w-full h-full object-cover" />
            </div>
            {/* Floating chips */}
            <div className="absolute -left-4 top-12 bg-card rounded-2xl p-4 shadow-lift flex items-center gap-3 animate-float hidden md:flex">
              <div className="size-10 rounded-full bg-sage/30 grid place-items-center">
                <Leaf className="size-5 text-forest" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Certified</div>
                <div className="font-semibold text-sm text-forest">100% Organic</div>
              </div>
            </div>
            <div className="absolute -right-2 bottom-10 bg-card rounded-2xl p-4 shadow-lift hidden md:block">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="size-4 text-gold" />
                <span className="text-xs font-semibold text-forest uppercase tracking-wider">New arrival</span>
              </div>
              <div className="text-sm text-foreground">Organic vitamin D₃ + K₂</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl md:text-3xl text-forest">{n}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
    </div>
  );
}

/* ---------- VALUE ---------- */
function ValueStrip() {
  const { t } = useLang();
  const items = [
    { Icon: Leaf, t: t.valueStrip.organicTitle, s: t.valueStrip.organicSub },
    { Icon: Truck, t: t.valueStrip.deliveryTitle, s: t.valueStrip.deliverySub },
    { Icon: ShieldCheck, t: t.valueStrip.authTitle, s: t.valueStrip.authSub },
    { Icon: Sparkles, t: t.valueStrip.loyaltyTitle, s: t.valueStrip.loyaltySub },
  ];
  return (
    <section className="border-y border-border bg-secondary/40" id="delivery">
      <div className="container mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ Icon, t: title, s }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-card grid place-items-center text-forest shadow-soft">
              <Icon className="size-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-forest">{title}</div>
              <div className="text-xs text-muted-foreground">{s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CATEGORIES ---------- */
function Categories() {
  const { t } = useLang();
  const cats = [
    { key: "vitamins", name: t.nav.vitamins, img: catVit, count: "180+ items" },
    { key: "desserts", name: t.nav.desserts, img: catOrg, count: "90+ items" },
    { key: "sugarFree", name: t.nav.sugarFree, img: catSf, count: "90+ items" },
    { key: "glutenFree", name: t.nav.glutenFree, img: catGf, count: "65+ items" },
    { key: "bread", name: t.nav.bread, img: catSp, count: "110+ items" },
    { key: "drinks", name: t.nav.drinks, img: catDr, count: "70+ items" },
  ];
  return (
    <section className="container mx-auto px-6 py-20 md:py-28" id="categories-section">
      <SectionHeader title={t.sections.categories} sub={t.sections.categoriesSub} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Large feature card */}
        <CategoryCard cat={cats[0]} className="col-span-2 lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" large />
        {cats.slice(1).map((c) => (
          <CategoryCard key={c.key} cat={c} className="aspect-square" />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  cat, className = "", large = false,
}: { cat: { key: string; name: string; img: string; count: string }; className?: string; large?: boolean }) {
  const { t } = useLang();
  const targetHref = cat.key === "vitamins" ? "#vitamin-universe" : `#category-${cat.key}`;
  return (
    <a href={targetHref} className={`group relative overflow-hidden rounded-3xl ${className}`}>
      <img src={cat.img} alt={cat.name} loading="lazy" width={800} height={1000} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest/30 to-transparent" />
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-cream">
        <div className="text-[11px] uppercase tracking-[0.2em] text-gold mb-1.5">{cat.count}</div>
        <h3 className={`font-display ${large ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"} leading-tight`}>
          {cat.name}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition">
          {t.universe.explore} <ArrowRight className="size-4" />
        </div>
      </div>
    </a>
  );
}

/* ---------- VITAMINS MODAL ---------- */
function VitaminUniverseModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLang();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const groups = [
    { name: t.universe.kids, count: 24 },
    { name: t.universe.women, count: 38 },
    { name: t.universe.men, count: 32 },
    { name: t.universe.pregnancy, count: 18 },
    { name: t.universe.immunity, count: 41 },
    { name: t.universe.beauty, count: 27 },
    { name: t.universe.hair, count: 19 },
    { name: t.universe.weight, count: 22 },
    { name: t.universe.sports, count: 35 },
    { name: t.universe.sleep, count: 16 },
    { name: t.universe.brain, count: 21 },
    { name: t.universe.stress, count: 15 },
    { name: t.universe.energy, count: 28 },
    { name: t.universe.omega, count: 14 },
    { name: t.universe.magnesium, count: 12 },
    { name: t.universe.zinc, count: 9 },
    { name: t.universe.collagen, count: 17 },
    { name: t.universe.vitD, count: 23 },
    { name: t.universe.vitC, count: 19 },
    { name: t.universe.probiotics, count: 26 },
    { name: t.universe.multivitamins, count: 31 },
    { name: t.universe.superfoods, count: 18 },
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-forest text-cream border border-cream/10 rounded-3xl w-full max-w-4xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background blobs inside modal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          <div className="absolute -top-32 -right-32 size-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 size-80 rounded-full bg-sage/10 blur-3xl" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 size-10 rounded-full bg-cream/10 hover:bg-cream/20 grid place-items-center text-gold hover:text-cream transition cursor-pointer z-10"
        >
          <X className="size-5" />
        </button>

        <div className="relative z-10">
          <div className="mb-8 pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/10 text-gold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="size-3.5" /> Curated selection
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight">
              {t.sections.vitaminUniverse}
            </h2>
            <p className="mt-2 text-cream/70 text-sm max-w-xl">{t.sections.vitaminUniverseSub}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {groups.map((g) => (
              <a
                key={g.name}
                href={`/?search=${encodeURIComponent(g.name)}#products-section`}
                onClick={(e) => {
                  e.preventDefault();
                  // Apply search filter
                  const url = new URL(window.location.href);
                  url.searchParams.set("search", g.name);
                  // Also set activeCategory to vitamins so that it is scoped properly
                  url.hash = "#category-vitamins";
                  window.history.pushState({}, "", url.toString());
                  window.dispatchEvent(new Event("popstate"));
                  
                  // Close modal
                  onClose();
                  
                  // Scroll down to products
                  setTimeout(() => {
                    const el = document.getElementById("products-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 150);
                }}
                className="group p-4 md:p-5 rounded-2xl bg-cream/[0.06] hover:bg-cream/10 border border-cream/10 hover:border-gold/40 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="size-9 rounded-full bg-gold/15 grid place-items-center group-hover:bg-gold transition">
                    <Leaf className="size-4 text-gold group-hover:text-forest-deep transition" />
                  </div>
                  <span className="text-[11px] text-cream/50">{g.count}</span>
                </div>
                <div className="font-medium text-sm text-cream leading-snug">{g.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- BESTSELLERS ---------- */
function normalizeCategory(cat: string): string {
  const c = cat.toLowerCase().trim();
  if (c.includes("витамин") || c.includes("vitamin") || c.includes("бад") || c.includes("supplements") || c.includes("bad")) return "vitamins";
  if (c.includes("сахар") || c.includes("sugar-free") || c.includes("sugarfree") || c.includes("shakarsiz")) return "sugarFree";
  if (c.includes("глютен") || c.includes("gluten-free") || c.includes("glutenfree") || c.includes("glutensiz")) return "glutenFree";
  if (c.includes("красот") || c.includes("beauty") || c.includes("go'zallik")) return "beauty";
  if (c.includes("десерт") || c.includes("dessert")) return "desserts";
  if (c.includes("хлеб") || c.includes("bread") || c.includes("non")) return "bread";
  if (c.includes("напит") || c.includes("drink") || c.includes("beverage") || c.includes("ichimlik")) return "drinks";
  if (c.includes("перекус") || c.includes("snack") || c.includes("yengil taom")) return "snacks";
  return c;
}

/* ---------- BESTSELLERS ---------- */
function Bestsellers() {
  const { lang, t } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const defaultProducts: Product[] = [
    { id: "1", name: "Premium Omega 3 Fish Oil", category: "БАДы", price: 285000, oldPrice: 340000, rating: 4.9, reviews: 312, image: "/assets/prod-omega3-C_vjyhwb.jpg", badge: "sale" },
    { id: "2", name: "Marine Collagen + Vitamin C", category: "Красота", price: 420000, rating: 4.8, reviews: 198, image: "/assets/prod-collagen-BqEX6mLl.jpg", badge: "new" },
    { id: "3", name: "Vitamin D₃ 5000 IU", category: "Витамины", price: 175000, rating: 4.9, reviews: 421, image: "/assets/prod-vitd-k__PCbaP.jpg", badge: "bestseller" },
    { id: "4", name: "Organic Chia Seeds 500g", category: "Суперфуды", price: 89000, oldPrice: 110000, rating: 4.7, reviews: 156, image: "/assets/prod-chia-BWTeDBqs.jpg" },
    { id: "5", name: "Raw Almond Butter", category: "Десерты", price: 145000, rating: 4.8, reviews: 89, image: "/assets/prod-almond-D45IKrfv.jpg", badge: "new" },
    { id: "6", name: "Ceremonial Matcha Powder", category: "Напитки", price: 320000, rating: 4.9, reviews: 245, image: "/assets/prod-matcha-w7IoWVtJ.jpg" },
  ];

  useEffect(() => {
    // Fetch products from server API
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts(defaultProducts);
        }
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setProducts(defaultProducts);
      });
  }, []);

  useEffect(() => {
    const handleHashAndSearch = () => {
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search") || "";
      const hash = window.location.hash;
      
      setSearchQuery(search);
      
      if (hash.startsWith("#category-")) {
        const cat = hash.replace("#category-", "");
        setActiveCategory(cat);
        // Scroll to products section
        setTimeout(() => {
          const el = document.getElementById("products-section");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (!hash) {
        setActiveCategory("all");
      }
    };
    
    handleHashAndSearch();
    window.addEventListener("hashchange", handleHashAndSearch);
    window.addEventListener("popstate", handleHashAndSearch);
    
    return () => {
      window.removeEventListener("hashchange", handleHashAndSearch);
      window.removeEventListener("popstate", handleHashAndSearch);
    };
  }, []);

  const categoriesList = [
    { key: "all", label: lang === "ru" ? "Все" : lang === "uz" ? "Barchasi" : "All" },
    { key: "vitamins", label: t.nav.vitamins },
    { key: "sugarFree", label: t.nav.sugarFree },
    { key: "glutenFree", label: t.nav.glutenFree },
    { key: "desserts", label: t.nav.desserts },
    { key: "bread", label: t.nav.bread },
    { key: "drinks", label: t.nav.drinks },
  ];

  const filteredProducts = products.filter((p) => {
    // 1. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = p.name.toLowerCase().includes(q);
      const matchesCat = p.category.toLowerCase().includes(q);
      if (!matchesName && !matchesCat) return false;
    }

    // 2. Category Filter
    if (activeCategory !== "all") {
      const normalizedP = normalizeCategory(p.category);
      if (normalizedP !== activeCategory) return false;
    }

    return true;
  });

  return (
    <section className="container mx-auto px-6 py-20 md:py-28" id="products-section">
      <SectionHeader title={t.sections.bestsellers} sub={t.sections.bestsellersSub} />
      
      {/* Category Filter Pills */}
      <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-6 mb-8 -mx-6 px-6 md:mx-0 md:px-0">
        {categoriesList.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                if (cat.key === "vitamins") {
                  window.location.hash = "#vitamin-universe";
                  return;
                }
                setActiveCategory(cat.key);
                // Update URL hash without reloading page
                const newHash = cat.key === "all" ? "" : `#category-${cat.key}`;
                window.history.pushState({}, "", window.location.pathname + window.location.search + newHash);
              }}
              className={`h-11 px-6 rounded-full text-sm font-medium transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-forest text-cream shadow-md"
                  : "bg-secondary text-forest hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {searchQuery && (
        <div className="flex items-center gap-3 bg-secondary text-forest px-5 py-2.5 rounded-2xl w-fit mb-8 animate-fade-in">
          <span className="text-sm">
            {lang === "ru" ? "Результаты поиска для" : lang === "uz" ? "Qidiruv natijalari" : "Search results for"}: <strong className="font-semibold">"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              // clear url search param
              const url = new URL(window.location.href);
              url.searchParams.delete("search");
              window.history.pushState({}, "", url.toString());
              window.dispatchEvent(new Event("popstate"));
            }}
            className="text-xs bg-forest text-cream rounded-full px-2.5 py-1 hover:bg-forest-deep transition cursor-pointer"
          >
            {lang === "ru" ? "Сбросить" : lang === "uz" ? "Tozalash" : "Clear"}
          </button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-3xl">
          <p className="text-lg font-medium">{lang === "ru" ? "Товары не найдены" : lang === "uz" ? "Mahsulotlar topilmadi" : "No products found"}</p>
          <p className="text-sm mt-1">{lang === "ru" ? "Попробуйте изменить параметры фильтрации или поиска" : lang === "uz" ? "Qidiruv parametrlarini o'zgartirib ko'ring" : "Try changing filter options or search term"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- PROMO SPLIT ---------- */
function PromoSplit() {
  const { t } = useLang();
  return (
    <section className="container mx-auto px-6 pb-20 md:pb-28 grid md:grid-cols-2 gap-5">
      <PromoCard
        eyebrow={t.promo.seasonalEyebrow}
        title={t.promo.seasonalTitle}
        desc={t.promo.seasonalDesc}
        img={catVit}
        dark
      />
      <PromoCard
        eyebrow={t.promo.sugarFreeEyebrow}
        title={t.promo.sugarFreeTitle}
        desc={t.promo.sugarFreeDesc}
        img={catSf}
      />
    </section>
  );
}

function PromoCard({ eyebrow, title, desc, img, dark = false }: {
  eyebrow: string; title: string; desc: string; img: string; dark?: boolean;
}) {
  const { t } = useLang();
  return (
    <a href="#" className="relative group overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[16/10]">
      <img src={img} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className={`absolute inset-0 ${dark ? "bg-gradient-to-br from-forest-deep/85 via-forest/60 to-transparent" : "bg-gradient-to-tr from-cream/95 via-cream/60 to-transparent"}`} />
      <div className={`absolute inset-0 p-8 md:p-10 flex flex-col justify-end ${dark ? "text-cream" : "text-forest"}`}>
        <div className={`text-[11px] uppercase tracking-[0.2em] mb-3 ${dark ? "text-gold" : "text-forest/70"}`}>{eyebrow}</div>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight max-w-md text-balance">{title}</h3>
        <p className={`mt-3 max-w-sm text-sm ${dark ? "text-cream/80" : "text-forest/70"}`}>{desc}</p>
        <div className="mt-5 inline-flex items-center gap-2 font-medium">
          {t.promo.shopNow} <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </a>
  );
}

/* ---------- BRANDS ---------- */
function Brands() {
  const { t } = useLang();
  const brands = ["Now Foods", "Solgar", "Garden of Life", "Nordic Naturals", "Vital Proteins", "Sunwarrior", "Pukka", "Navitas", "Thorne", "Country Life"];
  return (
    <section className="bg-secondary/50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{t.sections.brands}</div>
        </div>
        <div className="overflow-hidden">
          <div className="flex marquee-track gap-12 whitespace-nowrap">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="font-display text-2xl md:text-3xl text-forest/40 hover:text-forest transition">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- JOURNAL ---------- */
function Journal() {
  const { t } = useLang();
  const posts = [
    { tag: t.journal.post1Tag, title: t.journal.post1Title, img: catVit, read: t.journal.post1Read },
    { tag: t.journal.post2Tag, title: t.journal.post2Title, img: catSf, read: t.journal.post2Read },
    { tag: t.journal.post3Tag, title: t.journal.post3Title, img: catDr, read: t.journal.post3Read },
  ];
  return (
    <section className="container mx-auto px-6 py-20 md:py-28" id="blog">
      <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-forest text-[11px] uppercase tracking-widest mb-4">
            <BookOpen className="size-3.5" /> {t.sections.journal}
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-forest text-balance max-w-xl">{t.sections.journalSub}</h2>
        </div>
        <a href="#blog" className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all">
          {t.journal.allArticles} <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <a key={p.title} href="#" className="group">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-5">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {p.tag === t.journal.post3Tag && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="size-16 rounded-full bg-cream/95 grid place-items-center shadow-lift group-hover:scale-110 transition">
                    <Play className="size-6 text-forest fill-forest ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-cream/95 text-forest text-[11px] font-semibold uppercase tracking-wider">
                {p.tag}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-2">{p.read}</div>
            <h3 className="font-display text-2xl text-forest group-hover:text-forest-deep transition leading-tight">{p.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */
function Newsletter() {
  const { t } = useLang();
  return (
    <section className="container mx-auto px-6 pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-forest-deep via-forest to-forest-deep p-10 md:p-16 lg:p-20 text-cream">
        <div className="absolute -top-20 -right-10 size-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-sage/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <Leaf className="size-8 text-gold mb-6" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-5 text-balance">
            {t.sections.newsletter}
          </h2>
          <p className="text-cream/75 text-lg mb-8 max-w-lg">{t.sections.newsletterSub}</p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 h-14 px-6 rounded-full bg-cream/10 backdrop-blur border border-cream/15 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition"
            />
            <button className="h-14 px-8 rounded-full bg-gold text-forest-deep font-semibold hover:bg-gold-soft transition shadow-lift whitespace-nowrap">
              {t.sections.subscribe}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({ title, sub }: { title: string; sub: string }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
      <div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest leading-[1.05] text-balance">{title}</h2>
        <p className="mt-3 text-muted-foreground max-w-md">{sub}</p>
      </div>
      <a href="#products-section" className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all whitespace-nowrap">
        {t.universe.viewAll} <ArrowRight className="size-4" />
      </a>
    </div>
  );
}
