#[macro_use]
extern crate dotenv_codegen;
mod utils;
use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::fs;
use std::fs::File;
use std::io::BufWriter;
use std::thread;
use std::time::Duration;
use tracing::info;
use tracing_subscriber::filter::EnvFilter;
use tracing_subscriber::{fmt, layer::SubscriberExt, Registry};
use utils::{client, data};

fn write_to_file() {
    // remove the file if it exists
    fs::remove_file("data.json").unwrap();
    // create a new file with the name data.json
    BufWriter::new(File::create("data.json").unwrap());
    // get the data from the api
    let data = data::get_data();
    // stringify the data
    let data_string = serde_json::to_string(&data).unwrap();
    // write the data to the file
    fs::write("data.json", data_string).unwrap();
}

async fn index() -> impl Responder {
    // initialize json file
    let path = "./data.json";
    // read file and parse to string
    let data = fs::read_to_string(path).expect("Unable to read file");
    // deserialize json string to struct
    let res: serde_json::Value = serde_json::from_str(&data).unwrap();
    // return json response
    HttpResponse::Ok().json(res)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    thread::spawn(move || loop {
        write_to_file();
        thread::sleep(Duration::from_secs(180));
    });
    // initialize tracing
    let subscriber = Registry::default()
        .with(EnvFilter::new("debug,tracing_actix_web2=trace"))
        .with(fmt::layer().with_target(false));
    tracing::subscriber::set_global_default(subscriber).unwrap();
    // send heartbeat msg
    info!("❤️ listening on port 3002");
    // prep http server
    HttpServer::new(|| {
        let cors = Cors::default() // <- Construct CORS middleware builder)
            .allow_any_origin()
            .max_age(3600);

        App::new()
            .wrap(tracing_actix_web2::Tracer)
            .wrap(cors)
            .route("/data", web::get().to(index))
    })
    .bind(("0.0.0.0", 3002))?
    .run()
    .await
}
