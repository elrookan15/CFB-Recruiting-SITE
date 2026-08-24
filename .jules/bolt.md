# Bolt's Journal

## 2024-05-18 - Missing useMemo causes O(N) recalculations on modal input typing
**Learning:** In React, if a component contains both a large list that gets filtered and a text input (e.g. inside a modal), typing in the text input triggers a state change that forces the component to re-render, thus re-evaluating the expensive list filter on every keystroke if it isn't memoized.
**Action:** Always wrap expensive list filtering logic in `useMemo` when there are other state variables (like modal inputs) in the same component that change frequently.
