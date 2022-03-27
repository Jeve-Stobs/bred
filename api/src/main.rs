mod utils;
use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::{fs, fs::OpenOptions, io::Write, thread, time::Duration};
use tracing::info;
use tracing_subscriber::{filter::EnvFilter, fmt, layer::SubscriberExt, Registry};
use utils::{client, data};

fn write_to_file() -> std::io::Result<()> {
    // create a new file with the name data.json
    let mut f = OpenOptions::new()
        .write(true)
        .create(true)
        .open("data.json")?;
    // get the data from the api
    let data = data::get_data();
    // convert data to [u8]
    let data_string = serde_json::to_string(&data).unwrap();
    // write the data to the file
    f.write_all(data_string.as_bytes())?;
    Ok(())
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
        // write data to file
        write_to_file().unwrap();
        thread::sleep(Duration::from_secs(30));
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
