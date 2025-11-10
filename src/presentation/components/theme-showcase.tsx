/**
 * Theme Showcase Component
 * Demonstrates the dynamic theming system with all generated colors
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export function ThemeShowcase() {
  const [isDark, setIsDark] = useState(false);

  const colorPairs = [
    { name: 'Primary', bg: 'bg-primary', text: 'text-primary-foreground' },
    { name: 'Secondary', bg: 'bg-secondary', text: 'text-secondary-foreground' },
    { name: 'Accent', bg: 'bg-accent', text: 'text-accent-foreground' },
    { name: 'Muted', bg: 'bg-muted', text: 'text-muted-foreground' },
    { name: 'Success', bg: 'bg-success', text: 'text-success-foreground' },
    { name: 'Warning', bg: 'bg-warning', text: 'text-warning-foreground' },
    { name: 'Destructive', bg: 'bg-destructive', text: 'text-destructive-foreground' },
    { name: 'Info', bg: 'bg-info', text: 'text-info-foreground' },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>🎨 "Lógica & Vida" Theme Showcase</CardTitle>
              <CardDescription>
                Dynamic theming system with WCAG-compliant colors
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Base Palette */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Base Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { name: 'Azul-marinho', hex: '#1E2A44', label: 'Primary' },
                { name: 'Cinza-aço', hex: '#A3A9B7', label: 'Secondary' },
                { name: 'Âmbar-dourado', hex: '#D9A441', label: 'Accent 1' },
                { name: 'Verde-musgo', hex: '#6B7B58', label: 'Accent 2' },
                { name: 'Rosa-salmão', hex: '#E89A8E', label: 'Accent 3' },
              ].map((color) => (
                <div key={color.label} className="text-center">
                  <div
                    className="w-full h-16 rounded-lg mb-2 border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-xs font-medium">{color.label}</p>
                  <p className="text-xs text-muted-foreground">{color.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Generated Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {colorPairs.map((pair) => (
                <div
                  key={pair.name}
                  className={`${pair.bg} ${pair.text} p-4 rounded-lg text-center font-medium`}
                >
                  {pair.name}
                </div>
              ))}
            </div>
          </div>

          {/* UI Components */}
          <div>
            <h3 className="text-lg font-semibold mb-3">UI Components</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Status Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge className="bg-success text-success-foreground">Success</Badge>
              <Badge className="bg-warning text-warning-foreground">Warning</Badge>
              <Badge className="bg-info text-info-foreground">Info</Badge>
            </div>
          </div>

          {/* WCAG Compliance Note */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>♿ WCAG 2.1 Compliant:</strong> All color pairs are automatically
              validated for AA contrast ratio (4.5:1 minimum). The theming system uses
              OKLCH color space for perceptually uniform adjustments and ensures
              accessibility compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
