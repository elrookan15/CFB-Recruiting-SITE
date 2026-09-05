## 2024-05-14 - [O(S*N) Filter Rendering in Kanban Board]
**Learning:** Found a performance bottleneck in the `CoachPipelineBoard` component where a `.filter` operation was being called over the entire prospects list for every stage iteration within a `.map` during rendering (`O(S * N)` where S is stages, N is prospects).
**Action:** Replaced it with a single `useMemo` that groups prospects by stage outside the render loop `O(N)`, significantly reducing array traversals during re-renders, especially when prospects scale.
