import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
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
  const { t } = useLang();
  const { addToCart } = useCart();
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
          <button aria-label="Wishlist" className="size-9 grid place-items-center rounded-full bg-card/95 backdrop-blur text-forest hover:bg-forest hover:text-cream transition shadow-soft">
            <Heart className="size-4" />
          </button>
          <button aria-label="Quick view" className="size-9 grid place-items-center rounded-full bg-card/95 backdrop-blur text-forest hover:bg-forest hover:text-cream transition shadow-soft">
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
    </div>
  );
}
