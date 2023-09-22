import { createWithEqualityFn } from "zustand/traditional"
import { devtools, persist } from "zustand/middleware"

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => set((store) => ({
        tasks: [...store.tasks, {
            title, state
        }]
    }), false, "addTask"),
    deleteTask: (title) => set((store) => ({
        tasks: store.tasks.filter(task => task.title !== title)
    }), false, "deleteTask"),
    setDraggedTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) => set((store) => (
        {tasks: store.tasks.map(
            task => task.title === title ? {title, state} : task
        )}
    ), false, "moveTask")
});

export const useStore = createWithEqualityFn(persist(devtools(store), { name: "store" }));