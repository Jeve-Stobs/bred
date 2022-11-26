use fred_rs::client::FredClient;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Config {
    fred_key: String,
}

fn read_config() -> std::io::Result<Config> {
    let config_file = std::fs::read_to_string("Config.toml")?;
    let config: Config = toml::from_str(&config_file)?;
    Ok(config)
}

pub fn make_client() -> FredClient {
    let config: Config = read_config().unwrap();
    let mut client: FredClient = FredClient::new().unwrap();
    client.with_key(&config.fred_key);
    return client;
}
