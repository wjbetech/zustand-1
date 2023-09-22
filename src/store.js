import { createWithEqualityFn } from "zustand/traditional"

const store = (set) => ({
    tasks: [{
        title: "task title",
        state: "DONE"
    }],
    addTask: (title, state) => set((store) => ({
        tasks: [...store.tasks, {
            title, state
        }]
    }))
});

export const useStore = createWithEqualityFn(store);