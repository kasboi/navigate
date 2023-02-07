import styles from "./Header.module.css"

// Reusable header component to display header
const Header = () => {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.title}>Urban Areas</h1>
                <p className={styles.description}>
                    Powered by Teleport Open API
                </p>
            </header>
        </>
    )
}

export default Header
