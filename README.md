# 🚀 DSA Studio — Modern Data Structures & Algorithms Practice Tracker

**DSA Studio** is a full-stack, interactive Data Structures & Algorithms practice tracking web application built with **TanStack Start**, **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides a structured, roadmap-driven learning path spanning 22 core DSA topics from foundation to advanced competitive programming topics.

---

## ✨ Features

- **🗺️ 22 Categorized Roadmap Topics**:
  - **Foundation**: Math & Number Theory, Arrays, Strings, Hashing, Two Pointers, Sliding Window, Prefix Sum, Sorting.
  - **Intermediate**: Linked Lists, Stack & Queue, Binary Search, Recursion & Backtracking, Trees, Heap / Priority Queue, Greedy.
  - **Advanced**: Graphs (BFS/DFS & Node-Based), Dynamic Programming, Trie (Prefix Tree), Bit Manipulation, Matrix / 2D Grid, String Algorithms, Segment Tree & Fenwick Tree.

- **⚡ Dual Platform Practice**:
  - Full problem catalog featuring equivalent practice problems from **LeetCode** (LC) and **GeeksforGeeks** (GFG).
  - Clear platform badges (`LC` / `GFG`) and direct links to solve problems on either platform.

- **🧠 Classical Algorithmic Coverage**:
  - Includes core algorithm problems: **Dijkstra**, **Bellman-Ford**, **Floyd-Warshall**, **Prim's & Kruskal's MST**, **Disjoint Set Union (DSU)**, **Tarjan's SCC**, **Kosaraju's**, **KMP**, **Rabin-Karp**, **Z-Algorithm**, **Kadane's**, **0/1 & Unbounded Knapsack**, **LIS**, **LCS**, **Matrix Chain Multiplication**, and **Bitmask DP**.

- **📊 Progress & Tracking Tools**:
  - **Completion Checkboxes**: Track completed problems with persistent state.
  - **Revision Queue**: Flag tricky problems for spaced repetition and revision.
  - **Bookmarks**: Star key problems for quick access.
  - **Global Search**: Filter problems, topics, and patterns instantly across the whole catalog.

- **🎨 Modern Dark Aesthetics**:
  - Built with a sleek dark theme, responsive layout, smooth micro-interactions, and accessible Radix UI primitives.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework & SSR** | [TanStack Start](https://tanstack.com/router/latest) (`@tanstack/react-start`) |
| **Routing** | [TanStack Router](https://tanstack.com/router/latest) (`@tanstack/react-router`) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Bundler & Server** | [Vite](https://vitejs.dev/) & [Nitro](https://nitro.unjs.io/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |

---

## 📁 Project Structure

```text
dsa-studio/
├── public/                # Static assets (favicons, icons)
├── src/
│   ├── components/        # React UI components (Sidebar, Tables, Badges, Accordions)
│   │   └── ui/            # Radix UI primitives & styled components
│   ├── data/              # Canonical DSA datasets & problem mappings
│   │   ├── dsa-topics.ts        # Foundational topics dataset
│   │   ├── problems.ts          # Core catalog, problem mapping & deduplication
│   │   ├── remaining-topics.ts  # Intermediate & advanced topics dataset
│   │   └── roadmap.ts           # 22-topic roadmap ordering & metadata
│   ├── hooks/             # Custom React hooks (mobile detection, responsive UI)
│   ├── lib/               # Local persistence store, search context & utilities
│   ├── routes/            # TanStack Router file-based pages
│   │   ├── __root.tsx     # Root application layout shell
│   │   ├── index.tsx      # Dashboard & roadmap overview
│   │   ├── topics.$slug.tsx # Individual topic detail pages
│   │   ├── practice.tsx   # All-problems practice view
│   │   ├── progress.tsx   # Topic progress analytics
│   │   ├── bookmarks.tsx  # Starred problem list
│   │   └── revision.tsx   # Flagged revision queue
│   ├── router.tsx         # Router configuration
│   ├── server.ts         # Nitro server entrypoint
│   └── styles.css         # Tailwind & custom CSS variables
├── package.json           # Scripts & dependencies
├── vite.config.ts         # Vite & TanStack plugin configuration
└── tsconfig.json          # TypeScript compiler options
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0+ (v20+ recommended) or **Bun**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KanishJebaMathewM/dsa-studio.git
   cd dsa-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

### Development Server

Start the local development server with HMR:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) (or the URL printed in terminal) in your browser.

---

## 📦 Building for Production

To compile TypeScript and build the production bundle:

```bash
npm run build
```

To preview the built production output locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Vercel

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. Import your repository on [Vercel](https://vercel.com).
3. Configure the deployment settings:
   - **Framework Preset**: Auto-detected (Vite / Other)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public`
4. Click **Deploy**.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
