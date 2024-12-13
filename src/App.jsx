import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(undefined);

  async function getRssFeed() {
    try {
      const feedData = await invoke("fetch_rss_feed", {
        url: "https://www.omnycontent.com/d/playlist/885ace83-027a-47ad-ad67-aca7002f1df8/22b063ac-654d-428f-bd69-ae2400349cde/65ff0206-b585-4e2a-9872-ae240034c9c9/podcast.rss",
      });
      console.log("Feed Title:", feedData.title);
      setFeed(feedData);
      console.log({ feedData });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching RSS feed:", error);
    }
  }
  useEffect(() => {
    getRssFeed();
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="container">
      {feed ? (
        <div>
          <h1>{feed.title}</h1>
          <img src={feed.image} alt={feed.title} style={{height: '200px'}}/>
          <p>{feed.link}</p>
          {feed.items.length > 0 ? (
            <div>
              {feed.items.map((item, index) => (
                <div key={index}>
                  <p>{item.title}</p>
                  {/* <div dangerouslySetInnerHTML={{ __html: item.description }} /> */}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </main>
  );
}

export default App;
