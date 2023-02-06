import styles from "./ProgressBar.module.css"

type AppProps = {
    percent: number
    backgroundColor: string
}

const Score = ({percent, backgroundColor}: AppProps) => {
    // const width = 50
    // const backgroundColor = "red"
    return (
        <>
            <div className={styles.parent}>
                <div className={styles.child} style={{width: `${percent}%`, backgroundColor: `${backgroundColor}`}}>bar</div>
            </div>
        </>
    )
}

export default Score
