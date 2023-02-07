import Image from "next/image";
import ProgressBar from "../ProgressBar/ProgressBar"
import styles from "./Card.module.css";

const Intersection = () => {
  return ( 
    <>
                    displayData.map((item, index: number) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.card__image}>
                            <Image
                                src={lagos}
                                alt="Lagos"
                                className={styles.card__imageChild}
                            />
                        </div>
                        <div className={styles.card__description}>
                            <span className={styles.card__headColor}></span>
                            <div className={styles.card__area}>
                                <h1 className={styles.card__area_name}>
                                    {item.name}
                                </h1>
                                <div>
                                    <p className={styles.card__area_details}>
                                        Life Quality Score:
                                    </p>
                                    <div className={styles.card__scoreParent}>
                                        <p>Cost of living - ??</p>
                                        <ProgressBar
                                            percent={70}
                                            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        />
                                    </div>
                                    <div className={styles.card__scoreParent}>
                                        <p>Education - ??</p>
                                        <ProgressBar
                                            percent={50}
                                            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        />
                                    </div>
                                    <div className={styles.card__scoreParent}>
                                        <p>Economy - ??</p>
                                        <ProgressBar
                                            percent={40}
                                            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        />
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
                                        className={styles.card__btn}
                                        onClick={() => handleSlug(item)}
                                        disabled={btnLoading}
                                    >
                                        More Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    </>
   );
}
 
export default Intersection;