import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Error: NextPage = (statusCode) => {
	return (
		<div className={styles.error_main}>
			<div className={styles.error_main_nested}>
				<div className={styles.error_main_text}>
					{`An error occurred on server with status code ${statusCode}`}
				</div>
			</div>
		</div>
	)
}

export default Error
