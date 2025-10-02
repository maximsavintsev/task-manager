import { configureStore } from "@reduxjs/toolkit";
import boardsReducer, {
    type BoardsState,
} from "../features/boards/boardsSlice";
import listsReducer, { type ListsState } from "../features/lists/listsSlice";
import cardsReducer, { type CardsState } from "../features/cards/cardsSlice";

type RootPreloadedState = {
    boards: BoardsState;
    lists: ListsState;
    cards: CardsState;
};

const saveToLocalStorage = (state: unknown) => {
    try {
        localStorage.setItem("appState", JSON.stringify(state));
    } catch (e) {
        console.error("Ошибка сохранения в localStorage", e);
    }
};

const loadFromLocalStorage = (): RootPreloadedState | undefined => {
    try {
        const data = localStorage.getItem("appState");
        return data ? JSON.parse(data) : undefined;
    } catch {
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        lists: listsReducer,
        cards: cardsReducer,
    },
    preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
