# 🚀 DSA Studio — Data Structures & Algorithms Practice Tracker

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/7MhyE48Au)
[![GitHub Stars](https://img.shields.io/github/stars/KanishJebaMathewM/DSA_Studio?style=for-the-badge&logo=github&color=blue)](https://github.com/KanishJebaMathewM/DSA_Studio/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/KanishJebaMathewM/DSA_Studio?style=for-the-badge&logo=github&color=blue)](https://github.com/KanishJebaMathewM/DSA_Studio/network/members)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**A modern, structured zero-to-hero Data Structures & Algorithms practice platform, tracker, and revision system.**

[Explore Problems](#-detailed-learning-roadmap) • [Features](#-core-features) • [Quickstart](#-getting-started) • [Contributing](#-contributing) • [Join Discord](#-community--discussion)

</div>

---

## 📢 Join Our Community

We have an active Discord server for discussing **DSA Studio**, sharing interview preparation strategies, collaborating on open-source projects, and helping each other grow!

<div align="center">

### 👉 **[Join the DSA Studio & Open Source Discord](https://discord.gg/7MhyE48Au)** 👈

[![Join Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/7MhyE48Au)

</div>

**Why join?**

- 💬 **DSA Discussions:** Ask questions, share problem solutions, and explore optimal time/space complexity approaches.
- 🤝 **Open-Source Collaboration:** Discuss issues, feature requests, and contribute to DSA Studio alongside fellow developers.
- 🚀 **Explore Other Projects:** Brainstorm, share, and collaborate on other exciting open-source initiatives and developer tools.
- 🎯 **Interview & Contest Prep:** Discuss contests on LeetCode, Codeforces, and AtCoder with a supportive peer group.

---

## 📖 Table of Contents

- [Overview & Mission](#-overview--mission)
- [System Architecture](#-system-architecture)
- [Core Features](#-core-features)
- [Detailed Learning Roadmap](#-detailed-learning-roadmap)
  - [Phase 1: Foundation Tier](#phase-1-foundation-tier)
  - [Phase 2: Intermediate Tier](#phase-2-intermediate-tier)
  - [Phase 3: Advanced Tier](#phase-3-advanced-tier)
- [Classical Algorithm Coverage](#-classical-algorithm-coverage)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
  - [Available Scripts](#available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Community & Discussion](#-community--discussion)
- [License](#-license)

---

## 🎯 Overview & Mission

When preparing for technical interviews or competitive programming, learners often face common hurdles:

- **Overwhelming volume:** Thousands of scattered problems without clear logical prerequisites.
- **Lack of continuity:** Jumping haphazardly between unrelated topics without solidifying core mental models.
- **Retention loss:** Forgetting solved problems due to the absence of spaced repetition and targeted revision.

**DSA Studio** solves this by providing a carefully curated, zero-to-hero learning progression across **22 foundational, intermediate, and advanced topic modules**. It unifies curated challenges from **LeetCode**, **GeeksforGeeks**, **CSES**, and **AtCoder**, paired with a persistent tracking and revision workflow.

---

## 🏗️ System Architecture

```
+-------------------------------------------------------------------------------+
|                             LEARNING PROGRESSION                              |
+-------------------------------------------------------------------------------+
|  1. FOUNDATION            |  2. INTERMEDIATE          |  3. ADVANCED          |
|  - Math & Number Theory   |  - Linked Lists           |  - Graphs (BFS/DFS)   |
|  - Arrays & Strings       |  - Stacks & Queues        |  - Dynamic Prog. (DP) |
|  - Hashing                |  - Binary Search          |  - Trie (Prefix Tree) |
|  - Two Pointers           |  - Recursion & Backtrack  |  - Bit Manipulation   |
|  - Sliding Window         |  - Trees & BST            |  - String Algorithms  |
|  - Prefix Sum & Diff Arr  |  - Heaps & Greedy         |  - Segment & Fenwick  |
|  - Sorting Algorithms     |                           |                       |
+---------------------------+---------------------------+-----------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                          MULTI-PLATFORM INTEGRATION                           |
|                                                                               |
|       [ LeetCode ]   +   [ GeeksforGeeks ]   +   [ CSES ]   +   [ AtCoder ]   |
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                          PROGRESS & REVISION ENGINE                           |
|                                                                               |
|   [ Checklist / Solved ]   |    [ Bookmarks ]    |    [ Spaced Revision ]     |
|   [ Topic Breakdown % ]    |    [ Difficulty ]   |    [ Local Persistence ]   |
+-------------------------------------------------------------------------------+
```

---

## ✨ Core Features

- **Instant Global Search & Autocomplete**: Real-time search popover in the top header indexing all topics and problems across the curriculum by title, difficulty, pattern, and phase, complete with keyboard shortcuts (`/` or `Ctrl+K` / `Cmd+K`) and strict viewport containment.
- **Structured 22-Topic Progression**: Progressive roadmap starting from elementary mathematics and two-pointer basics up to complex graph theory, dynamic programming, and range query trees.
- **Multi-Platform Integration**: Direct links to vetted problems on LeetCode and GeeksforGeeks, plus CSES and AtCoder challenge suites.
- **Revision Queue & Bookmarks**: Flag problems that need spaced repetition revisit. Maintain a custom list of bookmarked questions for quick reference before interview rounds.
- **Instant Search & Topic Filters**: Find problems by name, platform, pattern, or difficulty tag in real-time.
- **Local-First Privacy**: Progress is stored locally in your browser — no mandatory login, cookies, or cloud telemetry.
- **Responsive & Modern UI**: Built with React 19, Tailwind CSS v4, Lucide icons, and Radix UI components with complete Dark/Light mode support.

---

## 🗺️ Detailed Learning Roadmap

The curriculum is structured into 3 comprehensive tiers:

```
Foundation (Phases 1–8)  ──►  Intermediate (Phases 9–15)  ──►  Advanced (Phases 16–22)
```

### Phase 1: Foundation Tier

```
[Math & Number Theory] ──► [Arrays & Strings] ──► [Hashing]
                                                    │
                                                    ▼
[Sorting] ◄── [Prefix Sum] ◄── [Sliding Window] ◄── [Two Pointers]
```

1. **Math & Number Theory**: Prime factorization, Greatest Common Divisor (GCD/Euclidean), Modular Exponentiation, Sieve of Eratosthenes, and digit manipulation.
2. **Arrays**: In-place rotations, Kadane's algorithm, Dutch National Flag, interval manipulation, and missing number techniques.
3. **Strings**: Palindromes, anagrams, frequency arrays, character parsing, and string transformations.
4. **Hashing**: HashMap & HashSet internals, two-sum variations, subarray sum equals K, frequency counting, and cache patterns.
5. **Two Pointers**: Opposite-end pointers, fast & slow pointer strategy (Floyd's cycle), and sorted pair/triplet discovery.
6. **Sliding Window**: Fixed and dynamic window techniques, sliding window minimum/maximum, and hashmap-based variable windows.
7. **Prefix Sum & Difference Arrays**: 1D/2D range sum queries, difference array interval updates, and subsegment matching.
8. **Sorting**: Bubble, Selection, Insertion, Merge, Quick, Heap, and Counting Sort, custom comparators, and QuickSelect.

---

### Phase 2: Intermediate Tier

```
[Linked Lists] ──► [Stack & Queue] ──► [Binary Search]
                                              │
                                              ▼
[Greedy] ◄── [Heaps / Priority Queue] ◄── [Trees & BST] ◄── [Backtracking]
```

9. **Linked Lists**: Singly, doubly, and circular linked lists, cycle detection, in-place reversal, and K-group reversal.
10. **Stack & Queue**: Monotonic stack pattern (Next Greater Element), histogram max rectangle, min stack, and circular queue design.
11. **Binary Search**: Lower/upper bound, rotated array search, search on answer space (allocating pages, painter's partition).
12. **Recursion & Backtracking**: Recursion tree tracing, subsets, permutations, combinations, N-Queens, Sudoku solver, and grid exploration.
13. **Trees & Binary Search Trees**: Pre/In/Post/Level order traversals, height & diameter, view algorithms (top, bottom, left, right), LCA, BST validation, and balanced BST operations.
14. **Heap / Priority Queue**: Min-heap and max-heap implementations, Top-K elements, Median from Data Stream (two heaps), and K-way merge.
15. **Greedy Algorithms**: Interval scheduling, activity selection, fractional knapsack, gas station tour, and exchange argument reasoning.

---

### Phase 3: Advanced Tier

```
[Graphs] ──► [Dynamic Programming] ──► [Trie (Prefix Tree)]
                                             │
                                             ▼
[Segment & Fenwick Trees] ◄── [String Algorithms] ◄── [Matrix / Bitmasking]
```

16. **Graphs (BFS, DFS, & Connectivity)**: Adjacency structures, bipartite testing, topological sort (Kahn's), cycle detection, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim & Kruskal MST, Disjoint Set Union (DSU), and Tarjan's Strongly Connected Components (SCC).
17. **Dynamic Programming (DP)**: 1D linear DP, 2D Grid DP, 0/1 Knapsack, Unbounded Knapsack, Longest Common Subsequence (LCS), Longest Increasing Subsequence (LIS), Matrix Chain Multiplication (MCM), Palindromic DP, Tree DP, Bitmask DP, and Digit DP.
18. **Trie (Prefix Tree)**: Prefix matching, autocomplete, wildcards, bitwise XOR maximum pair search.
19. **Bit Manipulation**: Bitwise operations, single number extraction, subset generation via bitmasks, counting set bits (Kernighan's), and state compression.
20. **Matrix / 2D Grid**: In-place rotations, spiral matrix, word search in grid, flood fill, and island counting.
21. **Advanced String Algorithms**: Knuth-Morris-Pratt (KMP), Z-Algorithm, Rabin-Karp rolling hash, and Manacher's algorithm.
22. **Segment Tree & Fenwick Tree (BIT)**: Point updates, range sum/min/max queries, and lazy propagation.

---

## 🏛️ Classical Algorithm Coverage

| Category                  | Classical Algorithms Included                                                                         |
| :------------------------ | :---------------------------------------------------------------------------------------------------- |
| **Shortest Path**         | Dijkstra's Algorithm, Bellman-Ford, Floyd-Warshall                                                    |
| **Minimum Spanning Tree** | Kruskal's Algorithm, Prim's Algorithm, Disjoint Set Union (DSU)                                       |
| **Graph Traversal & SCC** | Breadth-First Search, Depth-First Search, Kahn's Topological Sort, Tarjan's SCC, Kosaraju's Algorithm |
| **String Matching**       | Knuth-Morris-Pratt (KMP), Rabin-Karp Rolling Hash, Z-Algorithm, Manacher's Algorithm                  |
| **Optimization & DP**     | Kadane's Algorithm, 0/1 Knapsack, Unbounded Knapsack, LIS, LCS, MCM, Bitmask DP                       |
| **Range Queries**         | Fenwick Tree (Binary Indexed Tree), Segment Tree with Lazy Propagation                                |

---

## 💻 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) with Nitro server runtime
- **Routing**: [TanStack Router](https://tanstack.com/router) (file-based, type-safe routes)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)

---

## 📁 Project Structure

```
DSA_Studio/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Radix-based UI building blocks
│   │   ├── AppHeader.tsx   # Top navigation header & search bar
│   │   ├── AppShell.tsx    # Responsive shell layout
│   │   ├── AppSidebar.tsx  # Topic navigation sidebar
│   │   ├── LevelAccordion.tsx
│   │   ├── ProblemTable.tsx
│   │   └── ProgressBar.tsx
│   ├── data/               # Curated DSA problem catalogs
│   │   ├── problems.ts     # Main dataset & types
│   │   ├── dsa-topics.ts   # Core topic definitions
│   │   ├── remaining-topics.ts
│   │   ├── roadmap.ts      # Topic roadmap hierarchy
│   │   └── roadmap-additions.ts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Contexts, stores, theme, & utilities
│   │   ├── progress-store.ts # LocalStorage progress sync
│   │   ├── search-context.ts
│   │   └── theme.ts
│   ├── routes/             # TanStack file-based routes
│   │   ├── __root.tsx      # App shell layout route
│   │   ├── index.tsx       # Dashboard
│   │   ├── practice.tsx    # Practice catalog
│   │   ├── bookmarks.tsx   # Saved problems
│   │   ├── revision.tsx    # Spaced repetition queue
│   │   ├── progress.tsx    # Analytics & completion stats
│   │   └── topics.$slug.tsx# Individual topic view
│   ├── router.tsx          # Router instantiation
│   └── styles.css          # Global styling & Tailwind rules
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- Package manager: `npm`, `bun`, or `pnpm`

### Installation & Local Run

This project does not have a separate API server or database to start. The
TanStack Start/Nitro server is part of the app, so one development command runs
both the frontend and its server-side runtime. User progress is saved in the
browser's local storage.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KanishJebaMathewM/DSA_Studio.git
   cd DSA_Studio
   ```

2. **Install dependencies:**

   ```bash
   npm ci
   # or
   bun install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in your browser:**
   Open the URL printed in the terminal. With the current configuration, it is
   `http://127.0.0.1:8080/`.

To stop the app, press `Ctrl+C` in the terminal running the development server.

### Available Scripts

| Script            | Purpose                                            |
| :---------------- | :------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with hot-reload |
| `npm run build`   | Builds the client and server output for production |
| `npm run preview` | Previews the production build locally              |
| `npm run lint`    | Runs ESLint across the codebase                    |
| `npm run format`  | Formats all files using Prettier                   |

---

## 🚀 Deployment

### Vercel Deployment

1. Import the repository into your Vercel Dashboard.
2. Configure project settings:
   - **Framework Preset**: Other / Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public`
3. Click **Deploy**.

---

## 🤝 Contributing

Contributions are warmly welcomed! Whether you want to add new curated problems, fix broken problem links, enhance problem descriptions, or improve the UI, here is how you can get started:

### Adding New Problems

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/DSA_Studio.git
   cd DSA_Studio
   ```
3. **Edit the problem catalogs** in `src/data/problems.ts` or `src/data/dsa-topics.ts`:
   ```typescript
   p(
     "unique-problem-slug",
     "Problem Title",
     "https://leetcode.com/problems/your-problem-slug/",
     "LeetCode", // or "GFG" / "CSES" / "AtCoder"
     "Medium", // "Easy" | "Medium" | "Hard"
   );
   ```
4. **Test your changes** locally:
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit and push** to your fork:
   ```bash
   git checkout -b feat/add-topic-problems
   git commit -m "feat: add [Problem Name] to [Topic]"
   git push origin feat/add-topic-problems
   ```
6. **Open a Pull Request** to the `main` branch of `https://github.com/KanishJebaMathewM/DSA_Studio`.

> 💡 **Tip:** Have questions or want to discuss an idea before opening a PR? Join our [Discord community](https://discord.gg/7MhyE48Au) and talk directly with the maintainers and contributors!

---

## 💬 Community & Discussion

Join our growing community of developers, competitive programmers, and open-source contributors!

<div align="center">

[![Discord Banner](https://img.shields.io/badge/Discord-Connect%20on%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/7MhyE48Au)

</div>

- **Discord Server:** [https://discord.gg/7MhyE48Au](https://discord.gg/7MhyE48Au)
- **What we do on Discord:**
  - 💬 **DSA & Algorithm Discussion:** Clarify algorithmic intuition, discuss time/space complexity, and solve tricky edge cases together.
  - 🛠️ **Project Collaboration:** Discuss DSA Studio's roadmap, request new features, report bugs, and coordinate pull requests.
  - 🌐 **Open-Source Networking:** Share, discuss, and collaborate on other open-source projects, developer tools, and portfolios.
  - 💼 **Interview & Coding Contest Prep:** Discuss active LeetCode, Codeforces, and AtCoder contests and share technical interview experiences.
- **GitHub Discussions & Issues:** [GitHub Issues](https://github.com/KanishJebaMathewM/DSA_Studio/issues)
- **Repository:** [https://github.com/KanishJebaMathewM/DSA_Studio](https://github.com/KanishJebaMathewM/DSA_Studio)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
