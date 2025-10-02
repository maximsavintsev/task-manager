import { useNavigate, useParams } from "react-router";
import styles from "./BoardPage.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addList } from "../lists/listsSlice";
import ListColumn from "../lists/ListColumn";
import Header from "../../layout/Header";
import { removeBoard, renameBoard } from "./boardsSlice";

const BoardPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);

    const board = useAppSelector((state) =>
        state.boards.items.filter((b) => b.id === params.boardId)
    );

    const title = board[0].title;

    const lists = useAppSelector((state) =>
        state.lists.items.filter((l) => l.boardId === params.boardId)
    );
    const dispatch = useAppDispatch();

    const createList = () => {
        if (inputValue.trim()) {
            dispatch(
                addList({
                    boardId: params.boardId!,
                    title: inputValue,
                    position: 1,
                })
            );
            setInputValue("");
        }
    };

    const handleBoardDelete = () => {
        dispatch(removeBoard({ id: board[0].id }));
        navigate("/");
    };

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && title.trim()) {
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        if (title.trim()) {
            setIsEditing(false);
        }
    };

    return (
        <div className={styles.wrap}>
            <Header>
                {isEditing ? (
                    <input
                        className={styles.boardTitleEdit}
                        placeholder="Board title"
                        value={board[0].title}
                        onChange={(e) =>
                            dispatch(
                                renameBoard({
                                    id: board[0].id,
                                    title: e.target.value,
                                })
                            )
                        }
                        autoFocus
                        onKeyDown={handleEnter}
                        onBlur={handleBlur}
                    ></input>
                ) : (
                    <h2 onClick={() => setIsEditing(true)}>{board[0].title}</h2>
                )}
                <div className={styles.inputWrap}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="New list"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoCapitalize="sentences"
                    />
                    <button
                        className={`${styles.button} ${styles.buttonInside}`}
                        onClick={createList}
                    >
                        ➕
                    </button>
                </div>
                <button
                    className={styles.buttonDeleteBoard}
                    onClick={handleBoardDelete}
                >
                    Delete board
                </button>
            </Header>

            <div className={styles.lists}>
                {lists.map((list) => (
                    <ListColumn key={list.id} id={list.id} title={list.title} />
                ))}
            </div>
        </div>
    );
};

export default BoardPage;
