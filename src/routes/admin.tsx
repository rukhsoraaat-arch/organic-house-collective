import { createFileRoute } from "@tanstack/react-router";

import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Package, LogOut, TrendingUp, ShoppingCart,
  Users, DollarSign, Edit2, Save, X, Upload, Eye, EyeOff,
  ChevronUp, ChevronDown, Star, BarChart2, Leaf, Search,
  Bell, Image as ImageIcon, ArrowUpRight, Wallet, Settings as SettingsIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart,
} from "recharts";



export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* ─── TYPES ─── */
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  costPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "sale" | "new" | "bestseller" | "";
}


/* ─── DEFAULT DATA ─── */
const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", name: "Premium Omega 3 Fish Oil", category: "Supplements", price: 285000, oldPrice: 340000, costPrice: 168000, rating: 4.9, reviews: 312, image: "/assets/prod-omega3-C_vjyhwb.jpg", badge: "sale" },
  { id: "2", name: "Marine Collagen + Vitamin C", category: "Beauty", price: 420000, costPrice: 210000, rating: 4.8, reviews: 198, image: "/assets/prod-collagen-BqEX6mLl.jpg", badge: "new" },
  { id: "3", name: "Vitamin D₃ 5000 IU", category: "Vitamins", price: 175000, costPrice: 82000, rating: 4.9, reviews: 421, image: "/assets/prod-vitd-k__PCbaP.jpg", badge: "bestseller" },
  { id: "4", name: "Organic Chia Seeds 500g", category: "Superfoods", price: 89000, oldPrice: 110000, costPrice: 45000, rating: 4.7, reviews: 156, image: "/assets/prod-chia-BWTeDBqs.jpg", badge: "" },
  { id: "5", name: "Raw Almond Butter", category: "Organic", price: 145000, costPrice: 90000, rating: 4.8, reviews: 89, image: "/assets/prod-almond-D45IKrfv.jpg", badge: "new" },
  { id: "6", name: "Ceremonial Matcha Powder", category: "Tea & Coffee", price: 320000, costPrice: 175000, rating: 4.9, reviews: 245, image: "/assets/prod-matcha-w7IoWVtJ.jpg", badge: "" },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 12400000, orders: 84 },
  { month: "Feb", revenue: 15800000, orders: 102 },
  { month: "Mar", revenue: 18200000, orders: 128 },
  { month: "Apr", revenue: 16500000, orders: 115 },
  { month: "May", revenue: 22100000, orders: 156 },
  { month: "Jun", revenue: 28400000, orders: 198 },
  { month: "Jul", revenue: 31200000, orders: 221 },
];

const CATEGORY_DATA = [
  { name: "Vitamins", value: 38 },
  { name: "Organic", value: 24 },
  { name: "Supplements", value: 19 },
  { name: "Beauty", value: 12 },
  { name: "Sports", value: 7 },
];

/* ─── GALLERY IMAGES ─── */
const GALLERY_IMAGES = [
  { url: "/assets/prod-omega3-C_vjyhwb.jpg", label: "Omega 3", group: "Products" },
  { url: "/assets/prod-collagen-BqEX6mLl.jpg", label: "Collagen", group: "Products" },
  { url: "/assets/prod-vitd-k__PCbaP.jpg", label: "Vitamin D", group: "Products" },
  { url: "/assets/prod-chia-BWTeDBqs.jpg", label: "Chia Seeds", group: "Products" },
  { url: "/assets/prod-almond-D45IKrfv.jpg", label: "Almond Butter", group: "Products" },
  { url: "/assets/prod-matcha-w7IoWVtJ.jpg", label: "Matcha", group: "Products" },
  { url: "/assets/cat-vitamins-Cg1vuWj5.jpg", label: "Vitamins", group: "Categories" },
  { url: "/assets/cat-organic-6pbbUCGw.jpg", label: "Organic", group: "Categories" },
  { url: "/assets/cat-sugarfree-CXyqBd--.jpg", label: "Sugar Free", group: "Categories" },
  { url: "/assets/cat-glutenfree-BxtoAmgn.jpg", label: "Gluten Free", group: "Categories" },
  { url: "/assets/cat-sports-UVTGH-V-.jpg", label: "Sports", group: "Categories" },
  { url: "/assets/cat-drinks-Df7SCyVJ.jpg", label: "Drinks", group: "Categories" },
  { url: "/assets/hero-1-D-SpCxJN.jpg", label: "Hero Banner", group: "Other" },
];

type GalleryImage = { url: string; label: string; group: string };

/* ─── CUSTOM IMAGE STORAGE ─── */
function loadCustomImages(): GalleryImage[] {
  try { return JSON.parse(localStorage.getItem("ohc_gallery") || "[]"); } catch { return []; }
}
function saveCustomImages(imgs: GalleryImage[]) {
  localStorage.setItem("ohc_gallery", JSON.stringify(imgs));
}

function fmt(n: number) {
  return new Intl.NumberFormat("uz-UZ").format(n);
}

/* ─── STORAGE ─── */
function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem("ohc_products");
    return raw ? JSON.parse(raw) : DEFAULT_PRODUCTS;
  } catch { return DEFAULT_PRODUCTS; }
}
function saveProducts(p: Product[]) {
  localStorage.setItem("ohc_products", JSON.stringify(p));
}

/* ══════════════════════════════════════════════════════
   LOGIN
══════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (pw === "admin123") {
      localStorage.setItem("ohc_admin", "1");
      onLogin();
    } else {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      {/* bg blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#161b22] border border-white/8 rounded-3xl p-10 shadow-2xl">
          {/* logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 grid place-items-center">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-lg leading-none">Organic House</div>
              <div className="text-white/40 text-xs mt-0.5">Панель управления</div>
            </div>
          </div>

          <h1 className="text-white text-2xl font-bold mb-1">С возвращением 👋</h1>
          <p className="text-white/40 text-sm mb-8">Войдите, чтобы управлять магазином</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Пароль</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={e => { setPw(e.target.value); setErr(false); }}
                  className={`w-full h-12 px-4 pr-11 bg-white/5 border ${err ? "border-red-500/60" : "border-white/10"} rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition`}
                  placeholder="Введите пароль администратора"
                  autoFocus
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {err && <p className="text-red-400 text-xs mt-2">Неверный пароль. Попробуйте ещё раз.</p>}
            </div>

            <button type="submit" disabled={loading || !pw}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : "Войти"}
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-8">
            Подсказка: пароль по умолчанию — <span className="text-white/40 font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════════ */
function Sidebar({ tab, setTab, onLogout }: { tab: string; setTab: (t: string) => void; onLogout: () => void }) {
  const links = [
    { id: "dashboard", icon: LayoutDashboard, label: "Главная" },
    { id: "products", icon: Package, label: "Товары" },
    { id: "finance", icon: Wallet, label: "Финансы" },
    { id: "analytics", icon: BarChart2, label: "Аналитика" },
    { id: "settings", icon: SettingsIcon, label: "Настройки" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-white/6 flex flex-col">
      {/* logo */}
      <div className="px-6 py-6 border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 grid place-items-center">
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Organic House</div>
            <div className="text-white/30 text-[11px]">Панель управления</div>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === id
                ? "bg-emerald-500/15 text-emerald-400"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* bottom */}
      <div className="p-4 border-t border-white/6 space-y-1">
        <a href="/" target="_blank"
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition">
          <Eye className="w-4 h-4" /> Просмотр сайта
        </a>
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition">
          <LogOut className="w-4 h-4" /> Выйти
        </button>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════════════════ */
function Topbar({ title }: { title: string }) {
  return (
    <div className="h-16 border-b border-white/6 flex items-center justify-between px-8">
      <h1 className="text-white font-semibold text-lg">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 grid place-items-center text-white/50 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-sm font-bold">
          A
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════ */
function StatCard({ icon: Icon, label, value, sub, up, color }: {
  icon: any; label: string; value: string; sub: string; up: boolean; color: string;
}) {
  return (
    <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${color} grid place-items-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
          {up ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {sub}
        </div>
      </div>
      <div className="text-white text-2xl font-bold mb-1">{value}</div>
      <div className="text-white/40 text-sm">{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DASHBOARD TAB
══════════════════════════════════════════════════════ */
function DashboardTab({ products }: { products: Product[] }) {
  const totalRevenue = 28400000;
  const totalOrders = 198;
  const totalVisitors = 4821;

  return (
    <div className="p-8 space-y-8">
      {/* stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={DollarSign} label="Выручка за месяц" value={`${fmt(totalRevenue)} UZS`} sub="+18.2%" up color="bg-emerald-500/20" />
        <StatCard icon={ShoppingCart} label="Всего заказов" value={`${totalOrders}`} sub="+12.5%" up color="bg-blue-500/20" />
        <StatCard icon={Users} label="Посетители" value={`${fmt(totalVisitors)}`} sub="+8.1%" up color="bg-purple-500/20" />
        <StatCard icon={Package} label="Товары" value={`${products.length}`} sub="+2 новых" up color="bg-orange-500/20" />
      </div>

      {/* revenue chart */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">Обзор выручки</h3>
            <p className="text-white/40 text-sm mt-0.5">Ежемесячная динамика</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <ArrowUpRight className="w-4 h-4" /> +28.4% в этом месяце
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="month" tick={{ fill: "#ffffff40", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1c2333", border: "1px solid #ffffff15", borderRadius: 12 }}
              labelStyle={{ color: "#ffffff80" }}
              formatter={(v: number) => [`${fmt(v)} UZS`, "Выручка"]}
            />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* bottom row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* orders */}
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Заказов в месяц</h3>
          <p className="text-white/40 text-sm mb-6">Количество выполненных заказов</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#ffffff40", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1c2333", border: "1px solid #ffffff15", borderRadius: 12 }}
                labelStyle={{ color: "#ffffff80" }}
              />
              <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* categories */}
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Продажи по категориям</h3>
          <p className="text-white/40 text-sm mb-6">Распределение продаж</p>
          <div className="space-y-3">
            {CATEGORY_DATA.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/70">{c.name}</span>
                  <span className="text-white/40">{c.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/6">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                    style={{ width: `${c.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* top products */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-6">Топ товары</h3>
        <div className="space-y-4">
          {products.slice(0, 5).map((p, i) => (
            <div key={p.id} className="flex items-center gap-4">
              <div className="text-white/20 text-sm w-5 text-center">{i + 1}</div>
              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-white/5" />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{p.name}</div>
                <div className="text-white/40 text-xs">{p.category}</div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                <Star className="w-3 h-3 fill-current" /> {p.rating}
              </div>
              <div className="text-emerald-400 text-sm font-semibold whitespace-nowrap">{fmt(p.price)} UZS</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GALLERY MODAL — with upload from device
══════════════════════════════════════════════════════ */
function GalleryModal({ current, onSelect, onClose }: {
  current: string;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  type FilterType = "Все" | "Uploaded" | "Products" | "Categories" | "Other";
  const [filter, setFilter] = useState<FilterType>("Все");
  const [customImgs, setCustomImgs] = useState<GalleryImage[]>(loadCustomImages);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const allImages = [...customImgs, ...GALLERY_IMAGES];
  const groups: FilterType[] = ["Все", "Uploaded", "Products", "Categories", "Other"];
  const filtered = allImages.filter(img => filter === "Все" || img.group === filter);

  /* ── File → base64 ── */
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) { alert("File too large (max 5 MB)"); return; }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = ev => {
      const base64 = ev.target?.result as string;
      const newImg: GalleryImage = {
        url: base64,
        label: file.name.replace(/\.[^.]+$/, ""),
        group: "Uploaded",
      };
      const updated = [newImg, ...loadCustomImages()];
      saveCustomImages(updated);
      setCustomImgs(updated);
      setUploading(false);
      onSelect(base64);
      onClose();
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const deleteCustom = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customImgs.filter(img => img.url !== url);
    saveCustomImages(updated);
    setCustomImgs(updated);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-white/10 rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl"
        style={{ maxHeight: "85vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6 flex-shrink-0">
          <div>
            <h2 className="text-white font-semibold text-lg">🖼 Галерея изображений</h2>
            <p className="text-white/40 text-sm mt-0.5">Нажмите на изображение, чтобы выбрать</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 grid place-items-center text-white/50 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* upload zone */}
        <div className="px-6 pt-5 pb-3 border-b border-white/6 flex-shrink-0">
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all py-6 flex flex-col items-center justify-center gap-2 ${
              dragging
                ? "border-emerald-400 bg-emerald-500/10"
                : "border-white/15 hover:border-emerald-500/50 hover:bg-white/[0.03]"
            }`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-white/50 text-sm">Загрузка...</span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-center">
                  <div className="text-white text-sm font-medium">Загрузить с устройства</div>
                  <div className="text-white/40 text-xs mt-0.5">Нажмите или перетащите · JPG, PNG, WEBP · макс. 5 МБ</div>
                </div>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* filters */}
        <div className="px-6 py-3 border-b border-white/6 flex gap-2 flex-wrap flex-shrink-0">
          {groups.map(g => {
            const count = g === "Все" ? allImages.length
              : g === "Uploaded" ? customImgs.length
              : GALLERY_IMAGES.filter(i => i.group === g).length;
            return (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  filter === g
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-white/5 border-white/8 text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {g} {count > 0 && <span className="opacity-60">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* grid — scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-white/30">
              <ImageIcon className="w-10 h-10 mb-3 opacity-30" />
              <div className="text-sm">Изображений пока нет</div>
              <div className="text-xs mt-1">Загрузите с устройства выше</div>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {filtered.map(img => {
                const isSelected = current === img.url;
                const isCustom = img.group === "Uploaded";
                return (
                  <div key={img.url} className="relative group">
                    <button
                      type="button"
                      onClick={() => { onSelect(img.url); onClose(); }}
                      className={`w-full rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-500 shadow-lg shadow-emerald-500/30"
                          : "border-white/10 hover:border-emerald-500/60"
                      }`}
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition" />

                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-500/25 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                        <div className="text-white text-[11px] font-medium truncate">{img.label}</div>
                      </div>
                    </button>

                    {/* delete uploaded image */}
                    {isCustom && (
                      <button
                        type="button"
                        onClick={e => deleteCustom(img.url, e)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-black/70 hover:bg-red-500 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center z-10"
                        title="Delete"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-white/6 flex items-center justify-between flex-shrink-0">
          <span className="text-white/30 text-sm">{filtered.length} изображений</span>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   IMAGE PICKER — preview + "Choose from Gallery" button
══════════════════════════════════════════════════════ */
function ImagePicker({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [showGallery, setShowGallery] = useState(false);
  const [urlInput, setUrlInput] = useState(value);

  return (
    <div className="space-y-3">
      <div className="text-white/60 text-sm font-medium mb-1">Изображение товара</div>

      {/* preview row */}
      <div className="flex gap-4 items-center">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 relative">
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <ImageIcon className="w-6 h-6 text-white/15" />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {/* Gallery button — primary action */}
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 text-sm font-medium transition"
          >
            <ImageIcon className="w-4 h-4" />
            Выбрать из галереи
          </button>

          {/* URL input */}
          <input
            value={urlInput}
            onChange={e => {
              setUrlInput(e.target.value);
              onChange(e.target.value);
            }}
            className="w-full h-9 px-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition"
            placeholder="Или вставьте URL изображения…"
          />
        </div>
      </div>

      {/* Gallery modal — rendered outside the scroll container */}
      {showGallery && (
        <GalleryModal
          current={value}
          onSelect={url => { onChange(url); setUrlInput(url); }}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PRODUCT FORM (shared between Edit & Add)
══════════════════════════════════════════════════════ */
function ProductForm({ form, setForm, onSave, onClose, title, subtitle, saveLabel }: {
  form: Product;
  setForm: (p: Product) => void;
  onSave: () => void;
  onClose: () => void;
  title: string;
  subtitle?: string;
  saveLabel?: string;
}) {
  const set = (k: keyof Product, v: any) => setForm({ ...form, [k]: v });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#161b22] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-white/6">
          <div>
            <h2 className="text-white font-semibold text-lg">{title}</h2>
            {subtitle && <p className="text-white/40 text-sm mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 grid place-items-center text-white/50 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* image picker */}
          <ImagePicker value={form.image} onChange={url => set("image", url)} />

          {/* name */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Название товара</label>
            <input value={form.name} onChange={e => set("name", e.target.value)}
              className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition"
              placeholder="напр. Омега 3 рыбий жир" />
          </div>

          {/* category */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Категория</label>
            <input value={form.category} onChange={e => set("category", e.target.value)}
              className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition"
              placeholder="напр. Добавки, Красота, Витамины" />
          </div>

          {/* prices — 3 fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Цена продажи (UZS)</label>
              <input type="number" value={form.price || ""} onChange={e => set("price", Number(e.target.value))}
                className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/60 transition"
                placeholder="напр. 285000" />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Старая цена / Скидка (UZS)</label>
              <input type="number" value={form.oldPrice ?? ""} onChange={e => set("oldPrice", e.target.value ? Number(e.target.value) : undefined)}
                className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/60 transition"
                placeholder="Оставьте пустым, если нет скидки" />
            </div>
          </div>

          {/* cost price + profit calculator */}
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Себестоимость (UZS)</label>
              <input type="number" value={form.costPrice ?? ""} onChange={e => set("costPrice", e.target.value ? Number(e.target.value) : undefined)}
                className="w-full h-11 px-4 bg-white/5 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-500/60 transition"
                placeholder="Закупочная цена товара…" />
            </div>

            {/* live profit calculator */}
            {(() => {
              const cp = form.costPrice;
              if (cp === undefined || form.price <= 0) return null;
              const profit = form.price - cp;
              const margin = (profit / form.price) * 100;
              const isPositive = profit >= 0;
              return (
                <div className={`rounded-2xl border p-4 ${
                  isPositive ? "bg-emerald-500/8 border-emerald-500/20" : "bg-red-500/8 border-red-500/20"
                }`}>
                  <div className="text-white/50 text-xs mb-3 uppercase tracking-wider font-medium">📊 Расчёт прибыли</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-white/40 text-[11px] mb-1">Цена</div>
                      <div className="text-white text-sm font-bold">{fmt(form.price)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/40 text-[11px] mb-1">Себестоимость</div>
                      <div className="text-orange-400 text-sm font-bold">{fmt(cp)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/40 text-[11px] mb-1">Прибыль</div>
                      <div className={`text-sm font-bold ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                        {isPositive ? "+" : ""}{fmt(profit)}
                      </div>
                    </div>
                  </div>
                  {/* margin bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-white/40">Маржа прибыли</span>
                      <span className={isPositive ? "text-emerald-400" : "text-red-400"}>{margin.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isPositive ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-red-500"}`}
                        style={{ width: `${Math.min(Math.abs(margin), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>

          {/* badge */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Статус / Метка</label>
            <div className="flex gap-2 flex-wrap">
              {(["", "sale", "new", "bestseller"] as const).map(b => (
                <button key={b} onClick={() => set("badge", b)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                    form.badge === b
                      ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-400"
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                  }`}>
                  {b === "" ? "Нет" : b === "sale" ? "Скидка" : b === "new" ? "Новинка" : "Хит продаж"}
                </button>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium transition">
              Отмена
            </button>
            <button onClick={onSave} className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> {saveLabel ?? "Сохранить изменения"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   EDIT MODAL
══════════════════════════════════════════════════════ */
function EditModal({ product, onSave, onClose }: {
  product: Product; onSave: (p: Product) => void; onClose: () => void;
}) {
  const [form, setForm] = useState<Product>({ ...product });
  return (
    <ProductForm
      form={form} setForm={setForm}
      onSave={() => onSave(form)} onClose={onClose}
      title="Редактировать товар" subtitle={product.name}
    />
  );
}

const EMPTY_PRODUCT = (): Product => ({
  id: Date.now().toString(),
  name: "",
  category: "",
  price: 0,
  costPrice: undefined,
  rating: 5.0,
  reviews: 0,
  image: GALLERY_IMAGES[0].url,
  badge: "",
});

/* ══════════════════════════════════════════════════════
   PRODUCTS TAB
══════════════════════════════════════════════════════ */
function ProductsTab({ products, onUpdate }: { products: Product[]; onUpdate: (p: Product[]) => void }) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [newForm, setNewForm] = useState<Product>(EMPTY_PRODUCT());
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (updated: Product) => {
    onUpdate(products.map(p => p.id === updated.id ? updated : p));
    setEditing(null);
    showToast("✅ Товар обновлён!");
  };

  const handleAdd = () => {
    if (!newForm.name.trim() || !newForm.price) return;
    onUpdate([...products, { ...newForm, id: Date.now().toString() }]);
    setAdding(false);
    setNewForm(EMPTY_PRODUCT());
    showToast("✅ Товар добавлен!");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить этот товар?")) return;
    onUpdate(products.filter(p => p.id !== id));
    showToast("🗑 Товар удалён");
  };

  const BADGE_STYLES: Record<string, string> = {
    sale: "bg-red-500/15 text-red-400 border-red-500/30",
    new: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bestseller: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  };

  return (
    <div className="p-8">
      {/* toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1e2733] border border-emerald-500/30 text-white text-sm px-5 py-3 rounded-2xl shadow-2xl animate-pulse">
          {toast}
        </div>
      )}

      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold text-lg">Товары</h2>
          <p className="text-white/40 text-sm">{products.length} товаров всего</p>
        </div>
        <button onClick={() => { setNewForm(EMPTY_PRODUCT()); setAdding(true); }}
          className="flex items-center gap-2 h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-500/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Добавить товар
        </button>
      </div>

      {/* search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Поиск товаров..."
          className="w-full h-11 pl-11 pr-4 bg-[#161b22] border border-white/6 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/40 transition" />
      </div>

      {/* table */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Товар</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Категория</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Цена</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Метка</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Рейтинг</th>
              <th className="text-right text-white/30 text-xs font-medium px-6 py-4">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} className={`border-b border-white/4 hover:bg-white/[0.02] transition ${i === filtered.length - 1 ? "border-0" : ""}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/8 flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23ffffff10'/%3E%3C/svg%3E"; }} />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{p.name}</div>
                      <div className="text-white/30 text-xs">{p.reviews} отзывов</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-white/50 text-sm">{p.category}</span></td>
                <td className="px-6 py-4">
                  <div className="text-white text-sm font-semibold">{fmt(p.price)} UZS</div>
                  {p.oldPrice && <div className="text-white/30 text-xs line-through">{fmt(p.oldPrice)} UZS</div>}
                </td>
                <td className="px-6 py-4">
                  {p.badge ? (
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${BADGE_STYLES[p.badge] ?? ""}`}>{p.badge}</span>
                  ) : <span className="text-white/20 text-xs">—</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-white/70 text-sm">{p.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setEditing(p)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/15 hover:text-emerald-400 text-white/50 text-xs font-medium transition border border-white/8 hover:border-emerald-500/30">
                      <Edit2 className="w-3 h-3" /> Изменить
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 hover:text-red-400 text-white/30 text-xs font-medium transition border border-white/8 hover:border-red-500/30">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 text-sm">Товары не найдены</div>
        )}
      </div>

      {/* Edit modal */}
      {editing && <EditModal product={editing} onSave={handleSave} onClose={() => setEditing(null)} />}

      {/* Add modal */}
      {adding && (
        <ProductForm
          form={newForm} setForm={setNewForm}
          onSave={handleAdd} onClose={() => setAdding(false)}
          title="Добавить новый товар"
          subtitle="Заполните информацию и выберите изображение из галереи"
          saveLabel="Добавить товар"
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ANALYTICS TAB
══════════════════════════════════════════════════════ */
function AnalyticsTab() {
  const visitors = [
    { day: "Mon", desktop: 320, mobile: 480 },
    { day: "Tue", desktop: 410, mobile: 390 },
    { day: "Wed", desktop: 520, mobile: 610 },
    { day: "Thu", desktop: 380, mobile: 520 },
    { day: "Fri", desktop: 640, mobile: 720 },
    { day: "Sat", desktop: 590, mobile: 680 },
    { day: "Sun", desktop: 420, mobile: 510 },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Users} label="Всего посетителей" value="4,821" sub="+8.1%" up color="bg-blue-500/20" />
        <StatCard icon={TrendingUp} label="Конверсия" value="3.8%" sub="+0.4%" up color="bg-emerald-500/20" />
        <StatCard icon={ShoppingCart} label="Средний чек" value="143,400 UZS" sub="-2.1%" up={false} color="bg-orange-500/20" />
        <StatCard icon={Star} label="Удовлетворённость" value="4.85/5" sub="+0.05" up color="bg-yellow-500/20" />
      </div>

      {/* visitors chart */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-1">Посетители за неделю</h3>
        <p className="text-white/40 text-sm mb-6">Десктоп против мобильных</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={visitors}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="day" tick={{ fill: "#ffffff40", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1c2333", border: "1px solid #ffffff15", borderRadius: 12 }}
              labelStyle={{ color: "#ffffff80" }}
            />
            <Line type="monotone" dataKey="desktop" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} name="Desktop" />
            <Line type="monotone" dataKey="mobile" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} name="Mobile" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-3 h-0.5 bg-emerald-500 rounded" /> Десктоп
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-3 h-0.5 bg-indigo-500 rounded" /> Мобильные
          </div>
        </div>
      </div>

      {/* summary */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { label: "Процент отказов", value: "34.2%", trend: "↓ на 2.1% лучше", good: true },
          { label: "Ср. длит. сессии", value: "3м 42с", trend: "↑ на 18с дольше", good: true },
          { label: "Страниц за сессию", value: "4.7", trend: "↑ на 0.3 больше", good: true },
        ].map(item => (
          <div key={item.label} className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
            <div className="text-white/40 text-sm mb-3">{item.label}</div>
            <div className="text-white text-3xl font-bold mb-2">{item.value}</div>
            <div className={`text-xs ${item.good ? "text-emerald-400" : "text-red-400"}`}>{item.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FINANCE TAB — buxgalteriya hisobi
══════════════════════════════════════════════════════ */
function FinanceTab({ products }: { products: Product[] }) {
  const withCost = products.filter(p => p.costPrice !== undefined && p.costPrice > 0);

  const totalRevenue = products.reduce((s, p) => s + p.price, 0);
  const totalCost = withCost.reduce((s, p) => s + (p.costPrice ?? 0), 0);
  const totalProfit = withCost.reduce((s, p) => s + (p.price - (p.costPrice ?? 0)), 0);
  const avgMargin = withCost.length
    ? withCost.reduce((s, p) => s + ((p.price - (p.costPrice ?? 0)) / p.price) * 100, 0) / withCost.length
    : 0;

  /* chart data — cost vs profit stacked */
  const chartData = withCost.map(p => {
    const cost = p.costPrice ?? 0;
    const profit = p.price - cost;
    const margin = (profit / p.price) * 100;
    return {
      name: p.name.split(" ").slice(0, 2).join(" "),
      fullName: p.name,
      cost,
      profit,
      margin: parseFloat(margin.toFixed(1)),
      price: p.price,
    };
  });

  /* monthly profit trend (simulated) */
  const trendData = [
    { month: "Jan", daromad: 12400000, tannarx: 7200000, foyda: 5200000 },
    { month: "Feb", daromad: 15800000, tannarx: 9100000, foyda: 6700000 },
    { month: "Mar", daromad: 18200000, tannarx: 10400000, foyda: 7800000 },
    { month: "Apr", daromad: 16500000, tannarx: 9800000, foyda: 6700000 },
    { month: "May", daromad: 22100000, tannarx: 12500000, foyda: 9600000 },
    { month: "Jun", daromad: 28400000, tannarx: 15800000, foyda: 12600000 },
    { month: "Jul", daromad: 31200000, tannarx: 17100000, foyda: 14100000 },
  ];

  const marginColor = (m: number) =>
    m >= 40 ? "#10b981" : m >= 20 ? "#f59e0b" : "#ef4444";

  return (
    <div className="p-8 space-y-8">
      {/* summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={DollarSign} label="Общая выручка" value={`${fmt(totalRevenue)} UZS`} sub="+18.2%" up color="bg-blue-500/20" />
        <StatCard icon={ShoppingCart} label="Общая себестоимость" value={`${fmt(totalCost)} UZS`} sub="Закупочная цена" up={false} color="bg-orange-500/20" />
        <StatCard icon={TrendingUp} label="Чистая прибыль" value={`${fmt(totalProfit)} UZS`} sub="+12.4%" up color="bg-emerald-500/20" />
        <StatCard icon={BarChart2} label="Средняя маржа" value={`${avgMargin.toFixed(1)}%`} sub="Маржинальность" up color="bg-purple-500/20" />
      </div>

      {/* daromad vs tannarx vs foyda — stacked bar */}
      {withCost.length > 0 && (
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-white font-semibold">Цена / Себестоимость / Прибыль</h3>
              <p className="text-white/40 text-sm mt-0.5">Бухгалтерский анализ по каждому товару</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-400 inline-block" /> Себестоимость</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Прибыль</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#ffffff50", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1c2333", border: "1px solid #ffffff15", borderRadius: 12 }}
                labelStyle={{ color: "#fff", fontWeight: 600 }}
                formatter={(v: number, name: string) => [
                  `${fmt(v)} UZS`,
                  name === "cost" ? "Себестоимость" : name === "profit" ? "Прибыль" : name
                ]}
              />
              <Bar dataKey="cost" stackId="a" fill="#f97316" radius={[0,0,6,6]} name="cost" />
              <Bar dataKey="profit" stackId="a" fill="#10b981" radius={[6,6,0,0]} name="profit" />
              <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }} name="Цена" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-3 justify-center">
            <span className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-4 h-0.5 bg-indigo-500 inline-block" /> Цена продажи</span>
          </div>
        </div>
      )}

      {/* monthly profit trend */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-1">Ежемесячный тренд прибыли</h3>
        <p className="text-white/40 text-sm mb-6">Динамика выручки, себестоимости и чистой прибыли</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="gradDar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradFoy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
            <XAxis dataKey="month" tick={{ fill: "#ffffff40", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1c2333", border: "1px solid #ffffff15", borderRadius: 12 }}
              labelStyle={{ color: "#ffffff80" }}
              formatter={(v: number) => [`${fmt(v)} UZS`]}
            />
            <Area type="monotone" dataKey="daromad" stroke="#6366f1" strokeWidth={2} fill="url(#gradDar)" name="Выручка" />
            <Area type="monotone" dataKey="foyda" stroke="#10b981" strokeWidth={2} fill="url(#gradFoy)" name="Чистая прибыль" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 justify-center">
          <span className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-3 h-0.5 bg-indigo-500 inline-block" /> Выручка</span>
          <span className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Чистая прибыль</span>
        </div>
      </div>

      {/* product profit table */}
      {withCost.length > 0 ? (
        <div className="bg-[#161b22] border border-white/6 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/6">
            <h3 className="text-white font-semibold">Анализ прибыльности товаров</h3>
            <p className="text-white/40 text-sm mt-0.5">Рентабельность каждого товара</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left text-white/30 text-xs font-medium px-6 py-3">Товар</th>
                <th className="text-right text-white/30 text-xs font-medium px-4 py-3">Цена</th>
                <th className="text-right text-white/30 text-xs font-medium px-4 py-3">Себестоимость</th>
                <th className="text-right text-white/30 text-xs font-medium px-4 py-3">Прибыль</th>
                <th className="text-right text-white/30 text-xs font-medium px-6 py-3">Маржа</th>
              </tr>
            </thead>
            <tbody>
              {withCost.map((p, i) => {
                const cost = p.costPrice ?? 0;
                const profit = p.price - cost;
                const margin = (profit / p.price) * 100;
                const clr = marginColor(margin);
                return (
                  <tr key={p.id} className={`border-b border-white/4 hover:bg-white/[0.02] transition ${i === withCost.length - 1 ? "border-0" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-9 h-9 rounded-xl object-cover bg-white/5" />
                        <div>
                          <div className="text-white text-sm font-medium truncate max-w-[180px]">{p.name}</div>
                          <div className="text-white/30 text-xs">{p.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-white text-sm">{fmt(p.price)}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="text-orange-400 text-sm">{fmt(cost)}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-sm font-semibold ${profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {profit >= 0 ? "+" : ""}{fmt(profit)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/8">
                          <div className="h-full rounded-full" style={{ width: `${Math.min(margin, 100)}%`, backgroundColor: clr }} />
                        </div>
                        <span className="text-sm font-semibold w-12 text-right" style={{ color: clr }}>
                          {margin.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-6 py-4 text-white/50 text-sm font-medium">Итого</td>
                <td className="px-4 py-4 text-right text-white font-semibold text-sm">{fmt(totalRevenue)}</td>
                <td className="px-4 py-4 text-right text-orange-400 font-semibold text-sm">{fmt(totalCost)}</td>
                <td className="px-4 py-4 text-right text-emerald-400 font-bold text-sm">+{fmt(totalProfit)}</td>
                <td className="px-6 py-4 text-right text-emerald-400 font-bold text-sm">{avgMargin.toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-12 text-center">
          <Wallet className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <div className="text-white/50 text-sm">Себестоимость не указана</div>
          <div className="text-white/30 text-xs mt-1">Отредактируйте товары и добавьте закупочную цену</div>
        </div>
      )}
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   SETTINGS TAB
══════════════════════════════════════════════════════ */
function SettingsTab() {
  const [settings, setSettings] = useState({
    tgToken: "",
    tgChatId: "",
    tgBotUsername: "",
    clickServiceId: "",
    clickMerchantId: "",
    paymeMerchantId: "",
  });
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ohc_settings");
      if (raw) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
      }
    } catch {}
  }, []);

  const handleSave = () => {
    localStorage.setItem("ohc_settings", JSON.stringify(settings));
    toast.success("Настройки успешно сохранены!");
  };

  const handleSendTestMessage = async () => {
    if (!settings.tgToken || !settings.tgChatId) {
      toast.error("Введите Token и Chat ID для отправки теста");
      return;
    }
    setTestLoading(true);
    try {
      const res = await fetch(`https://api.telegram.org/bot${settings.tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: settings.tgChatId,
          text: "🔔 *Тестовое сообщение* от панели управления Organic House!\nИнтеграция настроена успешно. 👍",
          parse_mode: "Markdown",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("Тестовое сообщение отправлено!");
      } else {
        toast.error(`Ошибка Telegram API: ${data.description}`);
      }
    } catch (e) {
      toast.error("Не удалось подключиться к Telegram API");
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl text-white">
      <div>
        <h2 className="text-2xl font-bold font-display">Настройки интеграций</h2>
        <p className="text-white/40 text-sm mt-1">
          Настройте Telegram-ботов и платежные системы Click/Payme для вашего магазина.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Telegram Section */}
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/6">
            <span className="text-xl">✈️</span>
            <h3 className="font-semibold text-base">Интеграция с Telegram</h3>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs text-white/50 font-medium">Telegram Bot Token</label>
            <input
              type="text"
              placeholder="7249156327:AAH0dM0X16d_cT6C2U_w-M1h4YlZ..."
              value={settings.tgToken}
              onChange={(e) => setSettings({ ...settings, tgToken: e.target.value })}
              className="w-full h-10 px-4 rounded-xl bg-[#0d1117] border border-white/10 focus:border-emerald-500 focus:outline-none transition text-sm font-mono text-white/80"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/50 font-medium">Chat ID / Channel ID</label>
            <input
              type="text"
              placeholder="-1002244837894"
              value={settings.tgChatId}
              onChange={(e) => setSettings({ ...settings, tgChatId: e.target.value })}
              className="w-full h-10 px-4 rounded-xl bg-[#0d1117] border border-white/10 focus:border-emerald-500 focus:outline-none transition text-sm font-mono text-white/80"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/50 font-medium">Username бота (без @, для перехода пользователя)</label>
            <div className="flex">
              <span className="h-10 px-3 bg-white/5 border border-r-0 border-white/10 rounded-l-xl flex items-center text-xs text-white/40 font-medium">t.me/</span>
              <input
                type="text"
                placeholder="OrganicHouseOrderBot"
                value={settings.tgBotUsername}
                onChange={(e) => setSettings({ ...settings, tgBotUsername: e.target.value })}
                className="flex-1 h-10 px-4 rounded-r-xl bg-[#0d1117] border border-white/10 focus:border-emerald-500 focus:outline-none transition text-sm text-white/80"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSendTestMessage}
              disabled={testLoading}
              className="w-full h-10 bg-white/5 hover:bg-white/10 text-white/80 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {testLoading ? "Отправка..." : "Проверить соединение (Тест)"}
            </button>
          </div>
        </div>

        {/* Payments Section */}
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/6">
            <span className="text-xl">💳</span>
            <h3 className="font-semibold text-base">Платежные системы</h3>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">Click.uz</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/50 font-medium">Service ID</label>
                <input
                  type="text"
                  placeholder="32145"
                  value={settings.clickServiceId}
                  onChange={(e) => setSettings({ ...settings, clickServiceId: e.target.value })}
                  className="w-full h-10 px-4 rounded-xl bg-[#0d1117] border border-white/10 focus:border-emerald-500 focus:outline-none transition text-sm text-white/80"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/50 font-medium">Merchant ID</label>
                <input
                  type="text"
                  placeholder="24512"
                  value={settings.clickMerchantId}
                  onChange={(e) => setSettings({ ...settings, clickMerchantId: e.target.value })}
                  className="w-full h-10 px-4 rounded-xl bg-[#0d1117] border border-white/10 focus:border-emerald-500 focus:outline-none transition text-sm text-white/80"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">Payme.uz</div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 font-medium">Merchant ID</label>
              <input
                type="text"
                placeholder="63f5383a8b417bb12ab125da"
                value={settings.paymeMerchantId}
                onChange={(e) => setSettings({ ...settings, paymeMerchantId: e.target.value })}
                className="w-full h-10 px-4 rounded-xl bg-[#0d1117] border border-white/10 focus:border-emerald-500 focus:outline-none transition text-sm text-white/80"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition shadow-lift cursor-pointer"
        >
          Сохранить все настройки
        </button>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);

  useEffect(() => {
    setAuthed(localStorage.getItem("ohc_admin") === "1");
    setProducts(loadProducts());
  }, []);

  const handleLogin = () => setAuthed(true);

  const handleLogout = () => {
    localStorage.removeItem("ohc_admin");
    setAuthed(false);
  };

  const handleProductUpdate = (updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
  };

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  const TAB_TITLES: Record<string, string> = {
    dashboard: "Главная",
    products: "Товары",
    finance: "💰 Финансы — Бухгалтерия",
    analytics: "Аналитика",
    settings: "⚙️ Настройки интеграций",
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      <Sidebar tab={tab} setTab={setTab} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={TAB_TITLES[tab] ?? tab} />
        <div className="flex-1 overflow-auto">
          {tab === "dashboard" && <DashboardTab products={products} />}
          {tab === "products" && <ProductsTab products={products} onUpdate={handleProductUpdate} />}
          {tab === "finance" && <FinanceTab products={products} />}
          {tab === "settings" && <SettingsTab />}
          {tab === "analytics" && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
}
