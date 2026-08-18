## 2024-05-24 - React Component Filtering Optimization
**Learning:** Found several components (`LeaderboardTop250`, `CampSearchEngine`, `CoachPipelineBoard`, etc.) computing filtered lists directly in the render body. Since these components can cause frequent re-renders due to interactions (search input changes, filter toggles, etc.) and they are filtering large mock datasets, recalculating the entire list on every render represents a frontend performance bottleneck.
**Action:** Wrapped expensive filtering operations inside `useMemo` hooks with explicit dependencies. This ensures that the filtered arrays are only recomputed when the underlying data or active filter criteria change, significantly reducing unnecessary processing during render cycles.

## 2024-05-24 - React Rules of Hooks Error in .map
**Learning:** Found that I accidentally placed a `useMemo` hook inside an `Array.prototype.map` loop (`stages.map((stage) => { const stageProspects = useMemo(...) })`). This violates the React Rules of Hooks, which state that hooks cannot be called inside loops, conditions, or nested functions, and caused a critical runtime error during review.
**Action:** The correct approach is to compute grouped or mapped objects in a single `useMemo` block *before* the loop (e.g., creating a `prospectsByStage` mapping object), or extract the contents of the loop into a separate child component.
