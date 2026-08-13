## 2024-05-24 - Memoize Expensive Array Filtering Operations
**Learning:** Found multiple instances where React components perform intensive filtering on large arrays inside the main render function, such as filtering mock recruiting arrays based on complex conditions.
**Action:** Always wrap heavy list filtering algorithms in `useMemo` hooks with tight dependency arrays to prevent performance drops during user interaction or re-renders, thereby avoiding O(n) rendering bottlenecks.
