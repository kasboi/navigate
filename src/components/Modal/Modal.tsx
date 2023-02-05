import styles from "@/styles/Home.module.css"
import React, { useState, useRef } from "react"

interface Props {
    children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            {isOpen && (
                <div className={styles.modal__overlay}>
                    <div className={styles.modal} ref={modalRef}>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Et repellat eligendi suscipit laboriosam
                            distinctio architecto consequuntur quos obcaecati
                            accusantium quis enim quasi expedita eveniet iusto
                            dicta, impedit quia qui assumenda?
                        </p>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Quos nihil deserunt quia, quo voluptates
                            cupiditate? Aliquid illum iste quo perferendis in.
                            Nobis, rerum nihil suscipit adipisci quos delectus
                            dicta atque?
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
