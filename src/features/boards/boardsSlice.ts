import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "../../types/models";

export interface BoardsState {
    items: Board[];
}

const initialState: BoardsState = {
    items: [],
};

const boardsSlice = createSlice({
    name: "boards",
    initialState: initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<{ title: string }>) => {
            const newBoard: Board = {
                id: crypto.randomUUID(),
                title: action.payload.title,
            };
            state.items.push(newBoard);
        },
        removeBoard: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((b) => b.id !== action.payload.id);
        },
        renameBoard: (
            state,
            action: PayloadAction<{ id: string; title: string }>
        ) => {
            const board = state.items.find((b) => b.id === action.payload.id);
            if (board) {
                board.title = action.payload.title;
            }
        },
    },
});

export const { addBoard, removeBoard, renameBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
