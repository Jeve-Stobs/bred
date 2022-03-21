use crate::utils::{fetcher, scraper};
use serde_json::json;

pub fn get_data() -> serde_json::Value {
    let to_fetch = vec![
        "unrate",
        "u6rate",
        "cpiaucsl",
        "dfii10",
        "usepuindxd",
        "smu06000004244530001",
        "icsa",
        "payems",
        "stlppmdef",
        "pcepi",
    ];
    let mut obs = Vec::new();
    for i in to_fetch {
        let obs_i = fetcher::get_observations(i);
        obs.push(obs_i);
    }
    // push each observation in it's own vector and fetch the value
    let mut values = Vec::new();
    for obs in obs {
        let mut v = Vec::new();
        for o in obs.observations {
            v.push(o.value);
        }
        values.push(v);
    }
    let data = json!({
        "US02Y": {
            "previous": scraper::wsj_bond("https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD02Y/historical-prices", ".data_data", 5),
            "value": scraper::wsj_bond("https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD02Y/historical-prices", "#quote_val", 0),
        },
          "US10Y": {
            "previous": scraper::wsj_bond("https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD10Y/historical-prices", ".data_data", 5),
            "value": scraper::wsj_bond("https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD10Y/historical-prices", "#quote_val", 0),
        },
        "unemployment": {
            "fudged": values[0][values[0].len() - 1],
            "real": values[1][values[1].len() - 1],
            "lastMonth": values[0][values[0].len() - 2],

        },
        "cpi" : {
            "new": values[2][values[2].len() - 1],
            "old": values[2][values[2].len() - 13],
            "lastMonth": values[2][values[2].len() - 2],
        },
        "realRates": {
            "new": values[3][values[3].len() - 1],
            "old": values[3][values[3].len() - 2],
        },
        "policy" : {
            "new": values[4][values[4].len() - 1],
            "old": values[4][values[4].len() - 2],
        },
        "alcohol": {
            "new": values[5][values[5].len() - 1],
            "old": values[5][values[5].len() - 2],
        },
        "claims": {
            "new": values[6][values[6].len() - 1],
            "old": values[6][values[6].len() - 2],
        },
        "payroll": {
            "new": values[7][values[7].len() - 1],
            "old": values[7][values[7].len() - 2],
        },
        "deflation": {
            "new": values[8][values[8].len() - 1],
            "old": values[8][values[8].len() - 2],
        },
        "inflation": {
            "new": values[9][values[9].len() - 1],
            "old": values[9][values[9].len() - 12],
            "lastMonth": values[9][values[9].len() - 2],
        },
    });
    return data;
}
