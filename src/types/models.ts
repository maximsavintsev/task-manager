export interface Board {
    id: string;
    title: string;
}

export interface List {
    id: string;
    boardId: string;
    title: string;
    position: number;
}

export interface Card {
    id: string;
    listId: string;
    title: string;
    position: number;
}
