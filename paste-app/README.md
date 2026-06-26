# Paste App

A modern, client-side paste manager for creating, organizing, and sharing text snippets. Built with React and Redux, Paste App keeps your notes in the browser with a clean, code-editor-inspired UI.

---

## Features

- **Create & edit pastes** — Add a title and body, then save or update in one click
- **Browse all pastes** — View every saved paste in a searchable list
- **Search** — Filter pastes by title in real time
- **Read-only view** — Open any paste at `/pastes/:id` for a focused reading experience
- **Quick actions** — Edit, view, delete, copy content, or copy a shareable link from the list
- **Clipboard support** — Copy paste content directly from the editor or list
- **Persistent storage** — Pastes are saved to `localStorage` and survive page reloads
- **Toast notifications** — Instant feedback for create, update, delete, and copy actions

---

## Tech Stack

| Category        | Technology              |
| --------------- | ----------------------- |
| UI              | React 19                |
| Build tool      | Vite 7                  |
| Styling         | Tailwind CSS 4          |
| State           | Redux Toolkit           |
| Routing         | React Router DOM 7      |
| Notifications   | React Hot Toast         |
| Data persistence| Browser `localStorage`  |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd paste-app

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
paste-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Home.jsx        # Create & edit pastes
│   │   ├── Paste.jsx       # List, search, and manage pastes
│   │   ├── ViewPaste.jsx   # Read-only paste view
│   │   └── Navbar.jsx      # App navigation
│   ├── redux/
│   │   └── pasteSlice.js   # Redux slice & localStorage sync
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # App entry & providers
│   ├── store.js            # Redux store configuration
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## Routes

| Path            | Description                                      |
| --------------- | ------------------------------------------------ |
| `/`             | Home — create a new paste or edit via `?pasteId=` |
| `/pastes`       | All pastes — search, edit, delete, share         |
| `/pastes/:id`   | View a single paste (read-only)                  |

---

## How It Works

1. **Create** — Enter a title and content on the home page, then click **Create My Paste**.
2. **Manage** — Go to **Pastes** to search, edit, delete, copy, or share any entry.
3. **Edit** — Click the edit icon to return to the home page with the paste pre-filled.
4. **Share** — Use the share icon to copy a direct link (`/pastes/:id`) to the clipboard.

State is managed with Redux Toolkit. Every create, update, or delete action syncs to `localStorage` under the key `pastes`.

---

## Available Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start the development server   |
| `npm run build` | Build for production           |
| `npm run preview` | Preview the production build |
| `npm run lint`  | Run ESLint                     |

---

## License

ISC
