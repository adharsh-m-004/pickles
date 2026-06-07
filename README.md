<div align="center">

<img src="public/logo.png" alt="Granny's Kerala Pickle Shop" width="120" />

# 🫙 Granny's Kerala Pickle Shop

### *Ancestral flavours. Digital soul.*

A full-stack e-commerce experience built with **Next.js 15**, designed to the grain of a Kerala *Tharavadu* — tactile, editorial, and deeply rooted in tradition.

[![TypeScript](https://img.shields.io/badge/TypeScript-60%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

---

## ✨ What Is This?

Granny's Kerala Pickle Shop is a handcrafted e-commerce storefront that sells traditional Kerala pickles — *manga achar*, *naranga achar*, *irachi achar* and more — the way Grandma made them, now delivered to your doorstep.

The UI rejects cold, sterile digital design in favour of something that feels physical: **paper grain textures**, **glass jar product cards**, **jute-twine dividers**, and **wooden CTA buttons** that look like they were carved from a teak shelf in a *nalukettu* home.

> *"Not just a shop. A memory you can taste."*

---

## 🖼️ Screenshots

| Landing Page | Shopping Cart |
|---|---|
| *(coming soon)* | *(coming soon)* |

| User Dashboard | Login / Register |
|---|---|
| *(coming soon)* | *(coming soon)* |

---

## 🗺️ Sitemap

| Page | Route | Status |
|---|---|---|
| 🏠 Landing Page | `/` | ✅ Live |
| 🛒 Shopping Cart | `/cart` | 🔨 In Progress |
| 👤 User Dashboard | `/dashboard` | 🔨 In Progress |
| 🔐 Login / Register | `/login` | 🔨 In Progress |

---

## 🎨 Design System

The visual language is drawn entirely from **Kerala's natural palette**:

| Token | Hex | Role |
|---|---|---|
| 🍃 Banana Leaf Green | `#4b6b3f` | Primary brand, active states |
| 🏺 Clay Pot Brown | `#8b4513` | Accents, headings |
| 🌶️ Spice Red | `#bb2927` | Warnings, FIRE tags |
| 📜 Parchment Cream | `#fff8ef` | Background canvas |
| 🪵 Wood Grain Brown | `#5d4037` | CTA buttons, jar lids |
| 🌿 Sage Grey | `#c3c8bc` | Borders, dividers |
| 🖊️ Charcoal | `#1e1b13` | Body text |

**Typography:** `Libre Caslon Text` (headlines) × `Plus Jakarta Sans` (UI)

---

## 🏗️ Project Structure

```
pickles/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── cart/               # Shopping cart
│   ├── dashboard/          # User dashboard
│   ├── login/              # Auth pages
│   └── mockData.ts         # Static data layer
│
├── components/             # Modular React components
│   ├── layout/             # Header, Footer
│   ├── landing/            # Hero, ProductCard, Carousel
│   ├── cart/               # CartItem, OrderSummary
│   ├── dashboard/          # OrderHistory, AccountDetails
│   └── auth/               # LoginForm, RegisterForm
│
├── backend/                # API routes / server logic
├── lib/                    # Utilities and helpers
├── public/                 # Static assets
└── .stitch/                # Design blueprints & screen exports
    ├── SITE.md
    ├── DESIGN.md
    └── designs/            # Exported HTML + PNG from Stitch
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/adharsh-m-004/pickles.git
cd pickles

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the shop.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Design Source | [Antigravity Stitch](https://www.antigravity.run/) |
| Fonts | Google Fonts (Libre Caslon Text, Plus Jakarta Sans) |
| Backend | Next.js API Routes |

---


## 🫙 Featured Products *(sample)*

- **Manga Achar** — Raw mango, mustard oil, and ten secret spices 🌶️🌶️🌶️
- **Naranga Achar** — Sun-dried lemon preserve, fermented for 6 months 🌶️🌶️
- **Irachi Achar** — Slow-cooked Kerala beef pickle, grandmother's recipe 🌶️🌶️🌶️🌶️
- **Pavakka Achar** — Bitter gourd in coconut vinegar, dangerously addictive 🌶️

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/add-new-pickle`
3. Commit your changes: `git commit -m 'feat: add pavakka achar product card'`
4. Push to the branch: `git push origin feature/add-new-pickle`
5. Open a Pull Request

---


<div align="center">

*Made with* ❤️ *and a generous amount of coconut oil*

**[⭐ Star this repo](https://github.com/adharsh-m-004/pickles)** if you love pickles

</div>
