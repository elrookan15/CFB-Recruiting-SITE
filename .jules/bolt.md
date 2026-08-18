## 2024-08-16 - Add useMemo to LeaderboardTop250 filter
**Learning:** Large arrays being filtered on every re-render in React components without `useMemo` can cause performance degradation, especially when dealing with complex filter conditions and string manipulations like `toLowerCase()`.
**Action:** When filtering a dataset based on multiple state values, wrap the filter logic in `useMemo` to prevent recalculation on unrelated state changes (like modal toggles) and improve overall rendering performance.

## 2024-08-16 - Optimize CoachPipelineBoard kanban grouping
**Learning:** Kanban boards often render by mapping over columns and filtering the entire dataset for each column (e.g. `stages.map(stage => prospects.filter(p => p.stage === stage))`), which is O(C * N) where C is columns and N is items.
**Action:** Replace `O(C * N)` filters inside render loops with a single `O(N)` grouping pass wrapped in `useMemo`. Iterate over the dataset once to populate a hash map or object grouped by stage, then look up the array by key in the column render loop.
