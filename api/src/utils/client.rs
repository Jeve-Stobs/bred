use fred_rs::client::FredClient;
use serde::Deserialize;
use toml;

#[derive(Debug, Deserialize)]
struct Config {
    fred_key: String,
}

fn read_config() -> std::io::Result<Config> {
    let content = std::fs::read_to_string("Config.toml")?;
    Ok(toml::from_str(&content)?)
}

pub fn make_client() -> FredClient {
    let mut c = match FredClient::new() {
        Ok(c) => c,
        Err(msg) => {
            dbg!("{}", msg);
            return FredClient::new().unwrap();
        }
    };
    c.with_key(&read_config().unwrap().fred_key);
    return c;
}
