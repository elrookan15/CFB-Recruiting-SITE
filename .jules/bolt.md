## 2024-08-25 - React Unrelated State Re-renders
**Learning:** Component state representing input fields for modals (e.g., `messageBody` in `CoachesDirectory.tsx`) can trigger expensive unmemoized filter operations on unrelated data sets on every keystroke. This causes sluggishness for large mocked datasets when users are simply typing a message.
**Action:** When a component houses a complex data list and a separate modal/input state, always wrap the data filtering logic in a `useMemo` block so it is not re-evaluated when the modal input state updates.
