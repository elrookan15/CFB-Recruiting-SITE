## 2023-11-20 - Memoizing filter operations in large list components
**Learning:** React components that filter arrays (e.g., `CampSearchEngine`) on every render can cause noticeable frame drops when state unrelated to the filter (like typing a review in a modal) updates.
**Action:** Use `useMemo` to memoize the filtered output, so the filtering process only happens when the dependencies (search text, array list, selected filters) actually change.
