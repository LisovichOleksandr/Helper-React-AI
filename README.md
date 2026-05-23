# AI Helper App

A React-based web application providing AI-powered features including chat, image generation, and recipe generation capabilities.

## Features

- **Chat** - Interactive chat interface powered by AI (connects to local API at `localhost:8080/ask-ai`)
- **Image Generator** - Generate images from text prompts (coming soon)
- **Recipe Generator** - AI-powered recipe suggestions (coming soon)

## Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.2.4
- **Language**: JavaScript/JSX
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 18+ recommended)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:5173` (default Vite port).

### Build

```bash
npm run build
```

Builds the app for production.

### Preview Production Build

```bash
npm run preview
```

## API Configuration

The Chat feature requires a local API server running at `localhost:8080`. The API endpoint used is:
- `GET http://localhost:8080/ask-ai?prompt=<your-message>`

## Project Structure

```
src/
├── App.jsx              # Main app component with tab navigation
├── App.css              # App-level styles
├── main.jsx             # React entry point
├── index.css            # Global styles
└── components/
    ├── chat/
    │   ├── Chat.component.jsx
    │   └── Chat.module.css
    └── imageGenerator/
        └── ImageGenerator.component.jsx
```

## License

© 2026 AI Helper App