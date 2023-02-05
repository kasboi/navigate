import Head from "next/head"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"

import "react-step-progress-bar/styles.css"

import Navbar from "@/components/Navbar/Navbar"
import Header from "@/components/Header/Header"
import Card from "@/components/Card/Card"
import Skeleton from "@/components/Skeleton/Skeleton"

import { useQuery } from "@tanstack/react-query"
import Modal from "@/components/Modal/Modal"

export default function Home() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['urbanData'],
        queryFn: () =>
          fetch(' https://api.teleport.org/api/urban_areas/').then(
            (res) => res.json(),
          ),
      })
    return (
        <>
            <Head>
                <title>Home - Urban Areas</title>
                <meta name="description" content="Teleport Open API" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Navbar />
            <Header />
            <main className={styles.main}>
                <div className={styles.card__grid}>
                    {isLoading && <Skeleton />}
                    {data && <Card data={data["_links"]["ua:item"]}/>}
                </div>
            </main> */}
            <Modal />
        </>
    )
}
