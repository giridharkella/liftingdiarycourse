# UI Coding Standards

## Component Library

**ONLY shadcn/ui components are permitted in this project.**

- Do NOT create custom UI components under any circumstances
- Do NOT use raw HTML elements styled with Tailwind as standalone components
- Every UI element must be built using shadcn/ui components (e.g. `Button`, `Card`, `Input`, `Table`, `Dialog`, etc.)
- If a required component does not yet exist in the project, add it via the shadcn CLI:
  ```bash
  npx shadcn@latest add <component-name>
  ```

## Date Formatting

All date formatting must use **date-fns**. Do not use `toLocaleDateString`, `Intl.DateTimeFormat`, or any other date formatting approach.

Dates must be displayed in the following format:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

Use the `do MMM yyyy` format token with `date-fns/format`:

```ts
import { format } from 'date-fns';

format(date, 'do MMM yyyy'); // e.g. "1st Sep 2025"
```
