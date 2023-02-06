import Header from "@/components/Header/Header"
import { useRouter } from "next/router"
import styles from "./City.module.css"
import { InferGetServerSidePropsType } from "next"
import { GetServerSideProps } from "next"
import ProgressBar from "@/components/ProgressBar/ProgressBar"
import Image from "next/image"

type Image = {
    web: string
    mobile: string
}

type Score = {
    name: string
    score_out_of_10: number
    color: string
}[]

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

type AppProps = {
    img: Image
    score: Score
    salaries: Salaries
}

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

const fetchScore = async (slug: string) => {
    const res = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${slug}/scores`
    )
    const data = await res.json()
    return data.categories
}

const fetchSalaries = async (slug: string) => {
    const res = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${slug}/salaries/`
    )
    const data = await res.json()
    return data.salaries
}

const handleCurrency = (num: number) => {
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    })
}

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

const UrbanArea = ({ img, score, salaries }: AppProps) => {
    const router = useRouter()
    const { slug } = router.query

    const handleTitle = (title: any): string => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    return (
        <>
            <Header />
            <div className={styles.card__container}>
                <img src={img.web} alt="city" className={styles.card__image} />
                <h1 className={styles.card__heading}>- {handleTitle(slug)} -</h1>
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
                    <button className={styles.button} onClick={() => router.push('/')}>back</button>
                </div>
            </div>
        </>
    )
}

export default UrbanArea
