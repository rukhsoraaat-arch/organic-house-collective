import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useLang } from "@/lib/lang-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingBag, Trash2, Plus, Minus, MapPin, CreditCard, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

const cartDict = {
  en: {
    title: "Shopping Cart",
    empty: "Your cart is empty",
    shopNow: "Shop now",
    subtotal: "Subtotal",
    delivery: "Delivery",
    free: "Free",
    checkout: "Proceed to Checkout",
    name: "Your Name",
    phone: "Phone Number",
    address: "Delivery Address",
    location: "Location",
    locationDesc: "Share your location for faster delivery",
    shareLocation: "Share Current Location 📍",
    locationCaptured: "Location captured! 📍",
    paymentMethod: "Payment Method",
    click: "Click Payment",
    payme: "Payme Payment",
    cash: "Cash on Delivery",
    placeOrder: "Confirm & Place Order",
    paying: "Processing Payment...",
    payNow: "Pay Now",
    backToCart: "Back to Cart",
    successTitle: "Order Confirmed!",
    successDesc: "Thank you for your order! Your order #{{id}} has been received.",
    tgRedirect: "Track order in Telegram Bot",
    enterCard: "Enter Card Details",
    cardNumber: "Card Number",
    expiry: "MM/YY",
    cvc: "CVC",
    verifyOtp: "Verify OTP",
    otpSent: "SMS code sent to {{phone}}",
    verify: "Verify & Pay",
  },
  ru: {
    title: "Корзина",
    empty: "Ваша корзина пуста",
    shopNow: "Перейти к покупкам",
    subtotal: "Сумма товаров",
    delivery: "Доставка",
    free: "Бесплатно",
    checkout: "Оформить заказ",
    name: "Ваше имя",
    phone: "Номер телефона",
    address: "Адрес доставки",
    location: "Геолокация",
    locationDesc: "Поделитесь локацией для быстрой доставки",
    shareLocation: "Поделиться геолокацией 📍",
    locationCaptured: "Геолокация определена! 📍",
    paymentMethod: "Способ оплаты",
    click: "Оплата через Click",
    payme: "Оплата через Payme",
    cash: "Наличными при получении",
    placeOrder: "Подтвердить заказ",
    paying: "Обработка платежа...",
    payNow: "Оплатить сейчас",
    backToCart: "Назад в корзину",
    successTitle: "Заказ оформлен!",
    successDesc: "Спасибо за ваш заказ! Номер заказа: #{{id}}.",
    tgRedirect: "Отслеживать в Telegram-боте",
    enterCard: "Введите данные карты",
    cardNumber: "Номер карты",
    expiry: "ММ/ГГ",
    cvc: "CVC",
    verifyOtp: "Подтверждение SMS",
    otpSent: "Код отправлен на номер {{phone}}",
    verify: "Подтвердить и оплатить",
  },
  uz: {
    title: "Savat",
    empty: "Savatingiz bo'sh",
    shopNow: "Haridlarni boshlash",
    subtotal: "Mahsulotlar summasi",
    delivery: "Yetkazib berish",
    free: "Bepul",
    checkout: "Buyurtma berish",
    name: "Ismingiz",
    phone: "Telefon raqamingiz",
    address: "Yetkazib berish manzili",
    location: "Geolokatsiya",
    locationDesc: "Tez yetkazish uchun manzilni ulashing",
    shareLocation: "Geolokatsiyani yuborish 📍",
    locationCaptured: "Geolokatsiya aniqlandi! 📍",
    paymentMethod: "To'lov turi",
    click: "Click orqali to'lov",
    payme: "Payme orqali to'lov",
    cash: "Qabul qilganda naqd to'lash",
    placeOrder: "Buyurtmani tasdiqlash",
    paying: "To'lov amalga oshirilmoqda...",
    payNow: "Hozir to'lash",
    backToCart: "Savatga qaytish",
    successTitle: "Buyurtma tasdiqlandi!",
    successDesc: "Buyurtmangiz uchun rahmat! Buyurtma raqami: #{{id}}.",
    tgRedirect: "Telegram botda kuzatib borish",
    enterCard: "Karta ma'lumotlarini kiriting",
    cardNumber: "Karta raqami",
    expiry: "OO/YY",
    cvc: "CVC",
    verifyOtp: "SMS kodini tasdiqlash",
    otpSent: "SMS kod {{phone}} raqamiga yuborildi",
    verify: "Tasdiqlash va to'lash",
  }
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " UZS";
}

export function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { lang } = useLang();
  
  const [step, setStep] = useState<"cart" | "checkout" | "payment_sim" | "otp_sim" | "success">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"click" | "payme" | "cash">("click");
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For Payment Simulation
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [otp, setOtp] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const t = cartDict[lang as keyof typeof cartDict] || cartDict.en;

  const handlePhoneChange = (val: string) => {
    if (!val.startsWith("+998")) {
      setPhone("+998" + val.replace(/\D/g, ""));
    } else {
      setPhone("+" + val.replace(/[^\d+]/g, ""));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error(lang === "ru" ? "Геолокация не поддерживается вашим браузером" : "Geolokatsiya brauzeringiz tomonidan qo'llab-quvvatlanmaydi");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationLoading(false);
        toast.success(t.locationCaptured);
      },
      (err) => {
        console.error(err);
        setLocationLoading(false);
        toast.error(lang === "ru" ? "Не удалось получить локацию. Пожалуйста, разрешите доступ." : "Lokatsiyani aniqlash imkoni bo'lmadi. Iltimos, ruxsat bering.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const sendOrderToTelegram = async (currentOrderId: string, status: string = "Pending Payment") => {
    // Load integration settings
    let settings: any = {};
    try {
      const raw = localStorage.getItem("ohc_settings");
      if (raw) settings = JSON.parse(raw);
    } catch {}

    const token = settings.tgToken || "7249156327:AAH0dM0X16d_cT6C2U_w-M1h4YlZ3dJc09E";
    const chatId = settings.tgChatId || "-1002244837894";

    const itemsText = cartItems
      .map(
        (item) =>
          `• ${item.product.name} (${item.quantity} x ${formatPrice(item.product.price)}) = ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join("\n");

    const mapsLink = location ? `https://maps.google.com/?q=${location.lat},${location.lng}` : "Not shared";

    const message = `🛍️ *НОВЫЙ ЗАКАЗ #${currentOrderId}*
👤 *Клиент:* ${name}
📞 *Телефон:* ${phone}
📍 *Адрес:* ${address}
🗺️ *Геолокация:* ${location ? `[Открыть на карте](${mapsLink})` : "Не указана"}
💵 *Способ оплаты:* ${paymentMethod.toUpperCase()}
📉 *Статус:* ${status}

📦 *Товары:*
${itemsText}

💰 *Итого к оплате:* *${formatPrice(totalPrice)}*`;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
          disable_web_page_preview: false,
        }),
      });
    } catch (e) {
      console.error("Failed to send Telegram message", e);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(lang === "ru" ? "Введите имя" : "Ismingizni kiriting");
      return;
    }
    if (phone.length < 12) {
      toast.error(lang === "ru" ? "Введите полный номер телефона" : "To'liq telefon raqamini kiriting");
      return;
    }
    if (!address.trim()) {
      toast.error(lang === "ru" ? "Введите адрес" : "Manzilni kiriting");
      return;
    }

    setIsSubmitting(true);
    const generatedId = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderId(generatedId);

    // If Cash, complete immediately
    if (paymentMethod === "cash") {
      await sendOrderToTelegram(generatedId, "Cash / Awaiting Delivery");
      setIsSubmitting(false);
      setStep("success");
      clearCart();
    } else {
      // Check if real merchant credentials exist for redirection
      let settings: any = {};
      try {
        const raw = localStorage.getItem("ohc_settings");
        if (raw) settings = JSON.parse(raw);
      } catch {}

      if (paymentMethod === "click" && settings.clickServiceId && settings.clickMerchantId) {
        // Real Click redirect
        await sendOrderToTelegram(generatedId, "Awaiting Click Payment (Redirected)");
        const clickUrl = `https://my.click.uz/services/pay?service_id=${settings.clickServiceId}&merchant_id=${settings.clickMerchantId}&amount=${totalPrice}&transaction_param=${generatedId}&return_url=${window.location.origin}`;
        window.location.href = clickUrl;
      } else if (paymentMethod === "payme" && settings.paymeMerchantId) {
        // Real Payme redirect
        await sendOrderToTelegram(generatedId, "Awaiting Payme Payment (Redirected)");
        const paymeParams = `m=${settings.paymeMerchantId};ac.order_id=${generatedId};a=${totalPrice * 100}`;
        const paymeUrl = `https://checkout.paycom.uz/${btoa(paymeParams)}`;
        window.location.href = paymeUrl;
      } else {
        // No credentials configured - show simulation
        await sendOrderToTelegram(generatedId, "Pending Payment (Simulated Checkout)");
        setIsSubmitting(false);
        setStep("payment_sim");
      }
    }
  };

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, "").length < 16) {
      toast.error(lang === "ru" ? "Неверный номер карты" : "Karta raqami noto'g'ri");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setStep("otp_sim");
    }, 1500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error(lang === "ru" ? "Введите код из SMS" : "SMS kodini kiriting");
      return;
    }
    setIsPaying(true);
    setTimeout(async () => {
      setIsPaying(false);
      await sendOrderToTelegram(orderId, `Paid via ${paymentMethod.toUpperCase()} (Simulated)`);
      toast.success(lang === "ru" ? "Оплата успешно проведена!" : "To'lov muvaffaqiyatli amalga oshirildi!");
      setStep("success");
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset steps after drawer completely closes
    setTimeout(() => {
      setStep("cart");
      setName("");
      setPhone("+998");
      setAddress("");
      setLocation(null);
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setOtp("");
    }, 300);
  };

  const tgBotRedirectUrl = () => {
    let settings: any = {};
    try {
      const raw = localStorage.getItem("ohc_settings");
      if (raw) settings = JSON.parse(raw);
    } catch {}
    const username = settings.tgBotUsername || "OrganicHouseOrderBot";
    return `https://t.me/${username}?start=order_${orderId}`;
  };

  const deliveryFee = totalPrice >= 300000 ? 0 : 20000;

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-background border-l border-border flex flex-col p-0 h-full overflow-hidden z-50">
        
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-2xl text-forest flex items-center gap-2">
              <ShoppingBag className="size-5" />
              {step === "checkout" ? t.checkout : step === "payment_sim" || step === "otp_sim" ? t.enterCard : step === "success" ? t.successTitle : t.title}
            </SheetTitle>
          </SheetHeader>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-secondary transition text-muted-foreground">
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          
          {/* STEP 1: CART VIEW */}
          {step === "cart" && (
            <>
              {cartItems.length === 0 ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-secondary grid place-items-center text-muted-foreground/60 mb-4 animate-pulse">
                    <ShoppingBag className="size-8" />
                  </div>
                  <p className="text-forest font-medium text-lg mb-2">{t.empty}</p>
                  <button onClick={handleClose} className="h-10 px-5 rounded-full bg-forest text-cream hover:bg-forest-deep transition text-sm font-medium">
                    {t.shopNow}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-secondary/40 rounded-2xl border border-border/30 hover:border-forest/20 transition duration-300">
                      <div className="size-16 rounded-xl overflow-hidden shrink-0 bg-secondary">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase text-muted-foreground tracking-wider mb-0.5">{item.product.category}</div>
                        <h4 className="font-semibold text-sm text-forest truncate">{item.product.name}</h4>
                        <div className="font-medium text-sm text-forest-deep mt-1">{formatPrice(item.product.price)}</div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border/60 rounded-full bg-card px-1 h-7">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="size-5 rounded-full hover:bg-secondary grid place-items-center transition text-muted-foreground hover:text-forest"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-forest">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="size-5 rounded-full hover:bg-secondary grid place-items-center transition text-muted-foreground hover:text-forest"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT VIEW */}
          {step === "checkout" && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-forest uppercase tracking-wider">{t.name}</label>
                <input
                  type="text"
                  required
                  placeholder={lang === "ru" ? "Иван Иванов" : "Ali Valiyev"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-border/80 focus:border-forest focus:outline-none bg-card transition text-sm text-forest"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-forest uppercase tracking-wider">{t.phone}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-border/80 focus:border-forest focus:outline-none bg-card transition text-sm text-forest"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-forest uppercase tracking-wider">{t.address}</label>
                <textarea
                  required
                  placeholder={lang === "ru" ? "Улица Навои, дом 10, кв. 42" : "Navoiy ko'chasi, 10-uy, 42-xonadon"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-20 px-4 py-2.5 rounded-xl border border-border/80 focus:border-forest focus:outline-none bg-card transition text-sm text-forest resize-none"
                />
              </div>

              {/* Geolocation */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-semibold text-forest uppercase tracking-wider">{t.location}</label>
                  {location && (
                    <span className="text-[11px] text-emerald-600 font-semibold">{t.locationCaptured}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="w-full h-11 border border-dashed border-forest/30 text-forest font-semibold rounded-xl bg-forest/5 hover:bg-forest/10 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                >
                  <MapPin className="size-4 animate-bounce text-gold" />
                  {locationLoading
                    ? (lang === "ru" ? "Определение..." : "Aniqlanmoqda...")
                    : location
                      ? (lang === "ru" ? "Обновить локацию 📍" : "Lokatsiyani yangilash 📍")
                      : t.shareLocation}
                </button>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-forest uppercase tracking-wider block mb-1">{t.paymentMethod}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("click")}
                    className={`h-12 rounded-xl font-bold flex flex-col items-center justify-center transition border ${
                      paymentMethod === "click"
                        ? "border-blue-500 bg-blue-50/50 text-blue-600"
                        : "border-border hover:bg-secondary/40 text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-display uppercase tracking-wider">Click</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("payme")}
                    className={`h-12 rounded-xl font-bold flex flex-col items-center justify-center transition border ${
                      paymentMethod === "payme"
                        ? "border-teal-500 bg-teal-50/50 text-teal-600"
                        : "border-border hover:bg-secondary/40 text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-display uppercase tracking-wider">Payme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`h-12 rounded-xl font-semibold flex flex-col items-center justify-center transition border text-[11px] leading-tight text-center ${
                      paymentMethod === "cash"
                        ? "border-forest bg-forest/5 text-forest"
                        : "border-border hover:bg-secondary/40 text-muted-foreground"
                    }`}
                  >
                    <span>{lang === "ru" ? "Наличные" : "Naqd pul"}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT GATEWAY SIMULATION */}
          {step === "payment_sim" && (
            <form onSubmit={handleSimulatedPayment} className="space-y-6 pt-4">
              <div className={`p-5 rounded-2xl text-white shadow-lift relative overflow-hidden ${
                paymentMethod === "click" ? "bg-gradient-to-br from-[#1e385b] via-[#00a8ea] to-[#1e385b]" : "bg-gradient-to-br from-teal-700 via-teal-500 to-emerald-600"
              }`}>
                <div className="absolute top-4 right-4 text-xs font-bold tracking-widest uppercase opacity-85">
                  {paymentMethod.toUpperCase()}
                </div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">Сумма к оплате</div>
                <div className="text-2xl font-bold font-display mt-0.5">{formatPrice(totalPrice)}</div>
                
                {/* Chip */}
                <div className="w-10 h-7 rounded bg-amber-400/80 my-5" />

                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest opacity-60">{t.cardNumber}</label>
                    <input
                      type="text"
                      required
                      placeholder="8600 0000 0000 0000"
                      maxLength={19}
                      value={cardNumber.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white/10 border-b border-white/20 focus:border-white focus:outline-none py-1 text-sm font-semibold placeholder:text-white/40 tracking-wider"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest opacity-60">{t.expiry}</label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry.replace(/\s?/g, "").replace(/(\d{2})\/?/g, "$1/").replace(/\/$/, "")}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white/10 border-b border-white/20 focus:border-white focus:outline-none py-1 text-sm font-semibold placeholder:text-white/40 tracking-wider text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest opacity-60">CVC</label>
                      <input
                        type="password"
                        required
                        placeholder="***"
                        maxLength={3}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-white/10 border-b border-white/20 focus:border-white focus:outline-none py-1 text-sm font-semibold placeholder:text-white/40 tracking-wider text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/40 p-3.5 rounded-xl border border-border/50">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <span>Защищено 3D-Secure шифрованием. Все данные карты полностью конфиденциальны.</span>
              </div>
              <button
                type="submit"
                disabled={isPaying}
                className="w-full h-12 bg-forest text-cream font-semibold rounded-full hover:bg-forest-deep transition flex items-center justify-center gap-2 cursor-pointer shadow-soft disabled:opacity-50"
              >
                {isPaying ? (
                  <>
                    <span className="size-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                    {t.paying}
                  </>
                ) : (
                  <>
                    <CreditCard className="size-4 text-gold" />
                    {t.payNow}
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: SMS OTP GATE */}
          {step === "otp_sim" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 pt-4 text-center max-w-xs mx-auto">
              <div className="size-14 rounded-full bg-secondary grid place-items-center text-forest mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="size-7 text-gold" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-lg text-forest">{t.verifyOtp}</h4>
                <p className="text-xs text-muted-foreground">{t.otpSent.replace("{{phone}}", phone)}</p>
              </div>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-28 h-12 text-center text-xl font-bold tracking-widest rounded-xl border border-border focus:border-forest focus:outline-none bg-card text-forest"
              />
              <button
                type="submit"
                disabled={isPaying}
                className="w-full h-12 bg-forest text-cream font-semibold rounded-full hover:bg-forest-deep transition flex items-center justify-center gap-2 cursor-pointer shadow-soft disabled:opacity-50 text-sm"
              >
                {isPaying ? (
                  <>
                    <span className="size-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                    {t.paying}
                  </>
                ) : (
                  t.verify
                )}
              </button>
            </form>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {step === "success" && (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="size-20 rounded-full bg-emerald-100 dark:bg-emerald-950 grid place-items-center text-emerald-600 mb-6 animate-pulse">
                <CheckCircle2 className="size-10 text-emerald-600" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-forest mb-3 leading-tight">{t.successTitle}</h3>
              <p className="text-sm text-muted-foreground mb-8">
                {t.successDesc.replace("{{id}}", orderId)}
              </p>
              
              <a
                href={tgBotRedirectUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 rounded-full bg-forest text-cream hover:bg-forest-deep transition text-sm font-semibold flex items-center justify-center gap-2 shadow-soft hover:gap-3"
              >
                {t.tgRedirect}
                <ArrowRight className="size-4 text-gold" />
              </a>
            </div>
          )}

        </div>

        {/* Drawer Footer (Subtotals & Checkout buttons) */}
        {step === "cart" && cartItems.length > 0 && (
          <div className="p-6 border-t border-border bg-secondary/20">
            <div className="space-y-2 mb-4 text-sm text-forest">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.subtotal}</span>
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.delivery}</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-semibold">{t.free}</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="border-t border-border/60 my-2 pt-2 flex justify-between text-base font-bold">
                <span>Итого</span>
                <span className="text-forest-deep">{formatPrice(totalPrice + deliveryFee)}</span>
              </div>
            </div>
            
            <button
              onClick={() => setStep("checkout")}
              className="w-full h-12 bg-forest text-cream font-semibold rounded-full hover:bg-forest-deep transition flex items-center justify-center gap-2 cursor-pointer shadow-soft group"
            >
              {t.checkout}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition text-gold" />
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div className="p-6 border-t border-border bg-secondary/20 flex gap-3">
            <button
              onClick={() => setStep("cart")}
              className="flex-1 h-12 border border-forest/20 text-forest font-semibold rounded-full hover:bg-secondary transition text-sm"
            >
              {t.backToCart}
            </button>
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="flex-2 h-12 bg-forest text-cream font-semibold rounded-full hover:bg-forest-deep transition flex items-center justify-center gap-2 cursor-pointer shadow-soft disabled:opacity-50 text-sm"
            >
              {isSubmitting ? (
                <span className="size-4 border-2 border-cream border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t.placeOrder}
                  <ArrowRight className="size-4 text-gold" />
                </>
              )}
            </button>
          </div>
        )}

        {(step === "payment_sim" || step === "otp_sim") && (
          <div className="p-6 border-t border-border bg-secondary/20">
            <button
              onClick={() => setStep("checkout")}
              className="w-full h-12 border border-forest/20 text-forest font-semibold rounded-full hover:bg-secondary transition text-sm"
            >
              {t.backToCart}
            </button>
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
