import {create } from "zustand";

export const useLogStore = create((set) => ({
    log: [],
    addLog: (type, message) => 
        set((state) => ({ 
            log: [...state.log, { type, message, timestamp: new Date().toISOString() }] 
        })),
    clearLog: () => set({ log: [] }),
}));



