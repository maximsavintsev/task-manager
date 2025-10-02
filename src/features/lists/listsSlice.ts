import { createSlice } from "@reduxjs/toolkit";
import type { List } from "../../types/models";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ListsState {
    items: List[];
}
const initialState: ListsState = {
    items: [],
};

const listsSlice = createSlice({
    name: "lists",
    initialState: initialState,
    reducers: {
        addList: (
            state,
            action: PayloadAction<{
                boardId: string;
                title: string;
                position: number;
            }>
        ) => {
            const newList: List = {
                id: crypto.randomUUID(),
                boardId: action.payload.boardId,
                title: action.payload.title,
                position: action.payload.position,
            };
            state.items.push(newList);
        },
        removeList: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((l) => l.id !== action.payload.id);
        },
        renameList: (
            state,
            action: PayloadAction<{ id: string; title: string }>
        ) => {
            const list = state.items.find((l) => l.id === action.payload.id);
            if (list) {
                list.title = action.payload.title;
            }
        },
    },
});

export const { addList, removeList, renameList } = listsSlice.actions;
export default listsSlice.reducer;
