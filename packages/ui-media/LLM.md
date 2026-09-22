# @waysnx/ui-media — AI Agent Guide

> **Part of the WaysNX UI Kit.** Full integration guide: see `@waysnx/ui-kit` LLM.md (shipped with that package).

---

## ⭐ What this package does

Media capture and display components — QR/barcode generation and scanning, signature capture, image/video/audio players, image cropping, OCR, and color picking.

---

## Package info

- **npm:** `@waysnx/ui-media` v1.0.1 (companion package — NOT in `@waysnx/ui-kit` meta)
- **Install:** `npm install @waysnx/ui-media`
- **Peer deps:** `react >=18`, `react-dom >=18`
- **CSS (required):** `import '@waysnx/ui-media/dist/index.css'`

---

## Exported components

| Component | Purpose |
|-----------|---------|
| `QRCode` | QR code generator |
| `Barcode` | Barcode generator |
| `QRScanner` | Camera-based QR code scanner |
| `BarcodeScanner` | Camera-based barcode scanner |
| `SignaturePad` | Signature capture pad |
| `SignatureViewer` | Display captured signatures |
| `ImageViewer` | Image display with zoom/pan |
| `Cropper` | Image cropping tool |
| `VideoPlayer` | Video player with controls |
| `AudioPlayer` | Audio player with controls |
| `OCRScanner` | Optical character recognition |
| `ColorPicker` | Color selection tool |

## Hooks

- `useSignature` — signature capture state management
