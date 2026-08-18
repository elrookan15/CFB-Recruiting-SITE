## 2024-08-14 - Add useMemo to mock data filtering
**Learning:** Found multiple components re-filtering large static arrays (mock data arrays mapping to >200 records in some instances like top recruits) on every re-render without memoization. Even minor state updates un-related to filtering (or parent re-renders) trigger expensive O(N) array filter loops.
**Action:** Always wrap derived filtering data logic in `React.useMemo` within client-side rendered dashboard components, explicitly defining the filter states in the dependency array to skip processing.
