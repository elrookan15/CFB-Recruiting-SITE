## 2024-05-20 - [Memoizing expensive derived state with text inputs]
**Learning:** In components with both complex derived state (filtering and sorting arrays) and controlled text inputs (like submission forms), failing to memoize the derived state causes O(N log N) operations on every single keystroke, significantly degrading typing performance.
**Action:** Always use `useMemo` for derived lists (especially those involving `.sort()`) when the component also contains independent text input state that updates frequently.
