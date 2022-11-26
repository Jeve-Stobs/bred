use serde_json::Value;

pub mod client;
pub mod data;
pub mod fetcher;
pub mod server;
pub mod structs;

fn merge(a: Value, b: Value) -> String {
    let mut merged = a.clone();
    merged
        .as_object_mut()
        .unwrap()
        .extend(b.as_object().unwrap().clone());
    serde_json::to_string(&merged).unwrap()
}
