import Header from "@/components/Header/Header"
import { useRouter } from "next/router"

import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'

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
  const res = await fetch(`https://api.teleport.org/api/urban_areas/slug:${slug}/images/`)
  const data = await res.json()

  return {web: data.photos[0].image.web, mobile: data.photos[0].image.mobile}
}

const fetchScore = async (slug: string) => {
  const res = await fetch(`https://api.teleport.org/api/urban_areas/slug:${slug}/scores`)
  const data = await res.json()
  return data.categories
}

const fetchSalaries = async (slug: string) => {
  const res = await fetch(`https://api.teleport.org/api/urban_areas/slug:${slug}/salaries/`)
  const data = await res.json()
  return data.salaries
}

export const getServerSideProps: GetServerSideProps<{ img: Image, score: Score, salaries: Salaries }> = async (context: any) => {

  const { slug } = context.params

  const [img, score, salaries] = await Promise.all([fetchImage(slug), fetchScore(slug), fetchSalaries(slug)])

  return {
    props: {
      img,
      score,
      salaries
    },
  }
}

const UrbanArea = ({img, score, salaries}: AppProps) => {
    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <Header />
            <h1>Life Quality</h1>
            <ul>
              {score.map((item, index: number) => (
                <li key={index}>
                  <h2>{item.name}</h2>
                  <p>{item.score_out_of_10}</p>
                  <p>{item.color}</p>
                </li>
              ))}
            </ul>
            <h1>Salary</h1>
            <ul>
              {salaries.map((item, index: number) => (
                <li key={index}>
                  <h2>{item.job.title}</h2>
                  <p>{item.salary_percentiles.percentile_50}</p>
                </li>
              ))}
            </ul>
        </>
    )
}

export default UrbanArea
