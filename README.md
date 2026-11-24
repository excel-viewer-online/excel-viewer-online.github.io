<div align="center">

# 📊 Excel Viewer Online

### Fast, Secure & Free In-Browser Spreadsheet & CSV Viewer & Editor

[![Live Demo](https://img.shields.io/badge/Live_App-excel--viewer--online.github.io-2563EB?style=for-the-badge&logo=github)](https://excel-viewer-online.github.io/)
[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![AG Grid](https://img.shields.io/badge/AG_Grid_v36-0099FF?style=for-the-badge&logo=table&logoColor=white)](https://www.ag-grid.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Buy Me A Coffee on Gumroad](https://img.shields.io/badge/Gumroad-Buy%20Me%20A%20Coffee-ff90e8?style=for-the-badge&logo=gumroad&logoColor=black)](https://kisharadilshan.gumroad.com/coffee)

**Open, inspect, sort, filter, and edit `.xlsx`, `.xls`, and `.csv` files directly in your web browser with enterprise-grade grid performance.**  
*100% Client-Side Processing • Zero Server Uploads • Complete Data Confidentiality • Fully Offline Capable*

[**Launch Web App →**](https://excel-viewer-online.github.io/) · [**Report Issue**](https://github.com/excel-viewer-online/excel-viewer-online.github.io/issues) · [**Support the Developer ☕**](https://kisharadilshan.gumroad.com/coffee)

</div>

---

## ✨ Overview

**Excel Viewer Online** ([`excel-viewer-online.github.io`](https://excel-viewer-online.github.io/)) is a privacy-first spreadsheet tool designed to eliminate the security risks of uploading sensitive financial, business, or personal data to remote servers.

Built with **Astro** and **React**, the application ingests spreadsheets directly into local browser memory. Leveraging **SheetJS (xlsx)**, **PapaParse**, and **AG Grid Community v36**, users can instantly view, edit, filter, and export datasets without installing Microsoft Office, desktop software, or browser plugins.

---

## 🚀 Key Features

- **🔒 100% Client-Side Privacy:** Files are parsed purely in-memory using the browser's HTML5 FileReader API. No data, telemetry, or file contents are ever uploaded to any backend server.
- **⚡ Enterprise Data Grid (AG Grid Community v36):** Virtualized DOM rendering delivers butter-smooth scrolling across thousands of rows. Features include multi-column sorting, column resizing, interactive filtering, and cell editing.
- **📁 Multi-Format Ingestion:** Seamless drag-and-drop or file browser support for:
  - Microsoft Excel OpenXML (`.xlsx`)
  - Legacy Excel (`.xls`)
  - Comma-Separated Values (`.csv`)
- **✏️ In-Browser Data Editing:** Double-click or select any cell to edit data inline in real time.
- **💾 One-Click Instant Export:** Export modified spreadsheets back to `.xlsx` or `.csv` format immediately with preserved column schemas.
- **📴 100% Offline Capable:** Once loaded, disconnect from the internet and the application continues to run without interruption.
- **📱 Responsive & Accessible Design:** Fully responsive layout with keyboard accessibility, ARIA landmark labels, and high-contrast indicators.
- **🔍 100/100 Technical SEO:** Structured Data (Schema.org `SoftwareApplication` + `HowTo`), Canonical URL, Open Graph social meta tags, Twitter Cards, auto-generated XML Sitemap, and `robots.txt`.

---

## 🏗️ Architectural Pattern

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | **Astro (SSG)** | High-speed static shell delivery, asset optimization, and SEO metadata injection. |
| **Interactive Island** | **React 19 (`client:only="react"`)** | Encapsulates spreadsheet state, drag-and-drop ingestion, grid rendering, and export flows. |
| **Data Grid Engine** | **AG Grid Community v36** | High-performance virtualized grid with `themeAlpine`, column definitions, sorting, and cell editors. |
| **Parsers & Serializers** | **SheetJS (`xlsx`) & PapaParse** | In-memory binary parsing for Excel workbooks and RFC-4180 compliant CSV stream parsing. |
| **Styling & UI** | **Tailwind CSS + PostCSS** | Modern utility-first responsive interface with custom SVG iconography and Lucide icons. |

---

## 🔍 Technical SEO & Schema Verification

The site achieves a verified **100/100 Technical SEO Score**:
- **JSON-LD Schema Markup:**
  - `SoftwareApplication`: Defines application category, pricing ($0 free offer), operating system, and URL.
  - `HowTo`: Outlines step-by-step instructions for search rich snippets (Drop file → View/Edit → Export).
- **Social Sharing Cards:** Configured with Open Graph (`og:image`, `og:title`, `og:description`, `og:url`) and Twitter Summary Large Image cards using Cloudinary CDN assets.
- **Sitemap & Robots:** Automated sitemap generation via `@astrojs/sitemap` (`sitemap-index.xml`) linked in `robots.txt`.
- **Accessibility & ARIA:** Dedicated `role="button"`, `role="alert"`, descriptive `aria-label` tags, and `aria-hidden` attributes for assistive technologies.

---

## 📂 Project Structure

```text
excel-viewer-online.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages automated CI/CD deployment
├── public/
│   ├── favicon.svg                 # Scalable spreadsheet favicon
│   └── robots.txt                  # Search crawler directives & sitemap reference
├── src/
│   ├── components/
│   │   └── SpreadsheetApp.jsx      # Core React Island: Drag/Drop, AG Grid, Export
│   ├── layouts/
│   │   └── Layout.astro            # Document shell, Google Analytics, SEO, OpenGraph
│   ├── pages/
│   │   └── index.astro             # Landing page with HowTo & Privacy Guarantee
│   └── styles/
│       └── global.css              # Global styles & Tailwind directives
├── astro.config.mjs                # Astro configuration & sitemap integration
├── package.json                    # Dependencies & build scripts
├── postcss.config.mjs              # PostCSS configuration for Tailwind CSS
├── tailwind.config.mjs             # Tailwind design tokens
└── tsconfig.json                   # TypeScript configuration
```

---

## 🛠️ Local Development & Build

### Prerequisites
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### 1. Clone the Repository
```bash
git clone https://github.com/excel-viewer-online/excel-viewer-online.github.io.git
cd excel-viewer-online.github.io
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 4. Build Production Static Site
```bash
npm run build
```
Generates production-ready static assets in the `./dist/` directory, including minified JavaScript and `sitemap-index.xml`.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🚢 Deployment (GitHub Pages)

The project is continuously deployed to GitHub Pages via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. Commits pushed to the `main` branch trigger the automated workflow.
2. The `withastro/action@v6` action installs dependencies, executes `astro build`, and uploads static pages.
3. The `actions/deploy-pages@v4` action deploys the build artifact to `https://excel-viewer-online.github.io/`.

---

## ☕ Support the Developer

If **Excel Viewer Online** is helpful for your workflow or projects, consider supporting ongoing maintenance and development:

[![Buy Me A Coffee on Gumroad](https://img.shields.io/badge/Gumroad-Buy%20Me%20A%20Coffee-ff90e8?style=for-the-badge&logo=gumroad&logoColor=black)](https://kisharadilshan.gumroad.com/coffee)

- **Support Link:** [https://kisharadilshan.gumroad.com/coffee](https://kisharadilshan.gumroad.com/coffee)

---

## 📄 License

This project is licensed under the **MIT License**. Free for personal and commercial use.
