## 2023-10-27 - [Memoize filter arrays in directories]
**Learning:** React components that render large lists of items (e.g. `CampSearchEngine`, `CoachesDirectory`) and include independent interactive elements (like modals or text inputs) can suffer from unnecessary O(N) array filtering calculations on every render.
**Action:** Use `useMemo` to cache the filtered array based on its specific dependency inputs (search terms, filter criteria) to prevent recalculations when independent state changes.
