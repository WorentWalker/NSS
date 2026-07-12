import { useEffect, useState } from "react";
import { Trash2, Plus, Package, FolderOpen, LogOut } from "lucide-react";
import {
  adminCreateCategory,
  adminCreateProduct,
  adminDeleteCategory,
  adminDeleteProduct,
  adminFetchCategories,
  adminFetchProducts,
  adminUpdateProduct,
  clearAdminPassword,
  getAdminPassword,
  setAdminPassword,
  type ApiCategory,
  type ApiProduct,
  type ProductInput,
} from "../lib/api";

const EMPTY_SPEC = { label: "", value: "" };

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPassword(password);
    try {
      await adminFetchCategories();
      onLogin();
    } catch {
      clearAdminPassword();
      setError("Невірний пароль");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white border border-[#D4DEE9] rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Адмін-панель NSS</h1>
        <p className="text-sm text-[#64748B] mb-6">Введіть пароль для керування товарами</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full border border-[#D4DEE9] rounded-lg px-4 py-3 mb-4 text-sm"
          required
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#2DC653] hover:bg-[#1DA040] text-white font-semibold py-3 rounded-lg"
        >
          Увійти
        </button>
      </form>
    </div>
  );
}

function ProductForm({
  categories,
  initial,
  onSave,
  onCancel,
}: {
  categories: ApiCategory[];
  initial?: ApiProduct;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductInput>({
    id: initial?.id,
    categoryId: initial?.category || categories[0]?.id || "",
    name: initial?.name || "",
    badge: initial?.badge || "",
    color: initial?.color || "#2DC653",
    descriptionUk: initial?.description || "",
    descriptionEn: "",
    highlightUk: initial?.highlight || "",
    highlightEn: "",
    warranty: initial?.warranty || "",
    image: initial?.image || "",
    featured: initial?.featured || false,
    specs: initial?.specs?.length ? initial.specs : [{ ...EMPTY_SPEC }],
    tags: initial?.tags || [],
  });
  const [tagsText, setTagsText] = useState((initial?.tags || []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateSpec = (index: number, field: "label" | "value", value: string) => {
    const specs = [...(form.specs || [])];
    specs[index] = { ...specs[index], [field]: value };
    setForm({ ...form, specs });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload: ProductInput = {
        ...form,
        specs: (form.specs || []).filter((s) => s.label.trim() && s.value.trim()),
        tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      };
      if (initial) {
        await adminUpdateProduct(initial.id, payload);
      } else {
        await adminCreateProduct(payload);
      }
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка збереження");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white border border-[#D4DEE9] rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-lg">{initial ? "Редагувати товар" : "Новий товар"}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="text-[#64748B]">Назва *</span>
          <input
            className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-[#64748B]">ID (необовʼязково)</span>
          <input
            className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
            value={form.id || ""}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            disabled={Boolean(initial)}
            placeholder="авто з назви"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[#64748B]">Категорія *</span>
          <select
            className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.nameUk}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-[#64748B]">Бейдж (потужність)</span>
          <input
            className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            placeholder="620W"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[#64748B]">Колір картки</span>
          <input
            type="color"
            className="mt-1 w-full h-10 border border-[#D4DEE9] rounded-lg"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          <span className="text-[#64748B]">Фото (URL)</span>
          <input
            className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="/assets/products/qsun/620w.png"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-[#64748B]">Короткий підзаголовок</span>
        <input
          className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
          value={form.highlightUk}
          onChange={(e) => setForm({ ...form, highlightUk: e.target.value })}
        />
      </label>

      <label className="block text-sm">
        <span className="text-[#64748B]">Опис</span>
        <textarea
          className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2 min-h-[100px]"
          value={form.descriptionUk}
          onChange={(e) => setForm({ ...form, descriptionUk: e.target.value })}
        />
      </label>

      <label className="block text-sm">
        <span className="text-[#64748B]">Гарантія</span>
        <input
          className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
          value={form.warranty}
          onChange={(e) => setForm({ ...form, warranty: e.target.value })}
        />
      </label>

      <label className="block text-sm">
        <span className="text-[#64748B]">Теги (через кому)</span>
        <input
          className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="Біфасіальна, LFP, IP66"
        />
      </label>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#64748B]">Характеристики</span>
          <button
            type="button"
            className="text-sm text-[#2DC653] font-semibold"
            onClick={() => setForm({ ...form, specs: [...(form.specs || []), { ...EMPTY_SPEC }] })}
          >
            + Додати
          </button>
        </div>
        <div className="space-y-2">
          {(form.specs || []).map((spec, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input
                className="border border-[#D4DEE9] rounded-lg px-3 py-2 text-sm"
                placeholder="Назва"
                value={spec.label}
                onChange={(e) => updateSpec(i, "label", e.target.value)}
              />
              <input
                className="border border-[#D4DEE9] rounded-lg px-3 py-2 text-sm"
                placeholder="Значення"
                value={spec.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
        />
        Рекомендований товар
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#2DC653] hover:bg-[#1DA040] text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {saving ? "Збереження..." : "Зберегти"}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg border border-[#D4DEE9]">
          Скасувати
        </button>
      </div>
    </form>
  );
}

export function Admin() {
  const [loggedIn, setLoggedIn] = useState(Boolean(getAdminPassword()));
  const [tab, setTab] = useState<"products" | "categories">("products");
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [editing, setEditing] = useState<ApiProduct | null | "new">(null);
  const [catUk, setCatUk] = useState("");
  const [catEn, setCatEn] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const [p, c] = await Promise.all([adminFetchProducts(), adminFetchCategories()]);
    setProducts(p);
    setCategories(c);
  };

  useEffect(() => {
    if (loggedIn) {
      load().catch(() => {
        clearAdminPassword();
        setLoggedIn(false);
      });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <LoginForm onLogin={() => setLoggedIn(true)} />;
  }

  const logout = () => {
    clearAdminPassword();
    setLoggedIn(false);
  };

  const removeProduct = async (id: string) => {
    if (!confirm("Видалити товар?")) return;
    await adminDeleteProduct(id);
    await load();
  };

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await adminCreateCategory({ nameUk: catUk, nameEn: catEn || catUk });
      setCatUk("");
      setCatEn("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка");
    }
  };

  const removeCategory = async (id: string) => {
    if (!confirm("Видалити категорію?")) return;
    try {
      await adminDeleteCategory(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Не вдалося видалити");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9FC]">
      <header className="bg-white border-b border-[#D4DEE9] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0F172A]">NSS Admin</h1>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0F172A]">
          <LogOut size={16} /> Вийти
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setTab("products"); setEditing(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${tab === "products" ? "bg-[#2DC653] text-white" : "bg-white border border-[#D4DEE9]"}`}
          >
            <Package size={16} /> Товари
          </button>
          <button
            onClick={() => setTab("categories")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${tab === "categories" ? "bg-[#2DC653] text-white" : "bg-white border border-[#D4DEE9]"}`}
          >
            <FolderOpen size={16} /> Категорії
          </button>
        </div>

        {tab === "products" && (
          <div className="space-y-6">
            {!editing && (
              <button
                onClick={() => setEditing("new")}
                className="flex items-center gap-2 bg-[#2DC653] text-white px-4 py-2 rounded-lg font-semibold text-sm"
              >
                <Plus size={16} /> Додати товар
              </button>
            )}

            {editing && (
              <ProductForm
                categories={categories}
                initial={editing === "new" ? undefined : editing}
                onSave={() => { setEditing(null); load(); }}
                onCancel={() => setEditing(null)}
              />
            )}

            <div className="bg-white border border-[#D4DEE9] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] text-[#64748B]">
                  <tr>
                    <th className="text-left p-3">Назва</th>
                    <th className="text-left p-3">Категорія</th>
                    <th className="text-left p-3">Бейдж</th>
                    <th className="p-3 w-24" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-[#EEF2F8]">
                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3 text-[#64748B]">{categories.find((c) => c.id === p.category)?.nameUk}</td>
                      <td className="p-3">{p.badge}</td>
                      <td className="p-3">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => setEditing(p)} className="text-[#2DC653] text-xs font-semibold">Змінити</button>
                          <button onClick={() => removeProduct(p.id)} className="text-red-500"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "categories" && (
          <div className="space-y-6">
            <form onSubmit={addCategory} className="bg-white border border-[#D4DEE9] rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <label className="block text-sm">
                <span className="text-[#64748B]">Назва (UA) *</span>
                <input className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2" value={catUk} onChange={(e) => setCatUk(e.target.value)} required />
              </label>
              <label className="block text-sm">
                <span className="text-[#64748B]">Назва (EN)</span>
                <input className="mt-1 w-full border border-[#D4DEE9] rounded-lg px-3 py-2" value={catEn} onChange={(e) => setCatEn(e.target.value)} />
              </label>
              <button type="submit" className="bg-[#2DC653] text-white font-semibold py-2 rounded-lg h-[42px]">Додати категорію</button>
            </form>
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="bg-white border border-[#D4DEE9] rounded-xl divide-y divide-[#EEF2F8]">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{c.nameUk}</p>
                    <p className="text-sm text-[#64748B]">{c.nameEn} · <code className="text-xs">{c.id}</code></p>
                  </div>
                  <button onClick={() => removeCategory(c.id)} className="text-red-500"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
