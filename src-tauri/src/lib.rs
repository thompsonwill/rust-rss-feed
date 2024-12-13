use reqwest::Error;
use rss::Channel;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct FeedItem {
    title: Option<String>,
    link: Option<String>,
    description: Option<String>,
    pub_date: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct FeedData {
    title: String,
    image: String,
    description: Option<String>,
    link: Option<String>,
    items: Vec<FeedItem>,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn fetch_rss_feed(url: String) -> Result<FeedData, String> {
    let content = reqwest::get(&url).await.map_err(|e| e.to_string())?
        .bytes().await.map_err(|e| e.to_string())?;
    let channel = Channel::read_from(&content[..]).map_err(|e| e.to_string())?;

    let items = channel.items().iter().map(|item| {
        FeedItem {
            title: item.title().map(|s| s.to_string()),
            link: item.link().map(|s| s.to_string()),
            description: item.description().map(|s| s.to_string()),
            pub_date: item.pub_date().map(|s| s.to_string()),
        }
    }).collect();

    Ok(FeedData {
        title: channel.title().to_string(),
        image: channel.image().map_or_else(|| "".to_string(), |img| img.url().to_string()),
        description: Some(channel.description().to_string()),
        link: Some(channel.link().to_string()),
        items,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, fetch_rss_feed])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


