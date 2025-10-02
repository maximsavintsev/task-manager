import { useState } from "react";
import styles from "./cardComponent.module.css";
import { useAppDispatch } from "../../app/hooks";
import { removeCard, renameCard } from "./cardsSlice";

type cardComponentProps = {
    id: string;
    title: string;
    editing: boolean;
};

const CardComponent = ({ id, title, editing }: cardComponentProps) => {
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const dispatch = useAppDispatch();

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && title.trim()) {
            setIsTitleEditing(false);
        }
    };

    const handleBlur = () => {
        if (title.trim()) {
            setIsTitleEditing(false);
        }
    };

    return (
        <div className={styles.card} key={id}>
            <div className={styles.cardHeader}>
                {isTitleEditing ? (
                    <input
                        placeholder="Card title"
                        className={styles.cardTitleEditing}
                        autoFocus
                        onBlur={handleBlur}
                        onKeyDown={handleEnter}
                        value={title}
                        onChange={(e) =>
                            dispatch(
                                renameCard({ id: id, title: e.target.value })
                            )
                        }
                    />
                ) : (
                    <p
                        className={styles.cardTitle}
                        onClick={() => setIsTitleEditing(true)}
                    >
                        {title}
                    </p>
                )}
                {editing && (
                    <button
                        onClick={() => dispatch(removeCard({ id: id }))}
                        className={styles.deleteButton}
                    >
                        <p>Delete</p>
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardComponent;
