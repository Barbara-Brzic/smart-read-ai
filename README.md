# Smart Read AI

A Chrome extension that lets you summarize selected text using AI — from any website or app in the browser. Just highlight text, right-click, and get an instant AI-powered summary in a floating overlay.

## Features

- **Right-click to summarize** — select any text, right-click, and trigger summarization via the context menu
- **Floating draggable overlay** — summary appears in a movable panel on top of the page
- **Markdown rendering** — summaries are formatted for readability
- **Credential storage** — API key and endpoint are saved securely in browser storage via the extension popup
- **Powered by Google Gemini** — uses the Gemini API for summarization

## Tech Stack

- [WXT](https://wxt.dev/) — Chrome extension framework (Manifest V3)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI primitives

## Getting Started

### Prerequisites

- Node.js
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Install & Run

```bash
npm install
npm run dev
```

Then load the unpacked extension from `.output/chrome-mv3-dev/` in Chrome (`chrome://extensions` → Load unpacked).

### Configure API Credentials

Click the extension icon in the toolbar and enter:
- **Endpoint** — Gemini API URL
- **API Key** — your Gemini API key

Credentials are saved to `chrome.storage.local`.

## Usage

1. Select any text on a webpage
2. Right-click and choose **Smart Read**
3. A summary appears in a floating overlay — drag it anywhere on the page

## Build

```bash
npm run build       # production build for Chrome
npm run zip         # create .zip for Chrome Web Store submission
```
