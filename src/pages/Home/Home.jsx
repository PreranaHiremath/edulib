import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import BookList from "../../components/BookList/BookList";
import Blogs from "../../components/Blogs/Blogs";
import { useGlobalContext } from "../../context";
import "./Home.css";
import { Outlet } from "react-router-dom";

const RAPIDAPI_KEY = "30804642famsha60de6a9027ee00p1b8098jsndf583705f09b"; // Replace with your RapidAPI key

const Home = () => {
  const { books, videos, searchTerm } = useGlobalContext();
  const [filter, setFilter] = useState("books");
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Visible counts for each type
  const [visible, setVisible] = useState(3);

  // Fetch blogs from RapidAPI (Bing News Search)
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const url = searchTerm
          ? `https://bing-news-search1.p.rapidapi.com/news/search?q=${encodeURIComponent(
              searchTerm
            )}&count=15&mkt=en-US&safeSearch=Moderate`
          : `https://bing-news-search1.p.rapidapi.com/news?category=education&mkt=en-US&safeSearch=Moderate`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "30804642famsha60de6a9027ee00p1b8098jsndf583705f09b",
            "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
          },
        });
        const data = await response.json();
        setBlogs(data.value || []);
      } catch (error) {
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