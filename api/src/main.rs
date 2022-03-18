use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::fs;
use tracing::info;
use tracing_subscriber::filter::EnvFilter;
use tracing_subscriber::{fmt, layer::SubscriberExt, Registry};

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
