use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Welcome {
    id: String,
    #[serde(rename = "type")]
    welcome_type: String,
    data: Data,
    hash: String,
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub instruments: Vec<Instrument>,
    #[serde(rename = "latestTimestamp")]
    latest_timestamp: String,
    timestamp: String,
}

#[derive(Serialize, Deserialize)]
pub struct Instrument {
    #[serde(rename = "bluegrassChannel")]
    bluegrass_channel: BluegrassChannel,
    bond: Option<Bond>,
    country: String,
    #[serde(rename = "dailyHigh")]
    daily_high: f64,
    #[serde(rename = "dailyLow")]
    daily_low: f64,
    #[serde(rename = "exchangeIsoCode")]
    exchange_iso_code: String,
    #[serde(rename = "formattedName")]
    formatted_name: String,
    #[serde(rename = "lastPrice")]
    pub last_price: String,
    mantissa: i64,
    name: String,
    #[serde(rename = "priceChange")]
    pub price_change: String,
    #[serde(rename = "percentChange")]
    percent_change: String,
    #[serde(rename = "requestSymbol")]
    request_symbol: String,
    ticker: String,
    timestamp: String,
    #[serde(rename = "type")]
    instrument_type: String,
    url: String,
}

#[derive(Serialize, Deserialize)]
pub struct BluegrassChannel {
    channel: String,
    #[serde(rename = "type")]
    bluegrass_channel_type: String,
}

#[derive(Serialize, Deserialize)]
pub struct Bond {
    #[serde(rename = "couponRate")]
    coupon_rate: f64,
    #[serde(rename = "formattedTradePriceChange")]
    formatted_trade_price_change: String,
    #[serde(rename = "tradePrice")]
    trade_price: String,
    #[serde(rename = "tradePriceChange")]
    trade_price_change: TradePriceChange,
    #[serde(rename = "tradePriceChangePercent")]
    trade_price_change_percent: f64,
    #[serde(rename = "yield")]
    bond_yield: String,
    #[serde(rename = "yieldChange")]
    yield_change: String,
}

#[derive(Serialize, Deserialize)]
pub struct TradePriceChange {
    display: String,
    value: String,
    sign: String,
}
