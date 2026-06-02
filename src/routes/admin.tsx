import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Package, LogOut, TrendingUp, ShoppingCart,
  Users, DollarSign, Edit2, Save, X, Upload, Eye, EyeOff,
  ChevronUp, ChevronDown, Star, BarChart2, Leaf, Search,
  Bell, Settings, Tag, Image as ImageIcon, ArrowUpRight,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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
  rating: number;
  reviews: number;
  image: string;
  badge?: "sale" | "new" | "bestseller" | "";
}

/* ─── DEFAULT DATA ─── */
const DEFAULT_PRODUCTS: Product[] = [
  { id: "1", name: "Premium Omega 3 Fish Oil", category: "Supplements", price: 285000, oldPrice: 340000, rating: 4.9, reviews: 312, image: "/assets/prod-omega3-C_vjyhwb.jpg", badge: "sale" },
  { id: "2", name: "Marine Collagen + Vitamin C", category: "Beauty", price: 420000, rating: 4.8, reviews: 198, image: "/assets/prod-collagen-BqEX6mLl.jpg", badge: "new" },
  { id: "3", name: "Vitamin D₃ 5000 IU", category: "Vitamins", price: 175000, rating: 4.9, reviews: 421, image: "/assets/prod-vitd-k__PCbaP.jpg", badge: "bestseller" },
  { id: "4", name: "Organic Chia Seeds 500g", category: "Superfoods", price: 89000, oldPrice: 110000, rating: 4.7, reviews: 156, image: "/assets/prod-chia-BWTeDBqs.jpg", badge: "" },
  { id: "5", name: "Raw Almond Butter", category: "Organic", price: 145000, rating: 4.8, reviews: 89, image: "/assets/prod-almond-D45IKrfv.jpg", badge: "new" },
  { id: "6", name: "Ceremonial Matcha Powder", category: "Tea & Coffee", price: 320000, rating: 4.9, reviews: 245, image: "/assets/prod-matcha-w7IoWVtJ.jpg", badge: "" },
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
              <div className="text-white/40 text-xs mt-0.5">Admin Panel</div>
            </div>
          </div>

          <h1 className="text-white text-2xl font-bold mb-1">Welcome back 👋</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to manage your store</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={e => { setPw(e.target.value); setErr(false); }}
                  className={`w-full h-12 px-4 pr-11 bg-white/5 border ${err ? "border-red-500/60" : "border-white/10"} rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition`}
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {err && <p className="text-red-400 text-xs mt-2">Incorrect password. Try again.</p>}
            </div>

            <button type="submit" disabled={loading || !pw}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : "Sign in"}
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-8">
            Hint: default password is <span className="text-white/40 font-mono">admin123</span>
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
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "products", icon: Package, label: "Products" },
    { id: "analytics", icon: BarChart2, label: "Analytics" },
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
            <div className="text-white/30 text-[11px]">Admin Panel</div>
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
          <Eye className="w-4 h-4" /> View site
        </a>
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition">
          <LogOut className="w-4 h-4" /> Logout
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
        <StatCard icon={DollarSign} label="Monthly Revenue" value={`${fmt(totalRevenue)} UZS`} sub="+18.2%" up color="bg-emerald-500/20" />
        <StatCard icon={ShoppingCart} label="Total Orders" value={`${totalOrders}`} sub="+12.5%" up color="bg-blue-500/20" />
        <StatCard icon={Users} label="Visitors" value={`${fmt(totalVisitors)}`} sub="+8.1%" up color="bg-purple-500/20" />
        <StatCard icon={Package} label="Products" value={`${products.length}`} sub="+2 new" up color="bg-orange-500/20" />
      </div>

      {/* revenue chart */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold">Revenue Overview</h3>
            <p className="text-white/40 text-sm mt-0.5">Monthly revenue trend</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <ArrowUpRight className="w-4 h-4" /> +28.4% this month
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
              formatter={(v: number) => [`${fmt(v)} UZS`, "Revenue"]}
            />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* bottom row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* orders */}
        <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Orders per Month</h3>
          <p className="text-white/40 text-sm mb-6">Number of completed orders</p>
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
          <h3 className="text-white font-semibold mb-1">Sales by Category</h3>
          <p className="text-white/40 text-sm mb-6">Distribution of sales</p>
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
        <h3 className="text-white font-semibold mb-6">Top Products</h3>
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
   GALLERY MODAL — opens as its own overlay (z-[100])
══════════════════════════════════════════════════════ */
function GalleryModal({ current, onSelect, onClose }: {
  current: string;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<"All" | "Products" | "Categories" | "Other">("All");
  const groups = ["All", "Products", "Categories", "Other"] as const;
  const filtered = GALLERY_IMAGES.filter(img => filter === "All" || img.group === filter);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-white/10 rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl"
        style={{ maxHeight: "80vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6 flex-shrink-0">
          <div>
            <h2 className="text-white font-semibold text-lg">🖼 Image Gallery</h2>
            <p className="text-white/40 text-sm mt-0.5">Click an image to select it</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 grid place-items-center text-white/50 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* filters */}
        <div className="px-6 py-3 border-b border-white/6 flex gap-2 flex-shrink-0">
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition ${
                filter === g
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                  : "bg-white/5 border-white/8 text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {g} {g !== "All" && `(${GALLERY_IMAGES.filter(i => i.group === g).length})`}
            </button>
          ))}
        </div>

        {/* grid — scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {filtered.map(img => {
              const isSelected = current === img.url;
              return (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => { onSelect(img.url); onClose(); }}
                  className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/30 scale-[0.98]"
                      : "border-white/10 hover:border-emerald-500/60 hover:scale-[0.97]"
                  }`}
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

                  {/* selected overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-emerald-500/25 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* label */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-3">
                    <div className="text-white text-xs font-medium truncate">{img.label}</div>
                    <div className="text-white/50 text-[10px]">{img.group}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="px-6 py-4 border-t border-white/6 flex items-center justify-between flex-shrink-0">
          <span className="text-white/30 text-sm">{filtered.length} images</span>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition">
            Cancel
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
      <div className="text-white/60 text-sm font-medium mb-1">Product Image</div>

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
            Choose from Gallery
          </button>

          {/* URL input */}
          <input
            value={urlInput}
            onChange={e => {
              setUrlInput(e.target.value);
              onChange(e.target.value);
            }}
            className="w-full h-9 px-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition"
            placeholder="Or paste image URL…"
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
            <label className="text-white/60 text-sm mb-2 block">Product Name</label>
            <input value={form.name} onChange={e => set("name", e.target.value)}
              className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition"
              placeholder="e.g. Premium Omega 3 Fish Oil" />
          </div>

          {/* category */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Category</label>
            <input value={form.category} onChange={e => set("category", e.target.value)}
              className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition"
              placeholder="e.g. Supplements, Beauty, Vitamins" />
          </div>

          {/* prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Price (UZS)</label>
              <input type="number" value={form.price || ""} onChange={e => set("price", Number(e.target.value))}
                className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/60 transition"
                placeholder="e.g. 285000" />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Old Price (UZS)</label>
              <input type="number" value={form.oldPrice ?? ""} onChange={e => set("oldPrice", e.target.value ? Number(e.target.value) : undefined)}
                className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/60 transition"
                placeholder="Leave blank if no discount" />
            </div>
          </div>

          {/* badge */}
          <div>
            <label className="text-white/60 text-sm mb-2 block">Badge</label>
            <div className="flex gap-2 flex-wrap">
              {(["", "sale", "new", "bestseller"] as const).map(b => (
                <button key={b} onClick={() => set("badge", b)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                    form.badge === b
                      ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-400"
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                  }`}>
                  {b === "" ? "None" : b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium transition">
              Cancel
            </button>
            <button onClick={onSave} className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> {saveLabel ?? "Save changes"}
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
      title="Edit Product" subtitle={product.name}
    />
  );
}

const EMPTY_PRODUCT = (): Product => ({
  id: Date.now().toString(),
  name: "",
  category: "",
  price: 0,
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
    showToast("✅ Product updated!");
  };

  const handleAdd = () => {
    if (!newForm.name.trim() || !newForm.price) return;
    onUpdate([...products, { ...newForm, id: Date.now().toString() }]);
    setAdding(false);
    setNewForm(EMPTY_PRODUCT());
    showToast("✅ Product added!");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this product?")) return;
    onUpdate(products.filter(p => p.id !== id));
    showToast("🗑 Product deleted");
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
          <h2 className="text-white font-semibold text-lg">Products</h2>
          <p className="text-white/40 text-sm">{products.length} total products</p>
        </div>
        <button onClick={() => { setNewForm(EMPTY_PRODUCT()); setAdding(true); }}
          className="flex items-center gap-2 h-10 px-5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-500/20">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full h-11 pl-11 pr-4 bg-[#161b22] border border-white/6 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/40 transition" />
      </div>

      {/* table */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Product</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Category</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Price</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Badge</th>
              <th className="text-left text-white/30 text-xs font-medium px-6 py-4">Rating</th>
              <th className="text-right text-white/30 text-xs font-medium px-6 py-4">Actions</th>
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
                      <div className="text-white/30 text-xs">{p.reviews} reviews</div>
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
                      <Edit2 className="w-3 h-3" /> Edit
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
          <div className="text-center py-16 text-white/30 text-sm">No products found</div>
        )}
      </div>

      {/* Edit modal */}
      {editing && <EditModal product={editing} onSave={handleSave} onClose={() => setEditing(null)} />}

      {/* Add modal */}
      {adding && (
        <ProductForm
          form={newForm} setForm={setNewForm}
          onSave={handleAdd} onClose={() => setAdding(false)}
          title="Add New Product"
          subtitle="Fill in details and choose an image from the gallery"
          saveLabel="Add Product"
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
        <StatCard icon={Users} label="Total Visitors" value="4,821" sub="+8.1%" up color="bg-blue-500/20" />
        <StatCard icon={TrendingUp} label="Conversion Rate" value="3.8%" sub="+0.4%" up color="bg-emerald-500/20" />
        <StatCard icon={ShoppingCart} label="Avg. Order Value" value="143,400 UZS" sub="-2.1%" up={false} color="bg-orange-500/20" />
        <StatCard icon={Star} label="Satisfaction" value="4.85/5" sub="+0.05" up color="bg-yellow-500/20" />
      </div>

      {/* visitors chart */}
      <div className="bg-[#161b22] border border-white/6 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-1">Visitors This Week</h3>
        <p className="text-white/40 text-sm mb-6">Desktop vs Mobile</p>
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
            <div className="w-3 h-0.5 bg-emerald-500 rounded" /> Desktop
          </div>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-3 h-0.5 bg-indigo-500 rounded" /> Mobile
          </div>
        </div>
      </div>

      {/* summary */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { label: "Bounce Rate", value: "34.2%", trend: "↓ 2.1% better", good: true },
          { label: "Avg. Session Duration", value: "3m 42s", trend: "↑ 18s longer", good: true },
          { label: "Pages per Session", value: "4.7", trend: "↑ 0.3 more", good: true },
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
    dashboard: "Dashboard",
    products: "Products",
    analytics: "Analytics",
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      <Sidebar tab={tab} setTab={setTab} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={TAB_TITLES[tab] ?? tab} />
        <div className="flex-1 overflow-auto">
          {tab === "dashboard" && <DashboardTab products={products} />}
          {tab === "products" && <ProductsTab products={products} onUpdate={handleProductUpdate} />}
          {tab === "analytics" && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
}
