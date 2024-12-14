import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import "./landing.css";
function Landing() {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getRssFeed() {
    try {
      const feedData = await invoke("fetch_rss_feed", {
        url: "https://techcrunch.com/feed/",
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
    return () => {
      console.log("Cleanup");
    };
  }, []);

  return (
    <div>
      {!loading && feed ? (
        <div>
          <div className="feed-source-title">
            <div>
              <img
                src={feed?.image}
                alt={feed?.image.title}
                style={{ height: "32px", width: "32px" }}
              />
            </div>
            <div>
              <h2>{feed?.title}</h2>
            </div>
          </div>
          <p>{feed?.description}</p>
          <div className="feed-items">
            {feed.items.map((item) => {
              return (
                <div>
                  <h3>{item.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                  <button>read more</button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Landing;
