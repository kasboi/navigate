import { AdjustmentsVerticalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                    <button className={styles.nav__dropdown}>
                        Continents
                        <AdjustmentsVerticalIcon
                            className={styles.nav__filterIcon}
                        />
                    </button>
                    <div className={styles.nav__inputParent}>
                        <input
                            type="text"
                            className={styles.nav__input}
                            placeholder="Search for area..."
                        />
                        <MagnifyingGlassIcon
                            className={styles.nav__searchIcon}
                        />
                    </div>
                    {/* <button className={styles.nav__avatar}>Avatar</button> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar
