import React from "react";
import "./Blogs.css";

const Blogs = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <p>No blogs found. Try searching for something else!</p>;
  }

  return (
    <div className="container">
      <h2 className="section-title">Educational Blogs</h2>
      <div className="blogs-content grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              <img
                src={
                  blog.image?.thumbnail?.contentUrl ||
                  blog.image?.contentUrl ||
                  "https://via.placeholder.com/150"
                }
                alt={blog.name || "Blog Thumbnail"}
                className="blog-thumbnail"
              />
              <h3 className="blog-title">{blog.name || "Untitled Blog"}</h3>
            </a>
            <p className="blog-author">By: {blog.provider?.[0]?.name || "Unknown"}</p>
            <p className="blog-description">
              {blog.description?.slice(0, 100) || "No description available..."}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;