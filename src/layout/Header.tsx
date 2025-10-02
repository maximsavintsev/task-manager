import styles from "./Header.module.css";
import type { ReactNode } from "react";

type HeaderProps = {
    children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
    return <header className={styles.header}>{children}</header>;
};

export default Header;
