"use client";

import { useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import { EraserIcon, Undo2Icon } from "lucide-react";
import { FieldError } from "@/components/form-parts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INK = "#020A28";
/** Wider images are scaled down: plenty for print, and keeps the upload small. */
const MAX_IMAGE_WIDTH = 900;
const PADDING = 12;

/** Crops the drawing to its strokes (plus padding) and returns it as a PNG data URL. */
function croppedPng(canvas: HTMLCanvasElement): string {
  const context = canvas.getContext("2d");
  if (!context) return "";
  const { width, height } = canvas;
  const pixels = context.getImageData(0, 0, width, height).data;

  let top = height, left = width, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] === 0) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  if (right < 0) return "";

  const crop = {
    x: Math.max(0, left - PADDING),
    y: Math.max(0, top - PADDING),
    width: Math.min(width, right + PADDING) - Math.max(0, left - PADDING),
    height: Math.min(height, bottom + PADDING) - Math.max(0, top - PADDING),
  };
  const scale = Math.min(1, MAX_IMAGE_WIDTH / crop.width);
  const out = document.createElement("canvas");
  out.width = Math.max(1, Math.round(crop.width * scale));
  out.height = Math.max(1, Math.round(crop.height * scale));
  out.getContext("2d")?.drawImage(canvas, crop.x, crop.y, crop.width, crop.height, 0, 0, out.width, out.height);
  return out.toDataURL("image/png");
}

/** The typed name in the accent script font, as a PNG data URL. */
function typedPng(text: string, font: string): string {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.font = font;
  canvas.width = Math.min(MAX_IMAGE_WIDTH, Math.ceil(context.measureText(text).width) + PADDING * 4);
  canvas.height = 140;
  context.font = font; // resizing a canvas resets its state
  context.fillStyle = INK;
  context.textBaseline = "middle";
  context.fillText(text, PADDING * 2, canvas.height / 2, canvas.width - PADDING * 4);
  return canvas.toDataURL("image/png");
}

type Mode = "draw" | "type";

/**
 * Signature input: draw it (mouse, finger or stylus) or type it (keyboard
 * friendly). Either way the form gets a PNG data URL in a hidden "signature" input.
 */
export function SignatureField({ typedName, error }: { typedName: string; error?: string }) {
  const [mode, setMode] = useState<Mode>("draw");
  const [drawn, setDrawn] = useState("");
  const [typed, setTyped] = useState({ text: "", image: "" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const previewRef = useRef<HTMLParagraphElement>(null);

  // The pad lives as long as the field: switching tabs keeps the drawing.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pad = new SignaturePad(canvas, { penColor: INK, minWidth: 0.8, maxWidth: 2.6 });
    padRef.current = pad;

    // Match the bitmap to the displayed size (and pixel density) so strokes stay sharp.
    const fit = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const target = { width: Math.round(width * ratio), height: Math.round(height * ratio) };
      if (!width || (canvas.width === target.width && canvas.height === target.height)) return;
      const strokes = pad.toData();
      canvas.width = target.width;
      canvas.height = target.height;
      canvas.getContext("2d")?.scale(ratio, ratio);
      pad.clear();
      pad.fromData(strokes);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);

    const update = () => setDrawn(pad.isEmpty() ? "" : croppedPng(canvas));
    pad.addEventListener("endStroke", update);
    return () => {
      observer.disconnect();
      pad.removeEventListener("endStroke", update);
      pad.off();
      padRef.current = null;
    };
  }, []);

  // Render the typed name once its font is ready.
  useEffect(() => {
    const text = typedName.trim();
    const preview = previewRef.current;
    if (mode !== "type" || !text || !preview) return;
    let cancelled = false;
    const font = `italic 72px ${getComputedStyle(preview).fontFamily}`;
    document.fonts.load(font, text).then(() => {
      if (!cancelled) setTyped({ text, image: typedPng(text, font) });
    });
    return () => {
      cancelled = true;
    };
  }, [mode, typedName]);

  const typedImage = typed.text === typedName.trim() ? typed.image : "";
  const value = mode === "draw" ? drawn : typedImage;

  const undo = () => {
    const pad = padRef.current;
    if (!pad) return;
    pad.fromData(pad.toData().slice(0, -1));
    setDrawn(pad.isEmpty() || !canvasRef.current ? "" : croppedPng(canvasRef.current));
  };
  const clear = () => {
    padRef.current?.clear();
    setDrawn("");
  };

  return (
    <fieldset aria-describedby={error ? "signature-error" : undefined}>
      <legend className="mb-2 text-sm font-medium">Signature</legend>
      <input type="hidden" name="signature" value={value} />
      <Tabs value={mode} onValueChange={(next) => setMode(next as Mode)} className="gap-3">
        <TabsList className="h-9! rounded-full p-1">
          <TabsTrigger value="draw" className="rounded-full px-3">
            Draw
          </TabsTrigger>
          <TabsTrigger value="type" className="rounded-full px-3">
            Type
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" keepMounted>
          <div className="relative rounded-2xl border-2 border-dashed border-input bg-card">
            <canvas
              ref={canvasRef}
              aria-label="Signature pad. Draw your signature with a mouse, finger or stylus, or choose Type to type it instead."
              className="block h-44 w-full touch-none rounded-2xl"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-10 border-b border-foreground/20" />
            {!drawn && (
              <p aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                Sign here
              </p>
            )}
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={undo} disabled={!drawn} className="rounded-full">
              <Undo2Icon aria-hidden="true" /> Undo
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={clear} disabled={!drawn} className="rounded-full">
              <EraserIcon aria-hidden="true" /> Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="type">
          <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-input bg-card px-4">
            <p ref={previewRef} className="truncate font-accent text-5xl text-foreground italic">
              {typedName.trim() || <span className="font-sans text-sm text-muted-foreground not-italic">Type your full name above</span>}
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Your typed name becomes your signature.</p>
        </TabsContent>
      </Tabs>
      {/* A "missing signature" error goes away as soon as there is one. */}
      <FieldError id="signature-error" error={value ? undefined : error} />
    </fieldset>
  );
}
