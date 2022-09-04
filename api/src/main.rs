mod utils;
use actix_cors::Cors;
use actix_web::{get, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use std::{fs::OpenOptions, io::Write, thread, time::Duration};
use tracing_appender::rolling::{RollingFileAppender, Rotation};
use tracing_subscriber::{filter::EnvFilter, fmt, layer::SubscriberExt, Registry};

use self::server::MyWebSocket;
use utils::{client, data, server};

fn write_to_file() -> Result<(), Box<dyn std::error::Error>> {
    let data = serde_json::to_string(&data::get_data()).unwrap();
    let mut f = OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open("data.json")
        .unwrap();
    f.write_all(data.as_bytes()).unwrap();
    Ok(())
}

/// WebSocket handshake and start `MyWebSocket` actor.
#[get("/ws")]
async fn data_ws(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let myws = MyWebSocket::new();
    let resp = ws::start(myws, &req, stream)?;
    Ok(resp)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::panic::set_hook(Box::new(|_info| {
        thread::sleep(Duration::from_secs(1));
        std::process::exit(1);
    }));

    thread::spawn(move || loop {
        // write data to file
        write_to_file().unwrap();
        thread::sleep(Duration::from_secs(30));
    });
    // inititialize tracing appender
    let file_appender = RollingFileAppender::new(Rotation::NEVER, "logs", "debug.log");
    // initilize tracing appender as non-blocking
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);
    // initialize tracing
    let subscriber = Registry::default()
        .with(EnvFilter::new("debug,tracing_actix_web2=trace"))
        .with(
            fmt::layer()
                .with_writer(non_blocking)
                .with_ansi(false)
                .with_target(false),
        );
    tracing::subscriber::set_global_default(subscriber).unwrap();
    // send heartbeat msg
    println!("❤️ listening on port 3002");
    // prep http server
    HttpServer::new(|| {
        let cors = Cors::default() // <- Construct CORS middleware builder)
            .allow_any_origin()
            .max_age(3600);

        App::new()
            .wrap(tracing_actix_web2::Tracer)
            .wrap(cors)
            .service(data_ws)
    })
    .bind(("0.0.0.0", 3002))?
    .run()
    .await
}