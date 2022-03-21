use fred_rs::client::FredClient;

pub fn make_client() -> FredClient {
    let mut c = match FredClient::new() {
        Ok(c) => c,
        Err(msg) => {
            println!("{}", msg);
            return FredClient::new().unwrap();
        }
    };
    c.with_key(dotenv!("FRED_API_KEY"));
    return c;
}
