## 2025-03-03 - [Missing Memoization in List Filtering]
**Learning:** Found a missing memoization opportunity in `src/components/CoachesDirectory.tsx` where filtering of `coaches` was being executed on every render.
**Action:** Always verify list filtering logic and utilize `useMemo` for any complex lists with filtering states to improve efficiency and avoid O(n) re-evaluations on non-dependent state changes (e.g. modals opening).
