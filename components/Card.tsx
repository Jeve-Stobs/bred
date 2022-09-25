import {
	FunctionComponent,
	Dispatch,
	useState,
	useEffect,
	SetStateAction
} from 'react'
import styles from '../styles/Home.module.css'
import SmoothCollapse from 'react-smooth-collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

type CardProps = {
	title: string
	indicator: string
	a: number
	b: number
	main: any
	footer: any
	symbol: string
	time: string
}

const Card: FunctionComponent<CardProps> = ({
	title,
	indicator,
	a,
	b,
	main,
	footer,
	symbol,
	time
}) => {
	const [show, setShow] = useStickyState(false, 'show')

	return (
		<div className={styles.card}>
			<button className={styles.button} onClick={() => setShow(!show)}>
				<div className={styles.icon}>
					{show ? (
						<FontAwesomeIcon icon={faMinus} />
					) : (
						<FontAwesomeIcon icon={faPlus} />
					)}
				</div>
				<h2 className={styles.card_title}>{title}</h2>
			</button>
			<SmoothCollapse allowOverflowWhenOpen={true} expanded={show}>
				<div className={styles.info}>
					{indicator}&nbsp;
					<span className={getClassName(a, b)}>
						{main}
						{symbol == 'bps' ? ` ${symbol}` : symbol}
					</span>
				</div>
				<div className={styles.card_footer}>
					{upOrDown(a, b)} {upOrDown(a, b) == 'UNCH' ? '' : footer}
					{upOrDown(a, b) == 'UNCH'
						? ''
						: symbol == 'bps'
						? ` ${symbol}`
						: symbol}{' '}
					from {time}
				</div>
			</SmoothCollapse>
		</div>
	)
}

export default Card

function getClassName(a: number, b: number) {
	if (a === b) {
		return styles.grey
	}
	if (a > b) {
		return styles.green
	}
	return styles.red
}

function upOrDown(a: number, b: number) {
	if (a === b) {
		return 'UNCH'
	}
	if (a > b) {
		return 'Up'
	}
	return 'Down'
}

function useStickyState<T>(
	defaultValue: T,
	key: string
): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState(() => {
		const stickyValue = window.localStorage.getItem(key)
		return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
	})
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])
	return [value, setValue]
}
