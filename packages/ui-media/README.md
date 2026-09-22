# @waysnx/ui-media

> 🤖 **AI agents & LLMs:** See **LLM.md** (shipped with this package) for a structured integration guide — image, video, and media components.

Media and visual components from WaysNX — QR/barcode, signatures, image/video/audio, OCR, and color picker.

## Installation

```bash
npm install @waysnx/ui-media
```

Requires `react` and `react-dom` (>=18) as peer dependencies.

If your bundler does not import package CSS automatically, include the stylesheet:

```ts
import "@waysnx/ui-media/dist/index.css";
```

## Overview

`@waysnx/ui-media` provides rich-media and visual components — QR and barcode generation and scanning, signature capture and display, image/video/audio viewing, OCR scanning, and color selection.

## Representative exports

- Codes: `QRCode`, `Barcode`, `QRScanner`, `BarcodeScanner`, `OCRScanner`
- Signatures & images: `SignaturePad`, `SignatureViewer`, `ImageViewer`, `Cropper`
- Media & color: `VideoPlayer`, `AudioPlayer`, `ColorPicker`
- Hook: `useSignature`

See the documentation site for the complete, authoritative export and prop reference.

## Usage

```tsx
import { QRCode } from "@waysnx/ui-media";

export function Example() {
  return <QRCode value="https://uikit.waysnx.tech" />;
}
```

## Documentation

Full component and API reference: https://uikit.waysnx.tech
