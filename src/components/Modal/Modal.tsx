import { NextPage } from "next"
import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import styles from "./Modal.module.css"
import lagos from "../../../public/lagos_web.jpg"
import { useQuery } from "@tanstack/react-query"

const { ProgressBar } = require("react-step-progress-bar")

//Declaring types for props
interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    slug: string
    // setSlug: (slug: string) => void
}

const MyModal: NextPage<Props> = ({ isOpen, setIsOpen, slug }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    const {isLoading, data: imgData} = useQuery({
        queryKey: ['urbanImg'],
        queryFn: () =>
          fetch(`${slug}/images/`).then(
            (res) => res.json(),
          ),
      })

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    if (imgData) {
        console.log(imgData);
    }

    // useEffect(() => {
        
    // }, [slug])
    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div ref={modalRef} className={styles.modalContent}>
                        <div className={styles.card__img}>
                            <Image
                                src={imgData ? imgData.photos[0].image.web : lagos}
                                alt="lagos"
                                className={styles.card__imageChild}
                            />
                        </div>
                        <div className={styles.life__quality}>
                            <h2 className={styles.quality__heading}>Life Quality Score</h2>
                            <ul className={styles.quality__list_parent}>
                                <li className={styles.quality__list}>
                                    <span>Health:</span>
                                    <ProgressBar
                                        percent={70}
                                        width={'100%'}
                                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                    /> 
                                    <span>7.0</span>
                                    </li>
                                <li className={styles.quality__list}>Education: 7.5</li>
                            </ul>
                        </div>
                        <div className={styles.life__quality}>
                            <h2 className={styles.quality__heading}>Average Salary</h2>
                            <ul className={styles.quality__list_parent}>
                                <li className={styles.quality__list}>Software Engineer: $25,000</li>
                                <li className={styles.quality__list}>Lawyer: $15,000</li>
                            </ul>
                        </div>
                        
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default MyModal
