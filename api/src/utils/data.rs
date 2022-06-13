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
        "icsa",
        "payems",
        "pcepi",
        "mortgage30us",
        "emratio",
        "recprousm156n",
        "a191rl1q225sbea",
        "walcl",
    ];
    let wsj_to_fetch = vec![
        "https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD10Y",
        "https://www.wsj.com/market-data/quotes/bond/BX/TMUBMUSD02Y",
        "https://www.wsj.com/market-data/quotes/index/VIX",
    ];
    let mut obs = Vec::new();
    for i in to_fetch {
        let obs_i = fetcher::get_observations(i, "2021-01-01");
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
    // loop through wsj_to_fetch and fetch the quote_value as well as the quote_change and push them to a vector
    let mut wsj_values = Vec::new();
    for url in wsj_to_fetch {
        let mut v = Vec::new();
        let quote_value = scraper::wsj(url, "#quote_val").parse::<f64>().unwrap();
        let quote_change = scraper::wsj(url, "#quote_change").parse::<f64>().unwrap();
        v.push(quote_value);
        v.push(quote_change);
        wsj_values.push(v);
    }
    let data = json!({
        "US10Y": {
            "previous": wsj_values[0][0] - wsj_values[0][1],
            "value": wsj_values[0][0],
        },
        "US02Y": {
            "previous": wsj_values[1][0] - wsj_values[1][1],
            "value": wsj_values[1][0],
        },
        "vix" : {
            "previous": wsj_values[2][0] - wsj_values[2][1],
            "value": wsj_values[2][0],
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
        "rates": {
            "new": values[3][values[3].len() - 1],
            "old": values[3][values[3].len() - 2],
        },
        "policy" : {
            "new": values[4][values[4].len() - 1],
            "old": values[4][values[4].len() - 2],
        },
        "claims": {
            "new": values[5][values[5].len() - 1],
            "old": values[5][values[5].len() - 2],
        },
        "payroll": {
            "new": values[6][values[6].len() - 1],
            "old": values[6][values[6].len() - 2],
        },
        "inflation": {
            "new": values[7][values[7].len() - 1],
            "old": values[7][values[7].len() - 12],
            "lastMonth": values[7][values[7].len() - 2],
        },
        "mortgage30us": {
            "new": values[8][values[8].len() - 1],
            "old": values[8][values[8].len() - 2],
        },
        "emratio": {
            "new": values[9][values[9].len() - 1],
            "old": values[9][values[9].len() - 2],
        },
        "recp" : {
            "new": values[10][values[10].len() - 1],
            "old": values[10][values[10].len() - 2],
        },
        "realgdp" : {
            "new": values[11][values[11].len() - 1],
            "old": values[11][values[11].len() - 2],
        },
        "balancesheet" : {
            "new": values[12][values[12].len() - 1],
            "old": values[12][values[12].len() - 2],
        },
        "lastupdated": SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis().to_string()
    });
    data
}
