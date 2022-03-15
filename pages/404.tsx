import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const FourOhFour: NextPage = () => {
	return (
		<div className={styles.error_main}>
			<div className={styles.error_main_nested}>
				<div className={styles.error_main_text}>404 not found 🔎</div>
			</div>
		</div>
	)
}

export default FourOhFour
w
