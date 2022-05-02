import { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Citations: NextPage = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Citations</h1>
				<div className={styles.grid}>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Labor Statistics, Unemployment Rate [UNRATE],
						retrieved from FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/UNRATE, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Labor Statistics, Total Unemployed, Plus All Persons
						Marginally Attached to the Labor Force, Plus Total Employed Part
						Time for Economic Reasons, as a Percent of the Civilian Labor Force
						Plus All Persons Marginally Attached to the Labor Force (U-6)
						[U6RATE], retrieved from FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/U6RATE, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Labor Statistics, Consumer Price Index for All Urban
						Consumers: All Items in U.S. City Average [CPIAUCSL], retrieved from
						FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/CPIAUCSL, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						Board of Governors of the Federal Reserve System (US), Market Yield
						on U.S. Treasury Securities at 10-Year Constant Maturity,
						Inflation-Indexed [DFII10], retrieved from FRED, Federal Reserve
						Bank of St. Louis; https://fred.stlouisfed.org/series/DFII10, May 2,
						2022.
					</h2>
					<h2 className={styles.citation_title}>
						Baker, Scott R., Bloom, Nick and Davis, Stephen J., Economic Policy
						Uncertainty Index for United States [USEPUINDXD], retrieved from
						FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/USEPUINDXD, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Employment and Training Administration, Initial Claims [ICSA],
						retrieved from FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/ICSA, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Labor Statistics, All Employees, Total Nonfarm
						[PAYEMS], retrieved from FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/PAYEMS, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Economic Analysis, Personal Consumption Expenditures:
						Chain-type Price Index [PCEPI], retrieved from FRED, Federal Reserve
						Bank of St. Louis; https://fred.stlouisfed.org/series/PCEPI, May 2,
						2022.
					</h2>
					<h2 className={styles.citation_title}>
						Freddie Mac, 30-Year Fixed Rate Mortgage Average in the United
						States [MORTGAGE30US], retrieved from FRED, Federal Reserve Bank of
						St. Louis; https://fred.stlouisfed.org/series/MORTGAGE30US, May 2,
						2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Labor Statistics, Employment-Population Ratio
						[EMRATIO], retrieved from FRED, Federal Reserve Bank of St. Louis;
						https://fred.stlouisfed.org/series/EMRATIO, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						Chauvet, Marcelle and Piger, Jeremy Max, Smoothed U.S. Recession
						Probabilities [RECPROUSM156N], retrieved from FRED, Federal Reserve
						Bank of St. Louis; https://fred.stlouisfed.org/series/RECPROUSM156N,
						May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						U.S. Bureau of Economic Analysis, Real Gross Domestic Product
						[A191RL1Q225SBEA], retrieved from FRED, Federal Reserve Bank of St.
						Louis; https://fred.stlouisfed.org/series/A191RL1Q225SBEA, May 2,
						2022.
					</h2>
					<h2 className={styles.citation_title}>
						Board of Governors of the Federal Reserve System (US), Assets: Total
						Assets: Total Assets (Less Eliminations from Consolidation):
						Wednesday Level [WALCL], retrieved from FRED, Federal Reserve Bank
						of St. Louis; https://fred.stlouisfed.org/series/WALCL, May 2, 2022.
					</h2>
					<h2 className={styles.citation_title}>
						Journal, W. S. (n.d.). TMUBMUSD10Y | U.S. 10 Year treasury note
						price &amp; news - WSJ. The Wall Street Journal. Retrieved May 2,
						2022, from
						https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD10Y
					</h2>
					<h2 className={styles.citation_title}>
						Journal, W. S. (n.d.). TMUBMUSD02Y | U.S. 2 Year treasury note price
						&amp; news - WSJ. The Wall Street Journal. Retrieved May 2, 2022,
						from https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD02Y
					</h2>
					<h2 className={styles.citation_title}>
						Journal, W. S. (n.d.). Vix | CBOE volatility index stock prices and
						charts - WSJ. The Wall Street Journal. Retrieved May 2, 2022, from
						https://www.wsj.com/market-data/quotes/index/VIX
					</h2>
				</div>
			</main>
		</div>
	)
}

export default Citations
