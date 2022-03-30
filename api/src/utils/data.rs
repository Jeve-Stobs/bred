use crate::utils::{fetcher, scraper};
use serde_json::json;
use std::time::{SystemTime, UNIX_EPOCH};

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
    let ten_year = scraper::wsj_bond(
        "https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD10Y/historical-prices",
        "#quote_val",
    );
    let ten_year = ten_year.parse::<f64>().unwrap();
    let ten_year_change = scraper::wsj_bond(
        "https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD10Y/historical-prices",
        "#quote_change",
    );
    let ten_year_change = ten_year_change.parse::<f64>().unwrap();
    let two_year = scraper::wsj_bond(
        "https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD02Y/historical-prices",
        "#quote_val",
    );
    let two_year = two_year.parse::<f64>().unwrap();
    let two_year_change = scraper::wsj_bond(
        "https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD02Y/historical-prices",
        "#quote_change",
    );
    let two_year_change = two_year_change.parse::<f64>().unwrap();
    let data = json!({
        "US02Y": {
            "previous": two_year - two_year_change,
            "value": two_year,
        },
          "US10Y": {
            "previous": ten_year - ten_year_change,
            "value": ten_year,
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
        "lastupdated": SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis().to_string()
    });
    return data;
}
