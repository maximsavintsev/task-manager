import { createSlice } from "@reduxjs/toolkit";
import type { Card } from "../../types/models";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardsState {
    items: Card[];
}

const initialState: CardsState = {
    items: [],
};

const cardsSlice = createSlice({
    name: "cards",
    initialState: initialState,
    reducers: {
        addCard: (
            state,
            action: PayloadAction<{
                listId: string;
                title: string;
                description?: string;
                position: number;
            }>
        ) => {
            const newCard: Card = {
                id: crypto.randomUUID(),
                listId: action.payload.listId,
                title: action.payload.title,
                position: action.payload.position,
            };
            state.items.push(newCard);
        },
        removeCard: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((c) => c.id !== action.payload.id);
        },
        renameCard: (
            state,
            action: PayloadAction<{ id: string; title: string }>
        ) => {
            const card = state.items.find((c) => c.id === action.payload.id);
            if (card) {
                card.title = action.payload.title;
            }
        },
    },
});

export const { addCard, removeCard, renameCard } = cardsSlice.actions;
export default cardsSlice.reducer;
