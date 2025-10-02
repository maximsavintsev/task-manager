import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCard } from "../cards/cardsSlice";
import styles from "./ListColumn.module.css";
import CardComponent from "../cards/CardComponent";
import { removeList, renameList } from "./listsSlice";

type ListColumnProps = {
    id: string;
    title: string;
};

const ListColumn = ({ id, title }: ListColumnProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [isListEditing, setIsListEditing] = useState(false);

    const dispatch = useAppDispatch();
    const cards = useAppSelector((state) =>
        state.cards.items.filter((card) => card.listId === id)
    );

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && title.trim()) {
            handleAddCard();
        }
    };

    const handleBlur = () => {
        if (title.trim()) {
            handleAddCard();
        }
    };

    const handleTitleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && title.trim()) {
            setIsTitleEditing(false);
        }
    };

    const handleTitleBlur = () => {
        if (title.trim()) {
            setIsTitleEditing(false);
        }
    };

    const handleAddCard = () => {
        if (inputValue.trim()) {
            dispatch(
                addCard({
                    listId: id,
                    title: inputValue.trim(),
                    position: 1,
                })
            );
            setInputValue("");
        }
    };

    return (
        <div className={styles.list}>
            <div className={styles.listHeader}>
                {isTitleEditing ? (
                    <input
                        className={styles.listTitleEditing}
                        placeholder="List title"
                        value={title}
                        onChange={(e) =>
                            dispatch(
                                renameList({ id: id, title: e.target.value })
                            )
                        }
                        autoFocus
                        onKeyDown={handleTitleEnter}
                        onBlur={handleTitleBlur}
                    ></input>
                ) : (
                    <h3
                        className={styles.listTitle}
                        onClick={() => setIsTitleEditing(true)}
                    >
                        {title}
                    </h3>
                )}
                {isListEditing ? (
                    <div className={styles.listEditOptions}>
                        <button
                            onClick={() => dispatch(removeList({ id: id }))}
                            className={styles.deleteButton}
                        >
                            <p>Delete</p>
                        </button>
                        <button
                            onClick={() => setIsListEditing(false)}
                            className={styles.deleteButton}
                        >
                            <p>Save</p>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsListEditing(true)}
                        className={styles.deleteButton}
                    >
                        <p>Edit</p>
                    </button>
                )}
            </div>

            <div className={styles.cards}>
                {cards.map((card) => (
                    <CardComponent
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        editing={isListEditing}
                    />
                ))}
                <div className={`${styles.card} ${styles.newCard}`}>
                    <input
                        value={inputValue}
                        className={styles.input}
                        type="text"
                        placeholder="Add card"
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleEnter}
                        onBlur={handleBlur}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListColumn;
