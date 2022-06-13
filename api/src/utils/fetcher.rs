use crate::client;
use fred_rs::series::observation::{Builder, Response};

pub fn get_observations(series_id: &str, start_date: &str) -> Response {
    let mut c = client::make_client();

    let mut builder = Builder::new();
    builder.observation_start(start_date);

    let resp: Response = match c.series_observation(series_id, Some(builder)) {
        Ok(resp) => resp,
        Err(msg) => {
            dbg!("{}", msg);
            return Response::default();
        }
    };
    return resp;
}
