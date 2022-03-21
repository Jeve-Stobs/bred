// importation syntax
use scraper::{Html, Selector};

pub fn wsj_bond(url: &str, selector: &str, index: usize) -> String {
    let resp = reqwest::blocking::get(url).unwrap();
    assert!(resp.status().is_success());
    // get the body of the response
    let body = resp.text().unwrap();
    // parses string of HTML as a document
    let fragment = Html::parse_document(&body);
    // parses based on a CSS selector
    let selector = Selector::parse(selector).unwrap();
    // iterate over elements matching our selector and return their text
    let yields: Vec<String> = fragment
        .select(&selector)
        .map(|story| story.text().collect::<Vec<_>>())
        .flatten()
        .map(|text| text.to_string())
        .collect();
    yields[index].to_string().replace("%", "")
}
