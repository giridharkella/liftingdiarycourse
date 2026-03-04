# Data Fetching

## Server Components Only

ALL data fetching in this application MUST be done via **React Server Components**. This is a strict, non-negotiable rule.

**Do NOT fetch data via:**
- Route handlers (`src/app/api/`)
- Client components (`"use client"`)
- `useEffect` + `fetch`
- SWR, React Query, or any client-side data fetching library
- Any other mechanism outside of server components

**The only correct pattern:**

```tsx
// src/app/some-page/page.tsx
import { getWorkouts } from "@/data/workouts";

export default async function Page() {
  const workouts = await getWorkouts();
  return <WorkoutList workouts={workouts} />;
}
```

## Data Directory

All database queries MUST be encapsulated in helper functions inside the `/data` directory (e.g. `src/data/workouts.ts`). Pages and components must never query the database directly.

```
src/
  data/
    workouts.ts
    exercises.ts
    ...
```

## Drizzle ORM

All database queries within `/data` helper functions MUST use **Drizzle ORM**. Raw SQL is strictly forbidden.

**Correct:**

```ts
// src/data/workouts.ts
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkouts(userId: string) {
  return db.select().from(workouts).where(eq(workouts.userId, userId));
}
```

**Forbidden:**

```ts
// Never do this
const result = await db.execute(sql`SELECT * FROM workouts`);
```

## User Data Isolation

This is a security requirement. Every data helper function that returns user-specific data MUST scope the query to the currently authenticated user's ID. A logged-in user must **never** be able to access another user's data.

- Always retrieve the authenticated user's ID at the start of every data helper (or accept it as a required parameter).
- Always include a `where` clause filtering by `userId` on every query.
- Never expose a function that returns data for an arbitrary user ID without first verifying the caller is that user.

**Correct:**

```ts
// src/data/workouts.ts
import { auth } from "@/auth";
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkouts() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return db
    .select()
    .from(workouts)
    .where(eq(workouts.userId, session.user.id));
}
```

**Forbidden:**

```ts
// Never accept an arbitrary userId from outside without auth verification
export async function getWorkouts(userId: string) {
  return db.select().from(workouts).where(eq(workouts.userId, userId));
}
```

## Summary

| Rule | Requirement |
|------|-------------|
| Where to fetch data | Server components only |
| Where to put DB queries | `/data` directory helper functions |
| ORM | Drizzle ORM — no raw SQL |
| Data scoping | Always filter by authenticated user's ID |
