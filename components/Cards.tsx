import React, { FunctionComponent } from 'react'
import styles from '../styles/Home.module.css'
import SmoothCollapse from 'react-smooth-collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

type CardProps = {
	title: string
	indicator: string
	a: number
	b: number
	symbol: string
	time: string
}

const Card: FunctionComponent<CardProps> = ({
	title,
	indicator,
	a,
	b,
	symbol,
	time
}) => {
	const [show, setShow] = useState(false)
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
					{indicator}:&nbsp;
					<span className={getClassName(a, b)}>
						{getFlooredFixed(a * 100, 2)} {symbol}
					</span>
				</div>
				<div className={styles.card_footer}>
					{upOrDown(a, b)} {getFlooredFixed(Math.abs(a - b) * 100, 2)} {symbol}{' '}
					from {time}
				</div>
			</SmoothCollapse>
		</div>
	)
}
export default Card
function getPercentageChange(
	newNum: number,
	oldNum: number,
	absolute: boolean
) {
	if (absolute) {
		return Math.abs(((newNum - oldNum) / oldNum) * 100)
	}
	return ((newNum - oldNum) / oldNum) * 100
}

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

/* https://stackoverflow.com/a/36862114/15698722 */
function getFlooredFixed(v: number, d: number) {
	return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)
}
