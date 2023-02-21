import styles from "./Skeleton.module.css"
import Image from "next/image"
import lagos from "../../../public/lagos.jpg"

const { ProgressBar } = require("react-step-progress-bar")


const seet: any = Array.from({length: 6})

const Skeleton = () => {
    return (
        <>
          {
            seet.map((item: any, index: number) => (
            <div className={styles.card} key={index+1} data-testid="skeleton-card">
                <div className={`${styles.card__image} ${styles.loading}`}>
                    {/* <Image
                        src={lagos}
                        alt="Lagos"
                        className={styles.card__imageChild}
                    /> */}
                </div>
                <div className={styles.card__description}>
                    <span className={styles.card__headColor}></span>
                    <div className={styles.card__area}>
                        <h1
                            className={`${styles.card__area_name} ${styles.loading}`}
                        >
                            Urban Area
                        </h1>
                        <div>
                            <p className={styles.card__area_details}>
                                Life Quality Score:
                            </p>
                            <div className={styles.card__scoreParent}>
                                <p>Cost of living - ??</p>
                                <div
                                    className={`${styles.progress__bar} ${styles.loading}`}
                                ></div>
                            </div>
                            <div className={styles.card__scoreParent}>
                                <p>Education - ??</p>
                                <div
                                    className={`${styles.progress__bar} ${styles.loading}`}
                                ></div>
                            </div>
                            <div className={styles.card__scoreParent}>
                                <p>Economy - ??</p>
                                <div
                                    className={`${styles.progress__bar} ${styles.loading}`}
                                ></div>
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
                                className={`${styles.card__btn} ${styles.loading}`}
                            >
                                Loading...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ))
          }
        </>
    )
}

export default Skeleton
