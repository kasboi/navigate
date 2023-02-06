import styles from "./Card.module.css"
import Image from "next/image"
import lagos from "../../../public/lagos.jpg"

// import { ProgressBar } from "react-step-progress-bar"
const { ProgressBar } = require("react-step-progress-bar")

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Skeleton from "../Skeleton/Skeleton"
import MyModal from "../Modal/Modal"

interface DataItem {
    name: string
    href: string
}

interface Props {
    data: DataItem[]
}

type AppProps = {
    data: {
        href: string
        name: string
    }[]
}

type Slug = {
    href: string
}

const Card = ({ data }: AppProps) => {
    const [displayData, setDisplayData] = useState<DataItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    const observerRef = useRef<HTMLDivElement | null>(null)
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

    const router = useRouter()

    const handleSlug = (slug: Slug) => {
        const input = slug.href.split(":").pop()
        router.push(`/city/${input}`)
        setBtnLoading(true)
    }

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

        const currentObserver = intersectionObserverRef.current

        if (observerRef.current) {
            currentObserver.observe(observerRef.current)
        }

        return () => {
            if (currentObserver) {
                currentObserver.disconnect()
            }
        }
    }, [data])

    return (
        <>
            {displayData.map((item, index: number) => (
                <div className={styles.card}>
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
                            <h1 className={styles.card__area_name}>
                                {item.name}
                            </h1>
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
                                <button
                                    className={styles.card__btn}
                                    onClick={() => handleSlug(item)}
                                    disabled={btnLoading}
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* <MyModal isOpen={isOpen} setIsOpen={setIsOpen} slug={slug} /> */}
            {isLoading && <Skeleton />}
            <div ref={observerRef} style={{ height: "1px", width: "1px" }} />
        </>
    )
}

export default Card
