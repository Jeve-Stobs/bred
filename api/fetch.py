import os
import json
from fredapi import Fred
from dotenv import load_dotenv
from datetime import datetime
from dateutil.relativedelta import relativedelta
from tradingview_ta import *
# load env variables
load_dotenv()

# set date values
one_year_ago = (datetime.today() - relativedelta(months=13)).strftime('%Y/%m/%d')
today = datetime.today().strftime('%Y/%m/%d')

# set fred api key and initialize client
fred = Fred(api_key=os.getenv('FRED_API_KEY'))
unrate = fred.get_series('UNRATE', observation_start=one_year_ago, observation_end=today)
u6rate = fred.get_series('U6RATE', observation_start=one_year_ago, observation_end=today)
cpi = fred.get_series('CPIAUCSL', observation_start=one_year_ago, observation_end=today)
rates = fred.get_series('DFII10', observation_start=one_year_ago, observation_end=today)
policy = fred.get_series('USEPUINDXD', observation_start=one_year_ago, observation_end=today)
alcohol = fred.get_series('SMU06000004244530001', observation_start=one_year_ago, observation_end=today)
initial_claims = fred.get_series('ICSA', observation_start=one_year_ago, observation_end=today)
total_nonfarm_payroll = fred.get_series('PAYEMS', observation_start=one_year_ago, observation_end=today)
deflation_probability = fred.get_series('STLPPMDEF', observation_start=one_year_ago, observation_end=today)
key_inflation = fred.get_series('PCEPI', observation_start=one_year_ago, observation_end=today)

# fetch tradingview data for bond yields
analysis = get_multiple_analysis(screener="cfd", interval=Interval.INTERVAL_1_DAY, symbols=["TVC:US10Y", "TVC:US02Y"])
us10y_analysis = list(analysis.values())[0]
us02y_analysis = list(analysis.values())[-1]

index = {
            'US10Y' : {
                'value' : us10y_analysis.indicators["open"],
                'previous' : us10y_analysis.indicators["close"]

            },
            'US02Y' : {
                'value' : us02y_analysis.indicators["open"],
                'previous' : us02y_analysis.indicators["close"]

            },
            'unemployment' : {
                'fudged' : unrate.iloc[-1],
                'real' : u6rate.iloc[-1],
                'lastMonth' : unrate.iloc[-2],

            },
            'cpi' : {
                'new' : cpi.iloc[-1],
                'old' : cpi.iloc[0],
                'lastMonth' : cpi.iloc[-2],
            },
            'realRates' : {
                'new' : rates.iloc[-1],
                'old' : rates.iloc[-2],
            },
            'policy' : {
                'new' : policy.iloc[-1],
                'old' : policy.iloc[-2]
            },
            'alcohol' : {
                'new' : alcohol.iloc[-1],
                'old' : alcohol.iloc[-2]
            },
            'claims' : {
                'new' : initial_claims.iloc[-1],
                'old' : initial_claims.iloc[-2]
            },
            'payroll' : {
                'new' : total_nonfarm_payroll.iloc[-1],
                'old' : total_nonfarm_payroll.iloc[-2]
            },
            'deflation' : {
                'new' : deflation_probability.iloc[-1],
                'old' : deflation_probability.iloc[-2]
            },
            'inflation' : {
                'new' : key_inflation.iloc[-1],
                'old' : key_inflation.iloc[0],
                'lastMonth' : key_inflation.iloc[-2]
            },
}
# write to json file
with open('data.json', 'w') as outfile:
    json.dump(index, outfile)