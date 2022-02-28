import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const FourOhFour: NextPage = () => {
	return (
		<div className={styles.error_main}>
			<div className={styles.error_main_nested}>
				<div className={styles.error_main_text}>
					A 404 error occurred on the server 😔
				</div>
			</div>
		</div>
	)
}

export default FourOhFour
