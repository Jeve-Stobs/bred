import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Error: NextPage = (statusCode) => {
	return (
		<div className={styles.error_main}>
			<div className={styles.error_main_nested}>
				<div className={styles.error_main_text}>
					{`An error ${statusCode} occurred on server`}
				</div>
			</div>
		</div>
	)
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
