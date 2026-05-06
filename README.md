# Collaborative Code Editor

**Live demo:** [code-sync-ALB-671075485.ap-northeast-1.elb.amazonaws.com](http://code-sync-ALB-671075485.ap-northeast-1.elb.amazonaws.com)

A real-time collaborative code editor built with React, Monaco Editor, and Yjs. Multiple users can edit the same document simultaneously, with live presence awareness showing who's currently in the session.

## How it works

The frontend uses [Monaco Editor](https://microsoft.github.io/monaco-editor/) (the editor that powers VS Code) with [Yjs](https://yjs.dev/) for conflict-free real-time sync via CRDTs. The backend is a Node.js/Express server that uses [Socket.IO](https://socket.io/) as the Yjs transport layer. When users make edits, changes are broadcast to all connected clients and merged automatically.

## Tech Stack

**Frontend**
- React 19
- Monaco Editor (`@monaco-editor/react`)
- Yjs + `y-monaco` + `y-socket.io`
- Tailwind CSS
- Vite

**Backend**
- Node.js + Express 5
- Socket.IO
- `y-socket.io` (Yjs server provider)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Running locally

**Backend**

```bash
cd Backend
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

**Frontend**

```bash
cd Frontend
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

### Usage

1. Open the app in your browser and enter a username to join the session.
2. Open the same URL in another tab or browser with a different username.
3. Both editors will stay in sync in real time. The sidebar shows all currently connected users.

## Docker

A multi-stage Dockerfile is included. It builds the frontend and serves the static assets from the Express backend.

```bash
docker build -t collab-editor .
docker run -p 3000:3000 collab-editor
```

Then open `http://localhost:3000`.

## Project Structure

```
├── Backend/
│   ├── server.js        # Express + Socket.IO + Yjs server
│   └── package.json
├── Frontend/
│   ├── src/
│   │   └── app/
│   │       └── App.jsx  # Main editor component
│   └── package.json
└── dockerfile
```
