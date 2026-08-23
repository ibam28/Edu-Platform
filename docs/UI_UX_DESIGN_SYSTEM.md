# UI/UX Design System

> Status: Design tokens established (M01), reusable UI primitives added (M02), and the
> design system verified for accessibility/consistency (M03).

## Foundation

- Styling framework: Tailwind CSS.
- Framework: Next.js + React + TypeScript.
- Tokens live as CSS custom properties in `frontend/app/globals.css` and are exposed as
  Tailwind theme extensions in `frontend/tailwind.config.ts`.

## Design Tokens

### 1. Color

Brand language: professional, modern, education/technology oriented. A trustworthy
blue is the primary brand color; violet is used as an accent for certification and
talent highlight moments. Every color token adapts for light and dark mode via
`prefers-color-scheme`.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `background` | `#ffffff` | `#0b1120` | App background |
| `background-muted` | `#f8fafc` | `#0f172a` | Muted sections |
| `background-subtle` | `#f1f5f9` | `#1e293b` | Hover / subtle fills |
| `surface` | `#ffffff` | `#111a2e` | Cards, panels |
| `foreground` | `#0f172a` | `#f1f5f9` | Primary text |
| `muted` | `#64748b` | `#94a3b8` | Secondary text |
| `subtle` | `#94a3b8` | `#64748b` | Tertiary / placeholders |
| `primary-500` | `#3b82f6` | `#60a5fa` | Brand action hover |
| `primary-600` | `#2563eb` | `#2563eb` | Brand action, links (solid fill, white text AA) |
| `primary-700` | `#1d4ed8` | `#1d4ed8` | Brand action pressed |
| `primary-on-tint` | `#1d4ed8` | `#93c5fd` | Readable text on primary tints (dark mode) |
| `primary-100` | `#dbe6ff` | `#1e3a5f` | Brand tint backgrounds |
| `primary-50` | `#eef4ff` | `#1e293b` | Brand faint backgrounds |
| `accent-500` | `#7c3aed` | `#a78bfa` | Certification / talent accent |
| `accent-600` | `#6d28d9` | `#8b5cf6` | Accent pressed |
| `accent-on-tint` | `#6d28d9` | `#c4b5fd` | Readable text on accent tints (dark mode) |
| `success` | `#16a34a` | `#22c55e` | Success states |
| `success-100` | `#dcfce7` | `#052e16` | Success tint backgrounds (badges, alerts) |
| `success-700` | `#166534` | `#4ade80` | Success readable text on tint |
| `warning` | `#d97706` | `#f59e0b` | Warning states |
| `warning-100` | `#fef3c7` | `#451a03` | Warning tint backgrounds |
| `warning-700` | `#92400e` | `#fbbf24` | Warning readable text on tint |
| `danger` | `#dc2626` | `#dc2626` | Error states (solid fill, white text AA) |
| `danger-100` | `#fee2e2` | `#450a0a` | Danger tint backgrounds |
| `danger-700` | `#b91c1c` | `#f87171` | Danger readable text on tint |
| `info` | `#0284c7` | `#38bdf8` | Informational states |
| `info-100` | `#e0f2fe` | `#082f49` | Info tint backgrounds |
| `info-700` | `#0369a1` | `#7dd3fc` | Info readable text on tint |
| `border` | `#e2e8f0` | `#1e293b` | Default borders, dividers |
| `border-strong` | `#cbd5e1` | `#334155` | Strong borders, inputs |
| `ring` | `rgba(37,99,235,0.4)` | `rgba(59,130,246,0.4)` | Focus ring |

### 2. Typography

- `font-sans`: system UI stack — `ui-sans-serif, system-ui, -apple-system, "Segoe UI",
  Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`. Latin-only is sufficient
  for both Indonesian and English, and the stack loads no web fonts (no extra
  dependency).
- `font-mono`: `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`
  for code, lessons, and technical content.
- Type scale reuses the Tailwind default scale (`text-xs` … `text-5xl`).
- Recommended weights: `font-medium` (500) for emphasis, `font-semibold` (600) for
  headings of small surfaces, `font-bold` (700) for page headings and primary CTA text.
- Line height: Tailwind defaults (relaxed for body, tight for headings).

### 3. Spacing

- Base unit: `4px` (`0.25rem`).
- Reuses the Tailwind default spacing scale (`p-1`, `p-2`, `p-4`, `p-8`, `gap-*`, …).
- Bilingual strings may grow in either language; prefer `gap-*`/padding over fixed
  widths for text-containing components.

### 4. Radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | `0.375rem` | Inputs, small chips |
| `radius-md` | `0.5rem` | Buttons, form controls |
| `radius-lg` | `0.75rem` | Cards, dropdowns |
| `radius-xl` | `1rem` | Modals, hero panels |
| `radius-full` | `9999px` | Avatars, pills, badges |

Exposed as Tailwind `rounded-sm | rounded-md | rounded-lg | rounded-xl | rounded-full`.

### 5. Shadows (elevation)

| Token | Value | Usage |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px rgba(15,23,42,0.06)` | Subtle separation |
| `shadow-md` | `0 4px 6px -1px rgba(15,23,42,0.08)` | Default cards |
| `shadow-lg` | `0 10px 15px -3px rgba(15,23,42,0.1)` | Dropdowns, popovers |
| `shadow-xl` | `0 20px 25px -5px rgba(15,23,42,0.12)` | Modals, floating panels |

Dark mode uses deeper black-based shadows.

### 6. Core visual tokens

| Token | Value | Usage |
| --- | --- | --- |
| `container-max` | `80rem` (`1280px`) | Max content width |
| `transition-fast` | `150ms` | Hover / micro-interactions |
| `transition-base` | `200ms` | Standard transitions |
| `ring` | 2px `ring` on focus | WCAG 2.1 AA focus indicator |

## Component Guidelines (tokens only)

No components are implemented in this milestone. Future components must be built from
these tokens only and must not introduce ad-hoc colors, radii, or shadows.

## Reusable UI Primitives (M02)

All primitives live in `frontend/components/ui/` and are built exclusively from the
design tokens above. A barrel export (`frontend/components/ui/index.ts`) exposes them.

| Primitive | File | Purpose |
| --- | --- | --- |
| `Button` | `Button.tsx` | Variants `primary | secondary | outline | ghost | danger`; sizes `sm | md | lg`; `loading` (spinner + `aria-busy`), `disabled`, `fullWidth`. Focus ring via `ring` token. |
| `Input` | `Input.tsx` | Labeled field with `hint`, `error` (renders `role="alert"`, `aria-invalid`), `disabled`, `required`. Auto-generated `id` when omitted. |
| `Card` | `Card.tsx` | `surface` + border, optional `elevated`, `interactive` (hover shadow), `padded`. |
| `Badge` | `Badge.tsx` | Variants `neutral | primary | accent | success | warning | danger | info`; tinted backgrounds meet AA contrast. |
| `Container` | `Container.tsx` | Max-width (`container-max`) wrapper with responsive horizontal padding. |
| `Heading` | `Heading.tsx` | Semantic `h1`–`h6` via `level`, with a typographic scale. |
| `Text` | `Text.tsx` | Body copy with `size`, `muted`, `subtle`, `mono` variants. |
| `Spinner` | `Spinner.tsx` | Loading indicator; accepts a localizable `label` for screen readers. |
| `Alert` | `Alert.tsx` | Error/warning/success/info feedback; `role="alert"` for errors, `role="status"` otherwise. |
| `EmptyState` | `EmptyState.tsx` | Title, optional description/icon/action. No hardcoded strings. |
| `cn` | `cn.ts` | Tiny class-name combiner (no dependency). |

Rules for use:

- No user-facing strings are hardcoded in primitives; callers pass localized text.
- Interactive elements expose focus-visible rings and disabled semantics.
- Do not add ad-hoc colors, radii, or shadows outside the token set.
- `text-subtle` is reserved for placeholder and decorative text only (exempt from
  WCAG contrast); use `text-muted` for body-copy secondary text.
- Color pairings were verified against WCAG 2.1 AA (4.5:1) for light and dark mode.
  Brand/semantic solid fills use white text that passes AA in both modes; tinted
  surfaces use dedicated `*-on-tint` text colors in dark mode.

## Planned Areas (future)

- Component library: buttons, inputs, cards, navigation, modals.
- Bilingual typography support (Indonesian and English).
- Accessibility basics and responsive behavior for every affected UI.

## Bilingual Requirement

The design system must accommodate both Indonesian and English text lengths and
language switching without layout breakage.

## Accessibility Baseline

All future UI must meet WCAG 2.1 AA basics: sufficient color contrast, keyboard
navigation, focus indicators, and semantic HTML.

## Current State

Design tokens are defined in `frontend/app/globals.css` and mapped to Tailwind theme
extensions in `frontend/tailwind.config.ts`. Reusable UI primitives (Button, Input,
Card, Badge, Container, Heading, Text, Spinner, Alert, EmptyState) are implemented in
`frontend/components/ui/`. All color pairings pass WCAG 2.1 AA contrast checks in light
and dark mode; lint, type-check, and build are green. No production pages or layouts
are implemented yet.
