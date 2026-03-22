# Art Gallery Portfolio

A modern art gallery portfolio website built with [Tailwind CSS](https://tailwindcss.com) v4 and [Elements](https://tailwindcss.com/plus/ui-blocks/documentation/elements).

## Installation

### 1. Install required dependencies

This project requires Tailwind CSS v4. Install the required dependencies:

### 2. Set up CSS file

Add the following CSS to your global stylesheet:

```css
@import 'tailwindcss';

@theme {
  --font-display: 'Instrument Serif', serif;
  --font-sans: 'Inter', system-ui, sans-serif;

  --color-olive-50: oklch(98.8% 0.003 106.5);
  --color-olive-100: oklch(96.6% 0.005 106.5);
  --color-olive-200: oklch(93% 0.007 106.5);
  --color-olive-300: oklch(88% 0.011 106.6);
  --color-olive-400: oklch(73.7% 0.021 106.9);
  --color-olive-500: oklch(58% 0.031 107.3);
  --color-olive-600: oklch(46.6% 0.025 107.3);
  --color-olive-700: oklch(39.4% 0.023 107.4);
  --color-olive-800: oklch(28.6% 0.016 107.4);
  --color-olive-900: oklch(22.8% 0.013 107.4);
  --color-olive-950: oklch(15.3% 0.006 107.1);
}

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-olive-100);
    --scroll-padding-top: 0;
    scroll-padding-top: var(--scroll-padding-top);

    @variant dark {
      background-color: var(--color-olive-950);
    }
  }
}
```

### 3. Set up fonts

Add the following meta tags to the `<head>` tag in your project:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  rel="stylesheet"
/>
```

### 4. Set up the `@` alias

Components use an `@` alias that resolves to the `src` directory. Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    // ... your existing TypeScript config
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5. Replace anchor links with SPA-link equivalent (Optional)

If your framework provides an SPA-link component, replace `<a>` instances with your framework's link component.

Example for Next.js:

```diff
diff --git a/components/elements/link.tsx b/components/elements/link.tsx
index 722b00e..f341d85 100644
--- a/components/elements/link.tsx
+++ b/components/elements/link.tsx
@@ -1,5 +1,6 @@
 import { clsx } from 'clsx/lite'
+import NextLink from 'next/link'
 import type { ComponentProps } from 'react'

@@ -9,7 +10,7 @@ export function Link({
   href: string
 } & Omit<ComponentProps<'a'>, 'href'>) {
   return (
-    <a
+    <NextLink
       href={href}
       className={clsx(
         'inline-flex items-center gap-2 text-sm/7 font-medium',

```

## Learn more

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Elements Documentation](https://tailwindcss.com/plus/ui-blocks/documentation/elements)
test
