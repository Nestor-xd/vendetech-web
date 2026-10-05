'use client';

import { useState, type FormEvent } from 'react';
import {
  ShoppingBag,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Smartphone,
  Store,
  Trash2,
  Plus,
  Minus,
  HelpCircle,
  Check,
  DollarSign,
  RefreshCw,
} from 'lucide-react';

/* ----------------------------- Configuración ----------------------------- */
const WHATSAPP_NUMBER = '573213154014';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Nestor,%20estoy%20en%20la%20feria%20y%20quiero%20conocer%20VendeTech`;

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
};

type CartItem = {
  key: string;
  id: number;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Tenis Urbanos Cúcuta',
    price: 120000,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    sizes: ['37', '38', '39', '40', '41'],
  },
  {
    id: 2,
    name: 'Sandalia Casual Cuero',
    price: 85000,
    image:
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80',
    sizes: ['35', '36', '37', '38'],
  },
  {
    id: 3,
    name: 'Botín Clásico Café',
    price: 165000,
    image:
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
    sizes: ['38', '39', '40', '41', '42'],
  },
];

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

/* ------------------------------- Componente ------------------------------ */
export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    negocio: '',
    propietario: '',
    telefono: '',
    producto: '',
  });

  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.qty * i.price, 0);

  const getSize = (p: Product) => selectedSizes[p.id] ?? p.sizes[0];

  const addToCart = (p: Product) => {
    const size = getSize(p);
    const key = `${p.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        { key, id: p.id, name: p.name, size, price: p.price, qty: 1, image: p.image },
      ];
    });
    setCartOpen(true);
  };

  const changeQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const removeItem = (key: string) =>
    setCart((prev) => prev.filter((i) => i.key !== key));

  const simulateOrder = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map(
        (i) =>
          `• ${i.qty} x ${i.name} (Talla ${i.size}) — ${formatCOP(i.qty * i.price)}`,
      )
      .join('\n');
    const msg = `🛍️ NUEVO PEDIDO — Boutique Demo\n\n${lines}\n\n💰 TOTAL: ${formatCOP(
      totalPrice,
    )}\n💳 Pago: PSE / Nequi (confirmado)\n\n📍 Despacho: Cra 5 #12-34, Barrio Centro, Cúcuta\n -Cliente: María Pérez\n- Tel: 300 123 4567`;
    setOrderMessage(msg);
    setCartOpen(false);
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = `Hola Néstor, estoy en la feria y quiero cotizar mi tienda con VendeTech.\n\n- Negocio: ${form.negocio}\n- Propietario: ${form.propietario}\n- Teléfono: ${form.telefono}\n- Productos que vendo: ${form.producto}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100';

  return (
    <div className="min-h-screen scroll-smooth bg-slate-50 text-slate-900">
      {/* ------------------------------ NAVBAR ------------------------------ */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg shadow-emerald-700/30">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-tight sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Vende<span className="text-emerald-700">Tech</span>
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                Software a la Medida · Cúcuta
              </span>
            </div>
          </div>
          <a
            id="nav-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-800 hover:shadow-lg active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Escríbenos por WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </nav>
      </header>

      <main>
        {/* ------------------------------- HERO ------------------------------ */}
        <section className="relative overflow-hidden bg-slate-900 text-white">
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                🚀 Tu negocio abierto 24/7 sin intermediarios
              </span>
              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                ¿Aún vendes por WhatsApp{' '}
                <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  respondiendo foto por foto?
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
                Desarrollamos la tienda web propia de tu negocio local. Automatiza
                pedidos, recibe pagos directos por PSE/Nequi y mantén tu inventario
                sincronizado sin pagar comisiones en dólares.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  id="cta-demo"
                  href="#demo"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-lg font-bold text-slate-900 shadow-xl shadow-emerald-500/25 transition hover:bg-emerald-400 active:scale-95 sm:w-auto"
                >
                  Probar Demo en Vivo
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
                <a
                  id="cta-cotizar"
                  href="#contacto"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur transition hover:bg-white/15 active:scale-95 sm:w-auto"
                >
                  Cotizar mi Tienda
                </a>
              </div>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: <DollarSign className="h-6 w-6" />,
                  title: '0% Comisiones en USD',
                  text: 'Todo en pesos colombianos (COP).',
                },
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: 'Soporte Humano Directo',
                  text: 'Asistencia técnica local y en español, sin bots ni tickets.',
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: '100% Personalizado',
                  text: 'Apartados, ventas por mayor y catálogo adaptado a tu operativa.',
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-slate-300">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- COMPARATIVA --------------------------- */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                El dolor de vender hoy vs. <span className="text-emerald-700">VendeTech</span>
              </h2>
              <p className="mt-3 text-slate-600">
                Compara tus opciones y elige la que realmente es para tu negocio.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {/* SaaS */}
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-600">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Plataformas SaaS</h3>
                <p className="text-sm text-slate-500">Shopify / Wix</p>
                <ul className="mt-5 space-y-3 text-slate-700">
                  {[
                    'Facturación en dólares',
                    'Plantillas rígidas',
                    'Comisiones por cada venta',
                    'Soporte en inglés por tickets',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                        ✕
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>

              {/* Chat */}
              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-600">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Atención manual por Chat</h3>
                <p className="text-sm text-slate-500">Lo que haces hoy</p>
                <ul className="mt-5 space-y-3 text-slate-700">
                  {[
                    'Saturación de mensajes',
                    'Pedidos perdidos de noche',
                    'Descontrol de inventario',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                        ✕
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>

              {/* VendeTech */}
              <article className="relative rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-8 text-white shadow-2xl shadow-emerald-900/30 lg:-translate-y-3">
                <span className="absolute -top-3 right-6 rounded-full bg-emerald-300 px-3 py-1 text-xs font-extrabold text-emerald-900">
                  RECOMENDADO
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">VendeTech</h3>
                <p className="text-sm text-emerald-200">Hecho en Cúcuta, para Cúcuta</p>
                <ul className="mt-5 space-y-3">
                  {[
                    'Desarrollo propio a medida',
                    'Pasarelas locales (PSE, Nequi)',
                    'Atención humana 24/7',
                    'Tarifa en pesos colombianos',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ------------------------------- DEMO ------------------------------ */}
        <section id="demo" className="scroll-mt-20 bg-emerald-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  <Smartphone className="h-3.5 w-3.5" /> Demo en vivo en el stand
                </span>
                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                  Prueba cómo compraría tu cliente
                </h2>
                <p className="mt-2 max-w-xl text-slate-600">
                  Boutique de calzado de ejemplo. Agrega productos, ajusta cantidades y
                  simula el pedido que recibirías por WhatsApp.
                </p>
              </div>
              <button
                id="open-cart"
                onClick={() => setCartOpen(true)}
                className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-800 active:scale-95"
              >
                <ShoppingBag className="h-5 w-5" />
                Mi carrito
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-xs font-bold text-slate-900">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="mt-1 text-2xl font-black text-emerald-700">
                      {formatCOP(p.price)}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Talla
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.sizes.map((s) => {
                        const active = getSize(p) === s;
                        return (
                          <button
                            key={s}
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [p.id]: s }))
                            }
                            className={`h-9 min-w-9 rounded-lg border px-2 text-sm font-semibold transition ${active
                              ? 'border-emerald-700 bg-emerald-700 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-600'
                              }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      id={`add-to-cart-${p.id}`}
                      onClick={() => addToCart(p)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 font-bold text-white transition hover:bg-emerald-800 active:scale-95"
                    >
                      <Plus className="h-4 w-4" /> Añadir al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- CÓMO FUNCIONA ------------------------- */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Cómo funciona
              </h2>
              <p className="mt-3 text-slate-600">
                De tu mostrador a tu tienda online en tres pasos.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  n: 1,
                  icon: <HelpCircle className="h-6 w-6" />,
                  title: 'Diagnóstico comercial',
                  text: 'Analizamos tu inventario y la forma en que vendes hoy.',
                },
                {
                  n: 2,
                  icon: <Zap className="h-6 w-6" />,
                  title: 'Programación a medida',
                  text: 'Construimos tu tienda con tu marca, tus reglas y tus pagos locales.',
                },
                {
                  n: 3,
                  icon: <RefreshCw className="h-6 w-6" />,
                  title: 'Capacitación, lanzamiento y soporte',
                  text: 'Te enseñamos a usarla, la lanzamos y te acompañamos cada mes.',
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="relative rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:border-emerald-500 hover:shadow-lg"
                >
                  <span className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-lg font-black text-white shadow-lg">
                    {s.n}
                  </span>
                  <div className="mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-slate-600">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ CONTACTO ---------------------------- */}
        <section id="contacto" className="scroll-mt-20 bg-slate-900 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <div className="text-center text-white">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Cotiza tu tienda hoy mismo
              </h2>
              <p className="mt-3 text-slate-300">
                Déjanos tus datos y te atendemos de inmediato por WhatsApp.
              </p>
            </div>
            <form
              onSubmit={submitForm}
              className="mt-10 space-y-5 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <div>
                <label htmlFor="negocio" className="mb-1.5 block text-sm font-semibold">
                  Nombre del negocio
                </label>
                <input
                  id="negocio"
                  required
                  value={form.negocio}
                  onChange={(e) => setForm({ ...form, negocio: e.target.value })}
                  placeholder="Ej: Calzado El Paso"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="propietario" className="mb-1.5 block text-sm font-semibold">
                  Nombre del propietario
                </label>
                <input
                  id="propietario"
                  required
                  value={form.propietario}
                  onChange={(e) => setForm({ ...form, propietario: e.target.value })}
                  placeholder="Tu nombre completo"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="telefono" className="mb-1.5 block text-sm font-semibold">
                  Teléfono de contacto
                </label>
                <input
                  id="telefono"
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="300 000 0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="producto" className="mb-1.5 block text-sm font-semibold">
                  Tipo de producto que vendes
                </label>
                <input
                  id="producto"
                  required
                  value={form.producto}
                  onChange={(e) => setForm({ ...form, producto: e.target.value })}
                  placeholder="Ropa, calzado, accesorios, alimentos..."
                  className={inputClass}
                />
              </div>
              <button
                id="submit-contacto"
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-emerald-800 active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar y hablar por WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ------------------------------ FOOTER ------------------------------ */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-slate-200">
          VendeTech | Proyecto de Ingeniería de Software — FESC San José de Cúcuta
        </p>
        <p className="mt-1">Desarrollado por Néstor Iván Granados Valenzuela</p>
      </footer>

      {/* ----------------------------- CART DRAWER -------------------------- */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}
      <aside
        aria-hidden={!cartOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <ShoppingBag className="h-5 w-5 text-emerald-700" /> Tu carrito
          </h3>
          <button
            onClick={() => setCartOpen(false)}
            className="rounded-full px-3 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100"
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
              <ShoppingBag className="mb-3 h-12 w-12 text-slate-300" />
              Tu carrito está vacío. ¡Añade un producto!
            </div>
          ) : (
            cart.map((i) => (
              <div
                key={i.key}
                className="flex gap-4 rounded-2xl border border-slate-200 p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={i.image}
                  alt={i.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold leading-tight">{i.name}</p>
                  <p className="text-sm text-slate-500">Talla {i.size}</p>
                  <p className="font-bold text-emerald-700">{formatCOP(i.price * i.qty)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => changeQty(i.key, -1)}
                      aria-label="Restar"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center font-bold">{i.qty}</span>
                    <button
                      onClick={() => changeQty(i.key, 1)}
                      aria-label="Sumar"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeItem(i.key)}
                      aria-label="Eliminar"
                      className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-slate-200 p-5">
          <div className="mb-4 flex items-center justify-between text-lg">
            <span className="font-semibold text-slate-600">Total</span>
            <span className="text-2xl font-black text-slate-900">
              {formatCOP(totalPrice)}
            </span>
          </div>
          <button
            id="simulate-order"
            onClick={simulateOrder}
            disabled={cart.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-4 font-bold text-white transition hover:bg-emerald-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <MessageCircle className="h-5 w-5" />
            Simular Pedido por WhatsApp
          </button>
        </div>
      </aside>

      {/* ----------------------------- ORDER MODAL -------------------------- */}
      {orderMessage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
          onClick={() => setOrderMessage(null)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 bg-emerald-700 p-5 text-white">
              <CheckCircle2 className="h-7 w-7" />
              <div>
                <p className="font-bold">¡Pedido recibido!</p>
                <p className="text-sm text-emerald-100">
                  Así le llega al comerciante, automáticamente
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 p-5">
              <div className="rounded-2xl rounded-tl-none bg-white p-4 shadow">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800">
                  {orderMessage}
                </pre>
                <p className="mt-2 flex items-center justify-end gap-1 text-xs text-slate-400">
                  Ahora <Check className="h-3 w-3 text-emerald-600" />
                  <Check className="-ml-2 h-3 w-3 text-emerald-600" />
                </p>
              </div>
            </div>
            <div className="p-5">
              <button
                onClick={() => {
                  setOrderMessage(null);
                  setCart([]);
                }}
                className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-800 active:scale-95"
              >
                Entendido, reiniciar demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
