# 🚀 TechFlow AI - Automated Tech News Platform

**TechFlow AI** is a high-performance, SEO-optimized digital magazine platform built with React, Vite, and Google Gemini AI. It is designed for maximum user engagement and AdSense revenue generation, featuring a localized "India Edition" content strategy.

![TechFlow AI Preview](https://via.placeholder.com/1200x600?text=TechFlow+AI+Dashboard)

## ✨ Key Features

### 🤖 AI-Powered Content Studio
- **Automated Journalism:** Generates full blog posts with H2/H3 tags, FAQs, and lists using Google Gemini 2.5 Flash.
- **SEO Optimization:** Auto-generates meta descriptions, trending tags, and high-CPC keywords.
- **Localized Engine:** Content is tailored for the Indian market (₹ INR currency, UPI references, Indian English).

### 🎨 World-Class Design
- **Magazine UI:** Modern "Bento Grid" layouts and Glassmorphism effects.
- **Mobile First:** Fully responsive design that looks like a native app.
- **Micro-interactions:** Smooth `fade-in-up` animations and magnetic hover effects.

### 💰 Monetization Ready
- **Strategic Ad Spots:** Pre-built slots for AdSense (Leaderboard, Skyscraper, In-Article, Sticky Sidebar).
- **High RPM Layout:** Optimized for viewability and Click-Through Rate (CTR).

### ⚡ Tech Stack
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (with Typography plugin)
- **AI Backend:** Google GenAI SDK (`@google/genai`)
- **Icons:** Lucide React

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Cloud Project with Gemini API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/techflow-ai.git
   cd techflow-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Your Google Gemini API Key
   API_KEY=your_actual_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🚀 Deployment

This project is configured for seamless deployment on **Vercel** or **Netlify**.

### Deploying to Vercel
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add your `API_KEY` in the **Environment Variables** settings in Vercel.
4. Click **Deploy**.

### Build Command
To create a production build locally:
```bash
npm run build
```
The output will be in the `dist/` folder.

---

## 📂 Project Structure

```
techflow-ai/
├── src/
│   ├── components/      # UI Components (ArticleView, AdUnit, etc.)
│   ├── services/        # API Logic (Gemini AI integration)
│   ├── types.ts         # TypeScript Interfaces
│   ├── App.tsx          # Main Application Logic
│   └── index.css        # Tailwind & Global Styles
├── index.html           # Entry point (CDN config for preview)
├── vite.config.ts       # Build configuration
└── tailwind.config.js   # Design system config
```

---

## 🛡️ Customization

### Changing the Niche
Open `services/geminiService.ts` and modify the `prompt` variable to change the persona (e.g., from "Indian Tech Editor" to "US Health Expert").

### Updating Ad Units
The `components/AdUnit.tsx` file contains the placeholder logic. Replace the placeholder `divs` with your actual Google AdSense `<script>` tags when going live.

---

## 📄 License

This project is open-source and available under the MIT License.
