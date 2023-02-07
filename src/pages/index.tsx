import Head from "next/head"

import styles from "@/styles/Home.module.css"

import "react-step-progress-bar/styles.css"

import Navbar from "@/components/Navbar/Navbar"
import Header from "@/components/Header/Header"
import Card from "@/components/Card/Card"
import Skeleton from "@/components/Skeleton/Skeleton"

import { useQuery } from "@tanstack/react-query"

import { useState } from "react"

export default function Home() {
    // React-query hook to fetch data from the API
    const { isLoading, error, data } = useQuery({
        queryKey: ["urbanData"],
        queryFn: () =>
            fetch(" https://api.teleport.org/api/urban_areas/").then((res) =>
                res.json()
            ),
    })
    // State to filter the data
    const [filter, setFilter] = useState([])

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
            {/* Reusable Navbar component */}
            <Navbar
                setFilter={setFilter}
                data={data ? data["_links"]["ua:item"] : []}
                isLoading={isLoading}
            />
            {/* Reusable Header component - Primary & Secondary heading */}
            <Header />

            {/* Main container */}
            <main className={styles.main}>
                <div className={styles.card__grid}>
                    {/* Displays a skeleton loader when the data is being fetched */}
                    {isLoading && <Skeleton />}

                    {/* Displays the data when the data is fetched */}
                    {data && (
                        // Reusable Card component
                        <Card
                            data={data["_links"]["ua:item"]}
                            filter={filter}
                            setFilter={setFilter}
                        />
                    )}
                </div>
            </main>
            {/* <Modal /> */}
        </>
    )
}
