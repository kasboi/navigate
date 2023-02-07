import Header from "@/components/Header/Header"
import { useRouter } from "next/router"
import styles from "./City.module.css"
import { InferGetServerSidePropsType } from "next"
import { GetServerSideProps } from "next"
import ProgressBar from "@/components/ProgressBar/ProgressBar"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import Head from "next/head"

// type declaration for city image
type Image = {
    web: string
    mobile: string
}
// type declaration for props - city score
type Score = {
    name: string
    score_out_of_10: number
    color: string
}[]
// type declaration for props - city avg. salaries
type Salaries = {
    job: {
        name: string
        title: string
        code: string
    }
    salary_percentiles: {
        percentile_25: number
        percentile_50: number
        percentile_75: number
    }
}[]
// type declaration for props
type AppProps = {
    img: Image
    score: Score
    salaries: Salaries
}
// function to fetch city image
const fetchImage = async (slug: string) => {
    const res = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${slug}/images/`
    )
    const data = await res.json()

    return {
        web: data.photos[0].image.web,
        mobile: data.photos[0].image.mobile,
    }
}
// function to fetch city score
const fetchScore = async (slug: string) => {
    const res = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${slug}/scores`
    )
    const data = await res.json()
    return data.categories
}
// function to fetch city avg. salaries
const fetchSalaries = async (slug: string) => {
    const res = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${slug}/salaries/`
    )
    const data = await res.json()
    return data.salaries
}
// function to convert number to appropriate currency format
const handleCurrency = (num: number) => {
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    })
}
// gets data from api on server side
export const getServerSideProps: GetServerSideProps<{
    img: Image
    score: Score
    salaries: Salaries
}> = async (context: any) => {
    const { slug } = context.params

    const [img, score, salaries] = await Promise.all([
        fetchImage(slug),
        fetchScore(slug),
        fetchSalaries(slug),
    ])

    return {
        props: {
            img,
            score,
            salaries,
        },
    }
}
// renders fetched data to page
const UrbanArea = ({ img, score, salaries }: AppProps) => {
    // gets slug from url
    const router = useRouter()
    const { slug } = router.query

    // modal state and ref
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const modalRef = useRef<HTMLDivElement>(null)

    // function to close modal when clicking outside of modal
    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }
    // function to capitalize first letter of city name
    const handleTitle = (title: any): string => {
        return title.charAt(0).toUpperCase() + title.slice(1)
    }
    // hook to handle modal close button
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <>
            {/* Meta Information */}
            <Head>
                <title>City - Urban Area</title>
                <meta name="description" content="Teleport Open API" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <div className={styles.card__container}>
                <img
                    src={img.web}
                    alt="city"
                    className={styles.card__image}
                    onClick={() => setIsOpen(true)}
                />
                <span className={styles.picture__container}>
                    <em className={styles.picture__text}>
                        *click to view picture
                    </em>
                </span>
                <h1 className={styles.card__heading}>
                    - {handleTitle(slug)} -
                </h1>
                <h1 className={styles.card__heading}>Life Quality Score</h1>
                <ul className={styles.card__ul}>
                    {score.map((item, index: number) => (
                        <li key={index} className={styles.card__li}>
                            <h2 className={styles.card__li_name}>
                                {item.name}
                            </h2>
                            <ProgressBar
                                percent={Math.round(item.score_out_of_10) * 10}
                                backgroundColor={item.color}
                            />
                            <p className={styles.card__li_rating}>
                                {Math.floor(item.score_out_of_10)}
                            </p>
                            {/* <p>{item.color}</p> */}
                        </li>
                    ))}
                </ul>
                <h1 className={styles.card__heading}>Salary</h1>
                <ul className={styles.salary__ul}>
                    {salaries.map((item, index: number) => (
                        <li key={index} className={styles.salary__li}>
                            <h2 className={styles.salary__title}>
                                {item.job.title}
                            </h2>
                            <p className={styles.salary__range}>
                                {handleCurrency(
                                    item.salary_percentiles.percentile_50
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className={styles.button__container}>
                    <button
                        className={styles.button}
                        onClick={() => router.push("/")}
                    >
                        back
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className={styles.modal}>
                    <div ref={modalRef} className={styles.modal__content}>
                        <img
                            src={img.mobile}
                            alt="city"
                            className={styles.card__image}
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default UrbanArea
