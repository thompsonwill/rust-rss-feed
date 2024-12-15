import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { House, LayoutDashboard } from "lucide-react";

import { NavLink } from "react-router";

import "./landing.css";
function Landing() {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("home");

  async function getRssFeed() {
    try {
      const feedData = await invoke("fetch_rss_feed", {
        url: "https://feeds.simplecast.com/Ao0C24M8",
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
    <div className="landing-page-container">
      <div className="feed-sidebar">
        <div className="feed-menu-title">
          <p>Your Podcasts</p>
        </div>
        <NavLink to="/" end>
          <div
            className={`feed-sidebar-item ${
              active == "/" ? " active-feed-sidebar" : ""
            }`}
            onClick={() => setActive("home")}
          >
            <div className="feed-sidebar-item-img-name">
              <img
                src="https://image.simplecastcdn.com/images/00c81e60-45f9-4643-9fed-2184b2b6a3d3/9fb18d59-cb0c-4d92-ba6b-ee54eca6d2ea/3000x3000/earwolf-sxm-hdtgm.jpg?aid=rss_feed"
                style={{ height: "20px", width: "20px" }}
              />
              <p>Podcast #1</p>
            </div>
            {/* <p style={{ fontSize: "10px" }}>Latest: 12/14/24</p> */}
          </div>
        </NavLink>
        <NavLink to="/" end>
          <div
            className={`feed-sidebar-item ${
              active == "/" ? " active-feed-sidebar" : ""
            }`}
            onClick={() => setActive("home")}
          >
            <div className="feed-sidebar-item-img-name">
              <img
                src="https://image.simplecastcdn.com/images/00c81e60-45f9-4643-9fed-2184b2b6a3d3/9fb18d59-cb0c-4d92-ba6b-ee54eca6d2ea/3000x3000/earwolf-sxm-hdtgm.jpg?aid=rss_feed"
                style={{ height: "20px", width: "20px" }}
              />
              <p>Podcast #1</p>
            </div>
            {/* <p style={{ fontSize: "10px" }}>Latest: 12/14/24</p> */}
          </div>
        </NavLink>
      </div>
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
                  <p>{item.pub_date}</p>
                  {/* <div
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div> */}
                  {/* <button>read more</button> */}
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
