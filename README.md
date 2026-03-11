# Zeely AI — Avatar Background Generation Sidebar

A React application implementing the **Change Background** sidebar flow from the Zeely AI test task. Users can open a slide-in panel, enter a text prompt, and simulate AI-powered avatar background generation with real-time progress feedback.

## Demo

Click **"Change background"** to open the sidebar, type or regenerate a prompt, then hit **"Generate BG for 1 credit"** to watch a simulated background generation with a circular progress indicator. Once complete, the result appears as a selectable thumbnail in the backgrounds grid.

## Tech Stack

- [React 19](https://react.dev/) — UI framework
- [TypeScript 5.8](https://www.typescriptlang.org/) — static typing
- [Vite 6](https://vite.dev/) — build tool & dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling (via `@tailwindcss/vite`)
- [Base UI (React)](https://base-ui.com/) — headless UI primitives (Dialog, Button)
- [Zustand 5](https://zustand.docs.pmnd.rs/) — lightweight state management
- [Lucide React](https://lucide.dev/) — icon library
- [ESLint 9](https://eslint.org/) — linting (flat config)
- [Prettier](https://prettier.io/) — code formatting
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) — pre-commit quality gate

## Prerequisites

- **Node.js** >= 20
- **npm** >= 10

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd zeely-ai-test-task

# 2. Install dependencies (also sets up Husky git hooks via the `prepare` script)
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

```bash
npm run dev            # Start Vite dev server with HMR
npm run build          # Type-check with tsc and build for production
npm run preview        # Preview the production build locally
npm run lint           # Run ESLint on the entire project
npm run lint:fix       # Run ESLint with auto-fix
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without writing
```

## Project Structure

```
src/
├── assets/
│   ├── fonts/                        # Italian Plate No2 Expanded (.ttf, 4 weights)
│   └── icons/                        # Custom SVG icon components
│       ├── sparkles.tsx
│       └── sparkles-generate.tsx
├── components/
│   ├── change-background-sidebar/    # Main feature
│   │   ├── change-background-sidebar.tsx   # Sidebar shell (Sheet wrapper)
│   │   ├── prompt-editor.tsx               # Textarea + Regenerate / Undo / Redo
│   │   ├── generate-button.tsx             # "Generate BG for 1 credit" CTA
│   │   ├── generating-thumbnail.tsx        # Progress ring during generation
│   │   ├── completed-thumbnail.tsx         # Selectable image thumbnail
│   │   ├── constants.ts                    # Shared thumbnail classes
│   │   └── index.ts                        # Barrel export
│   └── ui/                           # Reusable UI primitives
│       ├── button.tsx                      # Button (Base UI wrapper)
│       ├── sheet.tsx                       # Slide-in dialog panel
│       └── index.ts
├── data/
│   └── mock-backgrounds.ts           # Preset prompts & placeholder images
├── lib/
│   └── utils.ts                      # cn() helper (clsx + tailwind-merge)
├── store/
│   └── use-background-store.ts       # Zustand store (state + actions)
├── types/
│   └── background.ts                 # BackgroundItem type definitions
├── App.tsx                            # Root component
├── main.tsx                           # Entry point
└── index.css                          # Tailwind imports, @font-face, theme tokens
```

## Architecture

### State Management

All sidebar state lives in a single Zustand store (`useBackgroundStore`):

- **`isOpen`** — sidebar visibility
- **`prompt` / `promptIndex`** — current prompt text and undo/redo cursor
- **`backgrounds`** — array of `GeneratingBackground | CompletedBackground` items
- **`selectedId`** — currently selected background

### Background Generation Flow

1. User clicks **"Generate BG for 1 credit"**
2. A `GeneratingBackground` item is prepended to the grid (0% progress)
3. A `setInterval` ticks progress by 5% every 250ms (~5 seconds total)
4. The `GeneratingThumbnail` component renders an animated SVG circular progress ring
5. At 100%, the item is replaced with a `CompletedBackground` carrying a random image URL
6. Closing the sidebar clears all running intervals and removes in-progress items

### UI Components

The sidebar is built as a composable `Sheet` component (slide-in dialog from the right) using `@base-ui/react Dialog` primitives. All styling is done with Tailwind CSS utility classes; no custom CSS beyond the base layer theme configuration.

## Code Quality

A pre-commit hook enforced by **Husky** runs **lint-staged** on every commit:

- `*.{ts,tsx}` files are linted with ESLint (`--fix`) and formatted with Prettier
- `*.{json,md,css,html}` files are formatted with Prettier

ESLint is configured with `eslint-config-prettier` to avoid rule conflicts.

### Prettier Config

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```
