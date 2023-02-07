import Head from "next/head"

import styles from "@/styles/Home.module.css"

import "react-step-progress-bar/styles.css"

import Navbar from "@/components/Navbar/Navbar"
import Header from "@/components/Header/Header"
import Card from "@/components/Card/Card"
import Skeleton from "@/components/Skeleton/Skeleton"

import { useQuery } from "@tanstack/react-query"

import { useState } from "react"

const fetchAllUrbanAreas = async () => {
    const res = await fetch("https://api.teleport.org/api/urban_areas/")
    return res.json()
}

const fetchAfricaUrbanAreas = async () => {
    const res = await fetch(
        "https://api.teleport.org/api/continents/geonames:AF/urban_areas/"
    )
    return res.json()
}

export default function Home() {
    //Show Africa data
    const [showAfrica, setShowAfrica] = useState(false)
    const [areaData, setAreaData] = useState([])

    // React-query hook to fetch data from the API
    const { isLoading, error, data } = useQuery({
        queryKey: ["urbanData"],
        queryFn: fetchAllUrbanAreas,
    })
    // Africa
    const {
        isLoading: africaLoading,
        error: africaError,
        data: africaData,
    } = useQuery({
        queryKey: ["africaData"],
        queryFn: fetchAfricaUrbanAreas,
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
                showAfrica={showAfrica}
                setshowAfrica={setShowAfrica}
            />
            {/* Reusable Header component - Primary & Secondary heading */}
            <Header />

            {/* Main container */}
            <main className={styles.main}>
                <div className={styles.card__grid}>
                    {/* Displays a skeleton loader when the data is being fetched */}
                    {isLoading && <Skeleton />}

                    {/* Displays the data when the data is fetched */}
                    {data && africaData && (
                        // Reusable Card component
                        <Card
                            data={
                                showAfrica
                                    ? africaData["_links"]["ua:items"]
                                    : data["_links"]["ua:item"]
                            }
                            filter={filter}
                            setFilter={setFilter}
                            showAfrica={showAfrica}
                        />
                    )}
                </div>
            </main>
            {/* <Modal /> */}
        </>
    )
}
