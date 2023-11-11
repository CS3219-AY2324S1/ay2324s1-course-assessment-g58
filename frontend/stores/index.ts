import { createContext, useContext } from "react";
import { EditorStore } from "./editor";
import { HistoryStore } from "./history";

/**
 * This RootStore exposes state for use
 * Search "useStore()" to find it's uses
 */
class RootStore {
    editor: EditorStore;
    history: HistoryStore;

    constructor() {
        this.editor = new EditorStore();
        this.history = new HistoryStore();
    }
}

const rootStore = new RootStore();

const StoreContext = createContext(rootStore);

export const useStore = () => useContext(StoreContext);
