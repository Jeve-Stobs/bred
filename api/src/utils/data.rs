use crate::utils::{fetcher, structs::Welcome};
use serde_json::json;
use std::{
    collections::HashMap,
    time::{SystemTime, UNIX_EPOCH},
};

pub fn get_wsj() -> serde_json::Value {
    let mut params = HashMap::new();
    params.insert("id", r#"{"application":"WSJ","instruments":[{"symbol":"BOND/BX//TMUBMUSD02Y","name":"U.S. 2 Year Treasury Note"}, {"symbol":"BOND/BX//TMUBMUSD10Y","name":"U.S. 10 Year Treasury Note"}, {"symbol": "INDEX/US//VIX", "name": "CBOE Volatility Index "}]}"#);
    params.insert("type", "mdc_quotes");
    let response = attohttpc::get("https://www.wsj.com/market-data")
        .header_append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36")
        .params(&params)
        .send()
        .unwrap();
    let w: Welcome = response.json().unwrap();
    return json!({
        "US2Y": {
            "change": w.data.instruments[0].price_change,
            "last":    w.data.instruments[0].last_price,
        },
        "US10Y": {
            "change": w.data.instruments[1].price_change,
            "last":    w.data.instruments[1].last_price,
        },
        "vix": {
            "change": w.data.instruments[2].price_change,
            "last":    w.data.instruments[2].last_price,
        },
    });
}

pub fn get_fred() -> serde_json::Value {
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
        "cclacbw027sbog",
        "psavert",
        "bamlh0a0hym2",
        "t5yifr",
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
    return json!({
        "unemployment": {
            "unrate": values[0][values[0].len() - 1],
            "u6rate": values[1][values[1].len() - 1],
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
            "twoMonthsAgo": values[6][values[6].len() - 3],
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
        "consumer" : {
            "new": values[13][values[13].len() - 1],
            "old": values[13][values[13].len() - 2],
        },
        "personal" : {
            "new": values[14][values[14].len() - 1],
            "old": values[14][values[14].len() - 2],
        },
        "creditspreads":
        {
            "new": values[15][values[15].len() - 1],
            "old": values[15][values[15].len() - 2],
        },
        "expectations": {
            "new": values[16][values[16].len() - 1],
            "old": values[16][values[16].len() - 2],
        },
        "lastupdated": SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis().to_string()
    });
}
