import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Route, Routes } from "react-router";
import BoardsList from "./features/boards/BoardsList";
import BoardPage from "./features/boards/BoardPage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<BoardsList />} />
                    <Route path=":boardId" element={<BoardPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
