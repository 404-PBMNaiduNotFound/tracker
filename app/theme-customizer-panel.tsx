"use client";

import React, { useState } from "react";
import { Palette, X, RotateCcw, ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import { useThemeCustomizer, PRESETS, type ColorMode, type ThemeColors } from "./theme-customizer-context";
import { Button } from "@/components/ui/button";

// ─── Color labels ──────────────────────────────────────────────────────────

const COLOR_LABELS: Record<keyof ThemeColors, string> = {
  background: "Background",
  foreground: "Text",
  primary: "Accent / Brand",
  card: "Card Surface",
  muted: "Muted / Hover",
  border: "Border",
};

const COLOR_KEYS = Object.keys(COLOR_LABELS) as (keyof ThemeColors)[];

// ─── Sub-components ────────────────────────────────────────────────────────

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <label className="relative cursor-pointer shrink-0">
        <span
          className="block w-7 h-7 rounded-md border border-border shadow-sm"
          style={{ background: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
      <span className="text-sm text-foreground/80 flex-1 truncate">{label}</span>
      <span className="text-xs font-mono text-muted-foreground">{value}</span>
    </div>
  );
}

// ─── Main panel ────────────────────────────────────────────────────────────

export function ThemeCustomizerPanel() {
  const { colors, activePreset, applyPreset, updateColor, resetToDefault } = useThemeCustomizer();
  const [open, setOpen] = useState(false);
  const [advancedMode, setAdvancedMode] = useState<ColorMode | null>(null);

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Customize theme colors"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-accent transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ boxShadow: "0 4px 24px 0 oklch(0 0 0 / 0.18)" }}
      >
        <Palette className="size-4 text-primary" />
        <span>Customize</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 w-full sm:w-[340px] max-h-[90dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl sm:bottom-6 sm:right-6 bg-card border border-border shadow-2xl transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 sm:scale-100"
            : "opacity-0 translate-y-full sm:translate-y-0 sm:scale-95 pointer-events-none"
        }`}
        style={{ boxShadow: "0 8px 48px oklch(0 0 0 / 0.22)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-primary" />
            <span className="font-semibold text-sm">Theme Colors</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetToDefault}
              title="Reset to default"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="size-3.5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-5">
          {/* Presets */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
              Presets
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-medium transition-all duration-150 hover:scale-105 active:scale-95 ${
                    activePreset === key
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/50 text-foreground hover:border-primary/50"
                  }`}
                >
                  {/* Preview swatch */}
                  <div className="flex gap-0.5 mb-0.5">
                    <span
                      className="w-4 h-4 rounded-full border border-black/10"
                      style={{ background: preset.colors.light.background }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-black/10"
                      style={{ background: preset.colors.light.primary }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-black/10"
                      style={{ background: preset.colors.dark.background }}
                    />
                  </div>
                  <span className="text-[10px] text-center leading-tight">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Advanced: per-mode color pickers */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
              Fine-tune
            </p>

            {/* Light mode section */}
            <div className="rounded-xl border border-border overflow-hidden mb-2">
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/40 text-sm font-medium hover:bg-muted/70 transition-colors"
                onClick={() => setAdvancedMode(advancedMode === "light" ? null : "light")}
              >
                <span className="flex items-center gap-2">
                  <Sun className="size-3.5 text-amber-500" />
                  Light Mode Colors
                </span>
                {advancedMode === "light" ? (
                  <ChevronUp className="size-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                )}
              </button>
              {advancedMode === "light" && (
                <div className="px-3 py-3 space-y-3">
                  {COLOR_KEYS.map((key) => (
                    <ColorRow
                      key={key}
                      label={COLOR_LABELS[key]}
                      value={colors.light[key]}
                      onChange={(v) => updateColor("light", key, v)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode section */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/40 text-sm font-medium hover:bg-muted/70 transition-colors"
                onClick={() => setAdvancedMode(advancedMode === "dark" ? null : "dark")}
              >
                <span className="flex items-center gap-2">
                  <Moon className="size-3.5 text-indigo-400" />
                  Dark Mode Colors
                </span>
                {advancedMode === "dark" ? (
                  <ChevronUp className="size-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                )}
              </button>
              {advancedMode === "dark" && (
                <div className="px-3 py-3 space-y-3">
                  {COLOR_KEYS.map((key) => (
                    <ColorRow
                      key={key}
                      label={COLOR_LABELS[key]}
                      value={colors.dark[key]}
                      onChange={(v) => updateColor("dark", key, v)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            Colors are saved to your browser and apply to the entire app.
          </p>
        </div>
      </div>
    </>
  );
}
