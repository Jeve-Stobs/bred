use crate::client;
use fred_rs::{series::observation::{Builder, Response}, client::FredClient};
use paris::error;

pub fn get_observations(series_id: &str, start_date: &str) -> Response {
    let mut c: FredClient = client::make_client();

    let mut builder: Builder = Builder::new();
    builder.observation_start(start_date);

    let resp: Response = match c.series_observation(series_id, Some(builder)) {
        Ok(resp) => resp,
        Err(msg) => {
            error!("{}", msg);
            return Response::default();
        }
    };
    return resp;
}