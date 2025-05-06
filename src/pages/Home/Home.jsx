import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Blogs from "../../components/Blogs/Blogs";
import BookList from "../../components/BookList/BookList";
import Header from "../../components/Header/Header";
import { useGlobalContext } from "../../context";
import "./Home.css";

const CURRENTS_API_KEY = "zE_H35igwt8zXa9Oq8V8y-VPVHSxWT1FagOudmHkJz9Y8fk1"; // Replace with your Currents API key

const Home = () => {
  const { books, videos, searchTerm } = useGlobalContext();
  const [filter, setFilter] = useState("books");
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Visible counts for each type
  const [visible, setVisible] = useState(3);

  // Fetch blogs from Currents API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const url = searchTerm
          ? `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(searchTerm)}&language=en`
          : `https://api.currentsapi.services/v1/latest-news?language=en&category=education`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": CURRENTS_API_KEY
          },
        });
        const data = await response.json();
        setBlogs(data.news || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
      setLoadingBlogs(false);
    };
    if (filter === "blogs") fetchBlogs();
    // eslint-disable-next-line
  }, [searchTerm, filter]);

  // Reset visible count on filter/search change
  useEffect(() => {
    setVisible(3);
  }, [filter, searchTerm]);

  const handleFilterChange = (type) => setFilter(type);

  const handleLoadMore = () => setVisible((v) => v + 3);

  // Sliced results for each type
  const booksToShow = books.slice(0, visible);
  const videosToShow = videos.slice(0, visible);
  const blogsToShow = blogs.slice(0, visible);

  return (
    <div>
      <Header />
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("books")} className={filter === "books" ? "active" : ""}>Books</button>
        <button onClick={() => handleFilterChange("videos")} className={filter === "videos" ? "active" : ""}>Videos</button>
        <button onClick={() => handleFilterChange("blogs")} className={filter === "blogs" ? "active" : ""}>Blogs</button>
      </div>
      {filter === "books" && (
        <>
          <BookList results={booksToShow} type="books" />
          {visible < books.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>Load More</button>
          )}
        </>
      )}
      {filter === "videos" && (
        <>
          <BookList results={videosToShow} type="videos" />
          {visible < videos.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>Load More</button>
          )}
        </>
      )}
      {filter === "blogs" && (
        <section className="blogs">
          {loadingBlogs ? (
            <p>Loading blogs...</p>
          ) : blogsToShow.length > 0 ? (
            <>
              <Blogs blogs={blogsToShow} />
              {visible < blogs.length && (
                <button className="load-more-btn" onClick={handleLoadMore}>Load More</button>
              )}
            </>
          ) : (
            <p>No blogs found. Try searching for something else!</p>
          )}
        </section>
      )}
      <Outlet />
    </div>
  );
};

export default Home;