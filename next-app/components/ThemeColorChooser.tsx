"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export type ThemeColors = {
  accent: string;
  accentFg: string;
  accentHover: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  muted: string;
  text: string;
};

type ThemeColorChooserProps = {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
};

export default function ThemeColorChooser({ colors, onChange }: ThemeColorChooserProps) {
  const [localColors, setLocalColors] = useState(colors);

  const handleChange = (key: keyof ThemeColors, color: string) => {
    const updated = { ...localColors, [key]: color };
    setLocalColors(updated);
    onChange(updated);
  };

  return (
    <Card className="p-4 bg-card text-white w-full max-w-xs rounded-2xl shadow-md space-y-4 h-[30rem] overflow-y-auto ">
      <h2 className="text-lg font-semibold mb-2">Test Theme Colors</h2>

      <div className="space-y-5">
        {Object.keys(localColors).map((key) => (
          <div key={key} className="space-y-2">
            <Label className="capitalize text-sm">{key}</Label>

            <div className="flex flex-col gap-2">
              {/* Color Picker */}
              <HexColorPicker
                color={localColors[key as keyof ThemeColors]}
                onChange={(color) => handleChange(key as keyof ThemeColors, color)}
              />

              {/* Hex Value Input */}
              <input
                type="text"
                value={localColors[key as keyof ThemeColors]}
                onChange={(e) => handleChange(key as keyof ThemeColors, e.target.value)}
                className="w-full bg-[#1a1a1a] text-white text-sm px-2 py-1 rounded-md border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/40"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
