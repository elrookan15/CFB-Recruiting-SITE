## 2024-05-24 - React Component Filtering Optimization
**Learning:** Found an O(N) recalculation during every render on inputs in `CoachesDirectory.tsx`. Even though N is currently small for mock data, the codebase pattern encourages `useMemo` for any filtered list that depends on multiple filter states (like search, conference, and position dropdowns).
**Action:** Always wrap derived filtering data logic in `useMemo` with proper dependencies when discovering raw `.filter()` calls inside the render path.
