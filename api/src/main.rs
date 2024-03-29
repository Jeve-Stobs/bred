mod utils;
use actix_cors::Cors;
use actix_web::{get, web, App, Error, HttpRequest, HttpResponse, HttpServer};
use actix_web_actors::ws;
use paris::success;
use std::{fs::{OpenOptions, File}, io::Write, thread, time::Duration};

use self::server::Parrot;
use utils::{client, data, server};

fn write_to_file() -> Result<(), Box<dyn std::error::Error>> {
    let data: String = serde_json::to_string(&data::get_fred()).unwrap();
    let mut f: File = OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open("data.json")
        .unwrap();
    f.write_all(data.as_bytes()).unwrap();
    Ok(())
}

/// WebSocket handshake and start `Parrot` actor.
#[get("/ws")]
async fn data_ws(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    let myws: Parrot = Parrot::new();
    let resp: HttpResponse = ws::start(myws, &req, stream)?;
    Ok(resp)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    thread::spawn(move || loop {
        // write data to file
        write_to_file().unwrap();
        thread::sleep(Duration::from_secs(30));
    });

    // send heartbeat msg
    success!("listening on port 3002");

    // prep http server
    HttpServer::new(|| {
        let cors = Cors::default() // <- Construct CORS middleware builder)
            .allow_any_origin()
            .max_age(3600);

        App::new().wrap(cors).service(data_ws)
    })
    .bind(("0.0.0.0", 3002))?
    .run()
    .await
}