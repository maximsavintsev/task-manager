import { useState } from "react";
import { addBoard } from "./boardsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./BoardsList.module.css";
import { NavLink } from "react-router";
import Header from "../../layout/Header";

const BoardsList = () => {
    const [inputValue, setInputValue] = useState<string>("");

    const boards = useAppSelector((state) => state.boards.items);
    const dispatch = useAppDispatch();

    const createNewBoard = () => {
        if (inputValue.trim()) {
            dispatch(addBoard({ title: inputValue }));
            setInputValue("");
        }
    };

    return (
        <div className={styles.wrap}>
            <Header>
                <h2>Boards</h2>

                <div className={styles.inputWrap}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="New board"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        className={`${styles.button} ${styles.buttonInside}`}
                        onClick={createNewBoard}
                    >
                        ➕
                    </button>
                </div>
                <div className={styles.boards}>
                    {boards.map((board) => (
                        <NavLink
                            key={board.id}
                            className={styles.boardItem}
                            to={`/${board.id}`}
                        >
                            {board.title}
                        </NavLink>
                    ))}
                </div>
            </Header>
        </div>
    );
};

export default BoardsList;
