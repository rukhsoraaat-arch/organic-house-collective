import { useState } from "react";
import { Heart, Eye, ShoppingBag, Star, X } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "new" | "sale" | "bestseller";
}

function fmt(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price) + " UZS";
}

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLang();
  const { addToCart } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);
  const discount = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-3xl overflow-hidden border border-border/60 hover:border-forest/30 transition-all duration-500 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge === "new" && (
            <span className="px-2.5 py-1 rounded-full bg-forest text-cream text-[10px] font-semibold uppercase tracking-wider">
              {t.product.new}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-gold text-forest-deep text-[10px] font-bold">
              −{discount}%
            </span>
          )}
        </div>

        {/* Floating actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast.success(lang === "ru" ? `Добавлено в избранное: ${product.name}` : lang === "uz" ? `Saralanganlarga qo'shildi: ${product.name}` : `Added to wishlist: ${product.name}`);
            }}
            aria-label="Wishlist" 
            className="size-9 grid place-items-center rounded-full bg-card/95 backdrop-blur text-forest hover:bg-forest hover:text-cream transition shadow-soft cursor-pointer"
          >
            <Heart className="size-4" />
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowQuickView(true);
            }}
            aria-label="Quick view" 
            className="size-9 grid place-items-center rounded-full bg-card/95 backdrop-blur text-forest hover:bg-forest hover:text-cream transition shadow-soft cursor-pointer"
          >
            <Eye className="size-4" />
          </button>
        </div>

        {/* Add to cart slide-up */}
        <div className="absolute inset-x-3 bottom-3 translate-y-16 group-hover:translate-y-0 transition-transform duration-500">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              toast.success(t.product.addToCart + ": " + product.name);
            }}
            className="w-full h-11 rounded-full bg-forest text-cream text-sm font-medium flex items-center justify-center gap-2 hover:bg-forest-deep transition cursor-pointer"
          >
            <ShoppingBag className="size-4" />
            {t.product.addToCart}
          </button>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
          {product.category}
        </div>
        <h3 className="font-display text-lg leading-tight text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="size-3.5 fill-gold text-gold" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-forest text-lg">{fmt(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {fmt(product.oldPrice)}
            </span>
          )}
        </div>
      </div>

      {showQuickView && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setShowQuickView(false)}
        >
          <div 
            className="bg-card text-foreground border border-border/40 rounded-3xl w-full max-w-2xl relative shadow-2xl animate-scale-in flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowQuickView(false)}
              className="absolute right-4 top-4 size-9 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground grid place-items-center transition cursor-pointer z-10"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-secondary relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-forest text-cream text-[10px] font-semibold uppercase tracking-wider">
                    {t.product[product.badge] || product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {product.category}
                </div>
                <h2 className="font-display text-2xl text-forest mb-3 leading-tight">{product.name}</h2>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-4">
                  <Star className="size-4 fill-gold text-gold" />
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews} {lang === "ru" ? "отзывов" : lang === "uz" ? "ta sharh" : "reviews"})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-bold text-forest text-2xl">{fmt(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-base text-muted-foreground line-through">
                      {fmt(product.oldPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {lang === "ru" 
                    ? "Премиальный продукт высочайшего качества для поддержания здоровья и жизненного тонуса. 100% органические сертифицированные ингредиенты." 
                    : lang === "uz" 
                    ? "Sog'liq va hayotiy tonusni saqlash uchun yuqori sifatli mahsulot. 100% organik va sertifikatlangan ingredientlar." 
                    : "Premium high-quality product to support overall wellness and vitality. Made with 100% certified organic ingredients."}
                </p>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success(t.product.addToCart + ": " + product.name);
                  setShowQuickView(false);
                }}
                className="w-full h-12 rounded-full bg-forest text-cream font-medium flex items-center justify-center gap-2 hover:bg-forest-deep transition cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                {t.product.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
