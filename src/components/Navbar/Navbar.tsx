import {
    AdjustmentsVerticalIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid"
import { useState } from "react"
import styles from "./Navbar.module.css"

type Data = {
    href: string
    name: string
}[]

type AppProps = {
    setFilter: (filter: any) => void
    data: Data
    isLoading: boolean
}

const Navbar = ({ setFilter, data, isLoading }: AppProps) => {
    const [area, setArea] = useState("")

    const handleFiter = (e: any) => {
        const val = e.target.value
        setArea(val)
        if (!(area.length < 1)) {
            const filtered = data.filter((item) => {
                return item.name.toLowerCase().includes(val.toLowerCase())
            })
            setFilter(filtered)
        }
    }
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
                            value={area}
                            onChange={(e) => handleFiter(e)}
                            placeholder="Search for area..."
                            disabled={isLoading}
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
