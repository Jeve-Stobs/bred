use std::{
    fs,
    time::{Duration, Instant},
};

use actix::prelude::*;
use actix_web_actors::ws;
use serde_json::Value;

use crate::{utils, utils::data};
use paris::{error, info};

/// How often heartbeat pings are sent
const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);

/// How long before lack of client response causes a timeout
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

/// How often new data is being sent to the client
const NEW_DATA_INTERVAL: Duration = Duration::from_secs(1);

/// websocket connection is long running connection, it easier
/// to handle with an actor
pub struct Parrot {
    /// Client must send ping at least once per 10 seconds (CLIENT_TIMEOUT),
    /// otherwise we drop connection.
    hb: Instant,
}

fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

impl Parrot {
    pub fn new() -> Self {
        Self { hb: Instant::now() }
    }
    /// helper method that sends ping to client every second.
    ///
    /// also this method checks heartbeats from client
    fn hb(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            // check client heartbeats
            if Instant::now().duration_since(act.hb) > CLIENT_TIMEOUT {
                // heartbeat timed out
                error!("Websocket Client heartbeat failed, disconnecting!");

                // stop actor
                ctx.stop();

                // don't try to send a ping
                return;
            }

            ctx.ping(b"");
        });
    }

    /// helper method that sends new data to client every second.
    fn schedule_data(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(NEW_DATA_INTERVAL, move |_, ctx| {
            let message: String = fs::read_to_string("./data.json").expect("Unable to read file");
            let msg_to_json: Value = serde_json::from_str(&message).unwrap();
            let merged: String = utils::merge(data::get_wsj(), msg_to_json);

            ctx.text(string_to_static_str(merged));
        });
    }
}

impl Actor for Parrot {
    type Context = ws::WebsocketContext<Self>;

    /// Method is called on actor start. We start the heartbeat process here.
    fn started(&mut self, ctx: &mut Self::Context) {
        self.hb(ctx);
        self.schedule_data(ctx);
    }
}

// impl Handler<ws::Connect> for Parrot {

// }

/// Handler for `ws::Message`
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for Parrot {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        // process websocket messages
        info!("WS: {:?}", msg);
        match msg {
            Ok(ws::Message::Ping(msg)) => {
                self.hb = Instant::now();
                ctx.pong(&msg);
            }
            Ok(ws::Message::Pong(_)) => {
                self.hb = Instant::now();
            }
            Ok(ws::Message::Text(text)) => {
                ctx.text(text);
            }
            Ok(ws::Message::Close(reason)) => {
                ctx.close(reason);
                ctx.stop();
            }
            _ => ctx.stop(),
        }
    }
}