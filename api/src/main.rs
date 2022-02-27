extern crate serde_json;

use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::fs;

async fn index() -> impl Responder {
    // read json file and return it
    let path = "./data.json";
    let data = fs::read_to_string(path).expect("Unable to read file");
    let res: serde_json::Value = serde_json::from_str(&data).unwrap();
    HttpResponse::Ok().json(res)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_header()
            .allow_any_origin()
            .max_age(3600);
        App::new().wrap(cors).route("/data", web::get().to(index))
    })
    .bind(("127.0.0.1", 3002))?
    .run()
    .await
}
