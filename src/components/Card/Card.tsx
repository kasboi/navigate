import styles from "./Card.module.css"
import Image from "next/image"
import lagos from "../../../public/lagos.jpg"

// import { ProgressBar } from "react-step-progress-bar"
const { ProgressBar } = require("react-step-progress-bar")

import { useState, useRef, useEffect } from "react"

import Skeleton from "../Skeleton/Skeleton"

import Link from "next/link"

//type declaration for each data
interface DataItem {
    name: string
    href: string
}
// type declaration for props
type Data = {
    href: string
    name: string
}[]
// type declaration for props
type AppProps = {
    data: Data
    filter: Data
    setFilter: (filter: any) => void
    showAfrica: boolean
}
// type declaration for slug(i.e city name)
type Slug = {
    href: string
}
// Card component to display each city data
const Card = ({ data, filter, setFilter, showAfrica }: AppProps) => {

    // state to hold data to be displayed and loading state for infinite scroll
    const [displayData, setDisplayData] = useState<DataItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // refs for infinite scroll and intersection observer
    const observerRef = useRef<HTMLDivElement | null>(null)
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

    // function to decode city name from slug to be used in link
    const handleLink = (slug: Slug) => {
        const input = slug.href.split(":").pop()
        return input
    }

    // useEffect to handle infinite scroll
    useEffect(() => {
        if (!intersectionObserverRef.current) {
            intersectionObserverRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsLoading(true)
                        setDisplayData((prevData) => [
                            ...prevData,
                            ...data.slice(
                                prevData.length,
                                prevData.length + 10
                            ),
                        ])
                        setIsLoading(false)
                    }
                },
                { root: null, rootMargin: "0px", threshold: 1.0 }
            )
        }
        // get the current observer
        const currentObserver = intersectionObserverRef.current
        // observe the ref element
        if (observerRef.current) {
            currentObserver.observe(observerRef.current)
        }
        // clean up function
        return () => {
            if (currentObserver) {
                currentObserver.disconnect()
            }
        }
    }, [data])

    return (
        <>
            {/* display filtered data only */}
            {filter.length > 0 && filterData(filter)}
            {/* display data from Africa only */}
            {!(filter.length > 0) && !showAfrica && filterData(displayData)}
            {/* display all data */}
            {!(filter.length > 0) && showAfrica && filterData(data)}
            {/* display skeleton loader on reaching end of page */}
            {isLoading && <Skeleton />}
            {/* div to observe intersection */}
            <div ref={observerRef} style={{ height: "1px", width: "1px" }} />
        </>
    )
    
    // function to display data
    function filterData(data: any) {
        return data.map((item: any, index: number) => (
            <div className={styles.card} key={index}>
                <div className={styles.card__image}>
                    <Image
                        src={lagos}
                        alt="Lagos"
                        className={styles.card__imageChild}
                    />
                </div>
                <div className={styles.card__description}>
                    <span className={styles.card__headColor}></span>
                    <div className={styles.card__area}>
                        <h1 className={styles.card__area_name}>{item.name}</h1>
                        <div>
                            <p className={styles.card__area_details}>
                                Life Quality Score:
                            </p>
                            <div className={styles.card__scoreParent}>
                                <p>Cost of living - ??</p>
                                <ProgressBar
                                    percent={70}
                                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                />
                            </div>
                            <div className={styles.card__scoreParent}>
                                <p>Education - ??</p>
                                <ProgressBar
                                    percent={50}
                                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                />
                            </div>
                            <div className={styles.card__scoreParent}>
                                <p>Economy - ??</p>
                                <ProgressBar
                                    percent={40}
                                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                />
                            </div>
                        </div>
                        <div>
                            <p className={styles.card__area_details}>
                                Average Salary:
                            </p>
                            <div className={styles.card__scoreParent}>
                                <p>Software Engineer - $??,000</p>
                            </div>
                        </div>
                        <div className={styles.card__btn_parent}>
                            <Link
                                href={`/city/${handleLink(item)}`}
                                className={styles.card__btn}
                            >
                                More Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
}

export default Card
