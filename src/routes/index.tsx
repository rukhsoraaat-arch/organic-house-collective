import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sparkles, Truck, ShieldCheck, BookOpen, Play } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ValueStrip />
        <Categories />
        <VitaminUniverse />
        <Bestsellers />
        <PromoSplit />
        <Brands />
        <Journal />
        <Newsletter />
      </main>
      <SiteFooter />
      <AssistantButton />
      <CartDrawer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden">
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
  const items = [
    { Icon: Leaf, t: "100% Organic", s: "Certified clean sourcing" },
    { Icon: Truck, t: "Fast delivery", s: "Same-day in Tashkent" },
    { Icon: ShieldCheck, t: "Authentic", s: "Direct from brands" },
    { Icon: Sparkles, t: "Loyalty points", s: "Earn with every order" },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ Icon, t, s }) => (
          <div key={t} className="flex items-center gap-3">
            <div className="size-11 rounded-full bg-card grid place-items-center text-forest shadow-soft">
              <Icon className="size-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-forest">{t}</div>
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
    { name: t.nav.vitamins, img: catVit, count: "180+ items", size: "lg" },
    { name: t.nav.organic, img: catOrg, count: "240+ items" },
    { name: t.nav.sugarFree, img: catSf, count: "90+ items" },
    { name: t.nav.glutenFree, img: catGf, count: "65+ items" },
    { name: t.nav.sports, img: catSp, count: "110+ items" },
    { name: "Drinks & Beverages", img: catDr, count: "70+ items" },
  ];
  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <SectionHeader title={t.sections.categories} sub={t.sections.categoriesSub} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Large feature card */}
        <CategoryCard cat={cats[0]} className="col-span-2 lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" large />
        {cats.slice(1).map((c) => (
          <CategoryCard key={c.name} cat={c} className="aspect-square" />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  cat, className = "", large = false,
}: { cat: { name: string; img: string; count: string }; className?: string; large?: boolean }) {
  return (
    <a href="#" className={`group relative overflow-hidden rounded-3xl ${className}`}>
      <img src={cat.img} alt={cat.name} loading="lazy" width={800} height={1000} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest/30 to-transparent" />
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-cream">
        <div className="text-[11px] uppercase tracking-[0.2em] text-gold mb-1.5">{cat.count}</div>
        <h3 className={`font-display ${large ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"} leading-tight`}>
          {cat.name}
        </h3>
        <div className="mt-3 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition">
          Explore <ArrowRight className="size-4" />
        </div>
      </div>
    </a>
  );
}

/* ---------- VITAMINS ---------- */
function VitaminUniverse() {
  const { t } = useLang();
  const groups = [
    { name: "Vitamins for Kids", count: 24 },
    { name: "Vitamins for Women", count: 38 },
    { name: "Vitamins for Men", count: 32 },
    { name: "Vitamins for Pregnancy", count: 18 },
    { name: "Immunity Support", count: 41 },
    { name: "Beauty & Skin", count: 27 },
    { name: "Hair & Nails", count: 19 },
    { name: "Weight Loss", count: 22 },
    { name: "Sports & Performance", count: 35 },
    { name: "Sleep & Calm", count: 16 },
    { name: "Brain & Focus", count: 21 },
    { name: "Stress Relief", count: 15 },
    { name: "Energy & Vitality", count: 28 },
    { name: "Omega 3", count: 14 },
    { name: "Magnesium", count: 12 },
    { name: "Zinc", count: 9 },
    { name: "Collagen", count: 17 },
    { name: "Vitamin D", count: 23 },
    { name: "Vitamin C", count: 19 },
    { name: "Probiotics", count: 26 },
    { name: "Multivitamins", count: 31 },
    { name: "Superfoods Mix", count: 18 },
  ];

  return (
    <section className="bg-forest text-cream py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 size-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-sage/10 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-gold text-xs uppercase tracking-widest mb-4">
              <Sparkles className="size-3.5" /> Curated selection
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream max-w-2xl text-balance">
              {t.sections.vitaminUniverse}
            </h2>
            <p className="mt-4 text-cream/70 max-w-xl">{t.sections.vitaminUniverseSub}</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-gold hover:text-cream transition">
            View all <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {groups.map((g) => (
            <a key={g.name} href="#" className="group p-5 rounded-2xl bg-cream/[0.06] hover:bg-cream/10 border border-cream/10 hover:border-gold/40 transition">
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
    </section>
  );
}

/* ---------- BESTSELLERS ---------- */
function Bestsellers() {
  const { t } = useLang();
  const [products, setProducts] = useState<Product[]>([]);

  const defaultProducts: Product[] = [
    { id: "1", name: "Premium Omega 3 Fish Oil", category: "Supplements", price: 285000, oldPrice: 340000, rating: 4.9, reviews: 312, image: prodOmega, badge: "sale" },
    { id: "2", name: "Marine Collagen + Vitamin C", category: "Beauty", price: 420000, rating: 4.8, reviews: 198, image: prodCol, badge: "new" },
    { id: "3", name: "Vitamin D₃ 5000 IU", category: "Vitamins", price: 175000, rating: 4.9, reviews: 421, image: prodVitD, badge: "bestseller" },
    { id: "4", name: "Organic Chia Seeds 500g", category: "Superfoods", price: 89000, oldPrice: 110000, rating: 4.7, reviews: 156, image: prodChia },
    { id: "5", name: "Raw Almond Butter", category: "Organic", price: 145000, rating: 4.8, reviews: 89, image: prodAlm, badge: "new" },
    { id: "6", name: "Ceremonial Matcha Powder", category: "Tea & Coffee", price: 320000, rating: 4.9, reviews: 245, image: prodMat },
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ohc_products");
      setProducts(raw ? JSON.parse(raw) : defaultProducts);
    } catch {
      setProducts(defaultProducts);
    }
  }, []);

  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <SectionHeader title={t.sections.bestsellers} sub={t.sections.bestsellersSub} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------- PROMO SPLIT ---------- */
function PromoSplit() {
  return (
    <section className="container mx-auto px-6 pb-20 md:pb-28 grid md:grid-cols-2 gap-5">
      <PromoCard
        eyebrow="Seasonal — Winter immunity"
        title="Strengthen the season."
        desc="Build your defence with vitamin C, zinc and elderberry rituals."
        img={catVit}
        dark
      />
      <PromoCard
        eyebrow="Sugar-free desserts"
        title="Sweet, without the sugar."
        desc="Indulgent treats made for everyday wellbeing."
        img={catSf}
      />
    </section>
  );
}

function PromoCard({ eyebrow, title, desc, img, dark = false }: {
  eyebrow: string; title: string; desc: string; img: string; dark?: boolean;
}) {
  return (
    <a href="#" className="relative group overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[16/10]">
      <img src={img} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className={`absolute inset-0 ${dark ? "bg-gradient-to-br from-forest-deep/85 via-forest/60 to-transparent" : "bg-gradient-to-tr from-cream/95 via-cream/60 to-transparent"}`} />
      <div className={`absolute inset-0 p-8 md:p-10 flex flex-col justify-end ${dark ? "text-cream" : "text-forest"}`}>
        <div className={`text-[11px] uppercase tracking-[0.2em] mb-3 ${dark ? "text-gold" : "text-forest/70"}`}>{eyebrow}</div>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight max-w-md text-balance">{title}</h3>
        <p className={`mt-3 max-w-sm text-sm ${dark ? "text-cream/80" : "text-forest/70"}`}>{desc}</p>
        <div className="mt-5 inline-flex items-center gap-2 font-medium">
          Shop now <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
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
    { tag: "Nutrition", title: "How to read a supplement label like a pro", img: catVit, read: "5 min read" },
    { tag: "Recipes", title: "Sugar-free desserts for everyday wellbeing", img: catSf, read: "8 min read" },
    { tag: "Wellness", title: "Building your morning ritual with adaptogens", img: catDr, read: "6 min read" },
  ];
  return (
    <section className="container mx-auto px-6 py-20 md:py-28">
      <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-forest text-[11px] uppercase tracking-widest mb-4">
            <BookOpen className="size-3.5" /> {t.sections.journal}
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-forest text-balance max-w-xl">{t.sections.journalSub}</h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all">
          All articles <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <a key={p.title} href="#" className="group">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-5">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {p.tag === "Wellness" && (
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
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
      <div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest leading-[1.05] text-balance">{title}</h2>
        <p className="mt-3 text-muted-foreground max-w-md">{sub}</p>
      </div>
      <a href="#" className="inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all whitespace-nowrap">
        View all <ArrowRight className="size-4" />
      </a>
    </div>
  );
}
