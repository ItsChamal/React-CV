# React-CV
# 📄 CV Manager – Front‑End

A single-page React application that lets users **create, edit, view and delete CVs locally** while handling **authentication (Sign Up / Sign In / Forgot & Reset Password)** against a separate Express + MongoDB API.


---

## ✨ Key Features

| Domain | What it does | Where to look |
| ------ | ------------ | ------------- |
| **Authentication** | • Sign Up & Sign In <br>• “Remember me” token in `localStorage` <br>• Forgot / Reset password flows | `src/Pages/Auth/…` |
| **CV CRUD** | • Create, read, update, delete CVs <br>• Data stored **client‑side** in `localStorage` <br>• Form validation & Google‑Places powered address field | `src/Pages/Cv/…`, `src/Components/AddressInput.jsx` |
| **Dashboard** | At‑a‑glance list of existing CVs; guarded route (requires token) | `src/Pages/Dashboard.jsx` & route guards in `App.jsx` |
| **API client** | Very small wrapper that mimics Axios for localStorage ops **and** calls the real backend for auth | `src/api/axios.js` |
| **Responsive UI** | Tailwind CSS + Lucide icons; Vite for blazing‑fast dev‑server | everywhere |

---

## 🗺️ Project Structure
```text
reactCV
├─ public/                  # static assets
├─ src/
│  ├─ api/                  # Axios‑style helpers
│  ├─ Components/           # presentational + form components
│  ├─ Pages/
│  │   ├─ Auth/             # SignIn, SignUp, Forgot & Reset password
│  │   ├─ Cv/               # CvForm, CvList, CvView
│  │   └─ Dashboard.jsx
│  ├─ Utils/validators.js   # simple form validation helpers
│  ├─ App.jsx               # top‑level routes
│  └─ main.jsx              # React entry‑point
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node ≥ 18**
* A running copy of the **backend API** (default base‑url: `http://localhost:5000`)  
  > Only the auth routes are used by the front end:  
  > • **POST** `/api/auth/signup`  
  > • **POST** `/api/auth/signin`  
  > • **POST** `/api/auth/forgot-password`  
  > • **POST** `/api/auth/reset-password`

### 2. Install & run
```bash
# 1 – install deps
npm install

# 2 – start dev‑server (Vite, HMR, Tailwind JIT)
npm run dev

# 3 – open
# http://localhost:8080
```
> **Tip:** Vite’s port can be changed with the `--port` flag  
> `npm run dev -- --port 5173`

### 3. Production build
```bash
npm run build      # generates /dist
npm run preview    # serves the static build locally
```

---

## 🛠️ Environment Variables (optional)

If you need to hit a **remote** API or change the default port, create `.env` in `reactCV/`:
```bash
# .env
VITE_API_BASE_URL=https://your-api.example.com
```
…and tweak `src/Pages/Auth/*` fetch calls to read  
`import.meta.env.VITE_API_BASE_URL`

---

## 🧪 Testing the Flow Quickly
1. **Start backend API** (`npm start` in its repo)  
2. **Run the front end** `npm run dev`  
3. **Sign Up** with an email / password → credentials stored in MongoDB  
4. **Sign In** → JWT token saved in `localStorage` under `token`  
5. **Create a CV** → record lives in `localStorage` (key: `cvs`)  
6. Refresh – CV list persists; auth state persists.

---

## 🤝 Contributing
1. **Fork** the repo  
2. `git checkout -b feature/my-feature`  
3. **Commit** & **push**  
4. Open a **PR** against `main`

Please follow the existing ESLint & Prettier rules (VS Code will auto‑format on save).

---

## 📄 License
MIT – see [`LICENSE`](LICENSE) for details.

---

> Made with ❤️ using **React 18**, **Tailwind CSS** and **Vite 5**
