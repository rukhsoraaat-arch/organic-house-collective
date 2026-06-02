export type Lang = "en" | "ru" | "uz";

interface DictShape {
  tagline: string;
  searchPlaceholder: string;
  nav: Record<string, string>;
  hero: { eyebrow: string; title: string; sub: string; ctaPrimary: string; ctaSecondary: string };
  sections: Record<string, string>;
  product: Record<string, string>;
  footer: Record<string, string>;
  assistant: string;
  header: {
    freeDelivery: string;
    storeLocator: string;
    delivery: string;
    help: string;
    account: string;
    wishlist: string;
    cart: string;
  };
  valueStrip: {
    organicTitle: string;
    organicSub: string;
    deliveryTitle: string;
    deliverySub: string;
    authTitle: string;
    authSub: string;
    loyaltyTitle: string;
    loyaltySub: string;
  };
  promo: {
    seasonalEyebrow: string;
    seasonalTitle: string;
    seasonalDesc: string;
    sugarFreeEyebrow: string;
    sugarFreeTitle: string;
    sugarFreeDesc: string;
    shopNow: string;
  };
  journal: {
    post1Tag: string;
    post1Title: string;
    post1Read: string;
    post2Tag: string;
    post2Title: string;
    post2Read: string;
    post3Tag: string;
    post3Title: string;
    post3Read: string;
    allArticles: string;
  };
  universe: {
    kids: string;
    women: string;
    men: string;
    pregnancy: string;
    immunity: string;
    beauty: string;
    hair: string;
    weight: string;
    sports: string;
    sleep: string;
    brain: string;
    stress: string;
    energy: string;
    omega: string;
    magnesium: string;
    zinc: string;
    collagen: string;
    vitD: string;
    vitC: string;
    probiotics: string;
    multivitamins: string;
    superfoods: string;
    viewAll: string;
    explore: string;
  };
}

export const dict: Record<Lang, DictShape> = {
  en: {
    tagline: "Premium Wellness Marketplace",
    searchPlaceholder: "Search vitamins, supplements, organic foods…",
    nav: {
      vitamins: "Vitamins & Supplements",
      sugarFree: "Sugar-Free",
      glutenFree: "Gluten-Free",
      snacks: "Snacks",
      beauty: "Beauty",
      tea: "Tea & Coffee",
      baby: "Baby & Kids",
      desserts: "Desserts",
      bread: "Bread",
      drinks: "Drinks & Beverages",
    },
    hero: {
      eyebrow: "Pure · Organic · Trusted",
      title: "Nourish the body.\nElevate the everyday.",
      sub: "A curated marketplace of vitamins, supplements and organic essentials — sourced from the world's most trusted wellness brands.",
      ctaPrimary: "Shop the collection",
      ctaSecondary: "Explore vitamins",
    },
    sections: {
      categories: "Shop by category",
      categoriesSub: "Curated worlds for a healthier you",
      bestsellers: "Best sellers",
      bestsellersSub: "Loved by our wellness community",
      vitaminUniverse: "The vitamin universe",
      vitaminUniverseSub: "Find the right support for every life stage and goal",
      collections: "Organic collections",
      brands: "Trusted brands",
      journal: "The Journal",
      journalSub: "Nutrition guides, recipes & wellness wisdom",
      newsletter: "Join the Organic House circle",
      newsletterSub: "Receive 10% off your first order plus weekly wellness inspiration.",
      subscribe: "Subscribe",
    },
    product: {
      addToCart: "Add to cart",
      quickView: "Quick view",
      new: "New",
      sale: "Sale",
    },
    footer: {
      about: "About",
      contact: "Contact",
      stores: "Stores",
      delivery: "Delivery",
      returns: "Returns",
      privacy: "Privacy",
      blog: "Journal",
      rights: "All rights reserved.",
    },
    assistant: "Ask Organic AI",
    header: {
      freeDelivery: "Free delivery in Tashkent on orders over 300 000 UZS",
      storeLocator: "Store locator",
      delivery: "Delivery",
      help: "Help",
      account: "Account",
      wishlist: "Wishlist",
      cart: "Cart",
    },
    valueStrip: {
      organicTitle: "100% Organic",
      organicSub: "Certified clean sourcing",
      deliveryTitle: "Fast delivery",
      deliverySub: "Same-day in Tashkent",
      authTitle: "Authentic",
      authSub: "Direct from brands",
      loyaltyTitle: "Loyalty points",
      loyaltySub: "Earn with every order",
    },
    promo: {
      seasonalEyebrow: "Seasonal — Winter immunity",
      seasonalTitle: "Strengthen the season.",
      seasonalDesc: "Build your defence with vitamin C, zinc and elderberry rituals.",
      sugarFreeEyebrow: "Sugar-free desserts",
      sugarFreeTitle: "Sweet, without the sugar.",
      sugarFreeDesc: "Indulgent treats made for everyday wellbeing.",
      shopNow: "Shop now",
    },
    journal: {
      post1Tag: "Nutrition",
      post1Title: "How to read a supplement label like a pro",
      post1Read: "5 min read",
      post2Tag: "Recipes",
      post2Title: "Sugar-free desserts for everyday wellbeing",
      post2Read: "8 min read",
      post3Tag: "Wellness",
      post3Title: "Building your morning ritual with adaptogens",
      post3Read: "6 min read",
      allArticles: "All articles",
    },
    universe: {
      kids: "Vitamins for Kids",
      women: "Vitamins for Women",
      men: "Vitamins for Men",
      pregnancy: "Vitamins for Pregnancy",
      immunity: "Immunity Support",
      beauty: "Beauty & Skin",
      hair: "Hair & Nails",
      weight: "Weight Loss",
      sports: "Sports & Performance",
      sleep: "Sleep & Calm",
      brain: "Brain & Focus",
      stress: "Stress Relief",
      energy: "Energy & Vitality",
      omega: "Omega 3",
      magnesium: "Magnesium",
      zinc: "Zinc",
      collagen: "Collagen",
      vitD: "Vitamin D",
      vitC: "Vitamin C",
      probiotics: "Probiotics",
      multivitamins: "Multivitamins",
      superfoods: "Superfoods Mix",
      viewAll: "View all",
      explore: "Explore",
    },
  },
  ru: {
    tagline: "Премиум маркетплейс здоровья",
    searchPlaceholder: "Поиск витаминов, БАДов, органических продуктов…",
    nav: {
      vitamins: "Витамины и БАДы",
      sugarFree: "Без сахара",
      glutenFree: "Без глютена",
      snacks: "Перекусы",
      beauty: "Красота",
      tea: "Чай и кофе",
      baby: "Детям",
      desserts: "Десерты",
      bread: "Хлеб",
      drinks: "Напитки",
    },
    hero: {
      eyebrow: "Чисто · Органично · Проверено",
      title: "Питай тело.\nЦени каждый день.",
      sub: "Маркетплейс витаминов, БАДов и органических продуктов от самых надёжных wellness-брендов мира.",
      ctaPrimary: "Перейти в каталог",
      ctaSecondary: "Все витамины",
    },
    sections: {
      categories: "Категории",
      categoriesSub: "Двадцать миров для здоровой жизни",
      bestsellers: "Хиты продаж",
      bestsellersSub: "Любимое нашим wellness-сообществом",
      vitaminUniverse: "Вселенная витаминов",
      vitaminUniverseSub: "Поддержка для каждой цели и возраста",
      collections: "Органические коллекции",
      brands: "Любимые бренды",
      journal: "Журнал",
      journalSub: "Гиды по питанию, рецепты и wellness-знания",
      newsletter: "Присоединяйтесь к Organic House",
      newsletterSub: "Скидка 10% на первый заказ и еженедельная подборка о здоровье.",
      subscribe: "Подписаться",
    },
    product: {
      addToCart: "В корзину",
      quickView: "Быстрый просмотр",
      new: "Новинка",
      sale: "Скидка",
    },
    footer: {
      about: "О нас",
      contact: "Контакты",
      stores: "Магазины",
      delivery: "Доставка",
      returns: "Возврат",
      privacy: "Конфиденциальность",
      blog: "Журнал",
      rights: "Все права защищены.",
    },
    assistant: "Спросить Organic AI",
    header: {
      freeDelivery: "Бесплатная доставка по Ташкенту при заказе от 300 000 UZS",
      storeLocator: "Наши магазины",
      delivery: "Доставка",
      help: "Помощь",
      account: "Личный кабинет",
      wishlist: "Избранное",
      cart: "Корзина",
    },
    valueStrip: {
      organicTitle: "100% Органично",
      organicSub: "Сертифицированные источники",
      deliveryTitle: "Быстрая доставка",
      deliverySub: "День в день по Ташкенту",
      authTitle: "Оригинальность",
      authSub: "Напрямую от брендов",
      loyaltyTitle: "Бонусные баллы",
      loyaltySub: "Накапливайте с каждым заказом",
    },
    promo: {
      seasonalEyebrow: "Сезонное — Зимний иммунитет",
      seasonalTitle: "Укрепите организм.",
      seasonalDesc: "Повысьте защиту с ритуалами витамина C, цинка и бузины.",
      sugarFreeEyebrow: "Десерты без сахара",
      sugarFreeTitle: "Сладко, но без сахара.",
      sugarFreeDesc: "Нежные лакомства для вашего хорошего самочувствия.",
      shopNow: "Купить сейчас",
    },
    journal: {
      post1Tag: "Питание",
      post1Title: "Как читать этикетку добавок как профессионал",
      post1Read: "5 мин чтения",
      post2Tag: "Рецепты",
      post2Title: "Десерты без сахара для повседневного здоровья",
      post2Read: "8 мин чтения",
      post3Tag: "Здоровье",
      post3Title: "Утренний ритуал с использованием адаптогенов",
      post3Read: "6 мин чтения",
      allArticles: "Все статьи",
    },
    universe: {
      kids: "Витамины для детей",
      women: "Витамины для женщин",
      men: "Витамины для мужчин",
      pregnancy: "Витамины при беременности",
      immunity: "Поддержка иммунитета",
      beauty: "Красота и кожа",
      hair: "Волосы и ногти",
      weight: "Снижение веса",
      sports: "Спорт и выносливость",
      sleep: "Сон и спокойствие",
      brain: "Мозг и концентрация",
      stress: "Снятие стресса",
      energy: "Энергия и тонус",
      omega: "Омега 3",
      magnesium: "Магний",
      zinc: "Цинк",
      collagen: "Коллаген",
      vitD: "Витамин D",
      vitC: "Витамин C",
      probiotics: "Пробиотики",
      multivitamins: "Мультивитамины",
      superfoods: "Смесь суперфудов",
      viewAll: "Показать все",
      explore: "Открыть",
    },
  },
  uz: {
    tagline: "Premium Sog'liq Marketpleysi",
    searchPlaceholder: "Vitamin, BAD, organik mahsulotlarni qidirish…",
    nav: {
      vitamins: "Vitamin va BAD",
      sugarFree: "Shakarsiz",
      glutenFree: "Glutensiz",
      snacks: "Yengil taomlar",
      beauty: "Go'zallik",
      tea: "Choy va kofe",
      baby: "Bolalar uchun",
      desserts: "Desertlar",
      bread: "Non va bulochka",
      drinks: "Ichimliklar",
    },
    hero: {
      eyebrow: "Toza · Organik · Ishonchli",
      title: "Tanani oziqlantiring.\nHar kunni nafis qiling.",
      sub: "Vitamin, BAD va organik mahsulotlarning premium marketpleysi — dunyoning eng ishonchli wellness brendlaridan.",
      ctaPrimary: "Katalogga o'tish",
      ctaSecondary: "Vitaminlar",
    },
    sections: {
      categories: "Toifalar",
      categoriesSub: "Sog'lom hayot uchun o'nta dunyo",
      bestsellers: "Eng sotilganlar",
      bestsellersSub: "Jamoamiz tanlovi",
      vitaminUniverse: "Vitaminlar olami",
      vitaminUniverseSub: "Har bir maqsad va yosh uchun qo'llab-quvvatlash",
      collections: "Organik kolleksiyalar",
      brands: "Ishonchli brendlar",
      journal: "Jurnal",
      journalSub: "Ovqatlanish, retseptlar va wellness maslahatlari",
      newsletter: "Organic House jamoasiga qo'shiling",
      newsletterSub: "Birinchi buyurtmaga 10% chegirma va haftalik sog'liq maslahatlari.",
      subscribe: "Obuna bo'lish",
    },
    product: {
      addToCart: "Savatga",
      quickView: "Tez ko'rish",
      new: "Yangi",
      sale: "Chegirma",
    },
    footer: {
      about: "Biz haqimizda",
      contact: "Aloqa",
      stores: "Do'konlar",
      delivery: "Yetkazib berish",
      returns: "Qaytarish",
      privacy: "Maxfiylik",
      blog: "Jurnal",
      rights: "Barcha huquqlar himoyalangan.",
    },
    assistant: "Organic AI bilan so'rang",
    header: {
      freeDelivery: "Toshkent bo'ylab 300 000 UZS dan yuqori buyurtmalar bepul yetkaziladi",
      storeLocator: "Do'konlarimiz",
      delivery: "Yetkazib berish",
      help: "Yordam",
      account: "Kabinet",
      wishlist: "Saralanganlar",
      cart: "Savat",
    },
    valueStrip: {
      organicTitle: "100% Organik",
      organicSub: "Kafolatlangan tozalik",
      deliveryTitle: "Tez yetkazib berish",
      deliverySub: "Toshkentda o'sha kunning o'zida",
      authTitle: "Haqiqiylik",
      authSub: "To'g'ridan-to'g'ri brenddan",
      loyaltyTitle: "Keshbek ballari",
      loyaltySub: "Har bir buyurtmadan yig'ing",
    },
    promo: {
      seasonalEyebrow: "Mavsumiy — Qishki immunitet",
      seasonalTitle: "Mavsumni kuchaytiring.",
      seasonalDesc: "Vitamin C, rux va marjon meva bilan himoyani oshiring.",
      sugarFreeEyebrow: "Shakarsiz desertlar",
      sugarFreeTitle: "Shirin, ammo shakarsiz.",
      sugarFreeDesc: "Sog'ligingiz uchun ajoyib taomlar.",
      shopNow: "Hozir xarid qilish",
    },
    journal: {
      post1Tag: "Nutritsiologiya",
      post1Title: "Qo'shimcha yorlig'ini qanday to'g'ri o'qish kerak",
      post1Read: "5 daqiqa o'qish",
      post2Tag: "Retseptlar",
      post2Title: "Kundalik sog'liq uchun shakarsiz desertlar",
      post2Read: "8 daqiqa o'qish",
      post3Tag: "Wellness",
      post3Title: "Adaptogenlar bilan ertalabki marosimni shakllantirish",
      post3Read: "6 daqiqa o'qish",
      allArticles: "Barcha maqolalar",
    },
    universe: {
      kids: "Bolalar uchun vitaminlar",
      women: "Ayollar uchun vitaminlar",
      men: "Erkaklar uchun vitaminlar",
      pregnancy: "Homiladorlikda vitaminlar",
      immunity: "Immunitetni oshirish",
      beauty: "Go'zallik va teri",
      hair: "Soch va tirnoqlar",
      weight: "Ozish uchun",
      sports: "Sport va kuch-quvvat",
      sleep: "Uyqu va tinchlanish",
      brain: "Miya va diqqat",
      stress: "Stressni kamaytirish",
      energy: "Energiya va tonus",
      omega: "Omega 3",
      magnesium: "Magniy",
      zinc: "Rux",
      collagen: "Kollagen",
      vitD: "Vitamin D",
      vitC: "Vitamin C",
      probiotics: "Probiotiklar",
      multivitamins: "Multivitaminlar",
      superfoods: "Superfud aralashmasi",
      viewAll: "Barchasini ko'rish",
      explore: "Ko'rish",
    },
  },
};

export type Dict = DictShape;
