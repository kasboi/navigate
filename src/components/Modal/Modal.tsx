import styles from "@/styles/Home.module.css"
import { useState } from "react"
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            {isOpen && (
                <div className={styles.modal__overlay}>
                    <div className={styles.modal}>
                        <button onClick={() => setIsOpen(false)}>Close</button>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et repellat eligendi suscipit laboriosam distinctio architecto consequuntur quos obcaecati accusantium quis enim quasi expedita eveniet iusto dicta, impedit quia qui assumenda?</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos nihil deserunt quia, quo voluptates cupiditate? Aliquid illum iste quo perferendis in. Nobis, rerum nihil suscipit adipisci quos delectus dicta atque?</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
