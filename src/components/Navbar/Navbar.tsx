import {
    AdjustmentsVerticalIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid"
import { useRef, useState } from "react"
import styles from "./Navbar.module.css"

type Data = {
    href: string
    name: string
    length: number
}[]

type AppProps = {
    setFilter: (filter: any) => void
    data: Data
    isLoading: boolean
    showAfrica: boolean
    setshowAfrica: (showAfrica: boolean) => void
}

const Navbar = ({
    setFilter,
    data,
    isLoading,
    showAfrica,
    setshowAfrica,
}: AppProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [continent, setContinent] = useState("Continents")
    const [dropdown, setDropdown] = useState(false)

    const handleFilterData = () => {
        if (!inputRef.current) return
        const input = inputRef.current.value
        if (typeof input === "string" && input.trim().length > 0) {
            setFilter(
                data.filter(
                    (str) =>
                        str.name.toLowerCase().indexOf(input.toLowerCase()) !==
                        -1
                )
            )
        } else {
            setFilter([])
        }
    }

    const handleContinent = (str: string) => {
        setContinent(str)
        str === "Africa" ? setshowAfrica(true) : setshowAfrica(false)
        setDropdown(false)
    }

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.navbar}>
                    {/* Dropdown button for selecting continents */}
                    <div className={styles.dropdown__container}>
                        <button
                            className={styles.nav__dropdown}
                            onClick={() => setDropdown(!dropdown)}
                        >
                            {continent}
                            <AdjustmentsVerticalIcon
                                className={styles.nav__filterIcon}
                            />
                        </button>
                        {dropdown && (
                            <div className={styles.dropdown__menu}
                            >
                                <div
                                    className={styles.dropdown__text}
                                    onClick={() => handleContinent("All")}
                                >
                                    All
                                </div>
                                <div
                                    className={styles.dropdown__text}
                                    onClick={() => handleContinent("Africa")}
                                >
                                    Africa
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Search input - Filter data as user inputs */}
                    <div className={styles.nav__inputParent}>
                        <input
                            type="text"
                            className={styles.nav__input}
                            ref={inputRef}
                            onChange={handleFilterData}
                            // value={area}
                            // onChange={(e) => handleFilter(e)}
                            placeholder="Search for area..."
                            disabled={isLoading || showAfrica}
                        />
                        <MagnifyingGlassIcon
                            className={styles.nav__searchIcon}
                        />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
