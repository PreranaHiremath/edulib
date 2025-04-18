import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { useGlobalContext } from '../../context';
import BookList from '../../components/BookList/BookList';
import { Outlet } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { books, videos } = useGlobalContext();
  const [filter, setFilter] = useState("books"); // Default filter is books
  const [visibleCount, setVisibleCount] = useState(3); // Number of results to show initially

  const handleFilterChange = (type) => {
    setFilter(type);
    setVisibleCount(3); // Reset visible count when filter changes
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Increment visible count by 3
  };

  const filteredResults = filter === "books" ? books.slice(0, visibleCount) : videos.slice(0, visibleCount);

  return (
    <div>
      <h1>Welcome to the EduHub</h1>
      <Header />
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("books")} className={filter === "books" ? "active" : ""}>
          Books
        </button>
        <button onClick={() => handleFilterChange("videos")} className={filter === "videos" ? "active" : ""}>
          Videos
        </button>
      </div>
      <BookList results={filteredResults} type={filter} />
      {filteredResults.length < (filter === "books" ? books.length : videos.length) && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      <Outlet/>
    </div>
  );
};

export default Home;




// import React from 'react';
// import Header from '../../components/Header/Header';
// import { Outlet } from 'react-router-dom';
// import './Home.css';

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to the educational library</h1>
//       <Header/>
//       <Outlet />
      
//     </div>
//   );
// };



// export default Home