## 2024-06-19 - React UI State with Expensive Filtering
**Learning:** Mixing input state for modals (like messageBody in CoachesDirectory) in the same component as a large, unfiltered list causes unnecessary O(N) array filtering operations on every keystroke because the whole component re-renders.
**Action:** Always wrap expensive list filtering logic in `useMemo`, especially when the parent component holds rapidly updating state that shouldn't affect the list filter.
