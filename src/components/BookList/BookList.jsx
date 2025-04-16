import React from 'react';
import { useGlobalContext } from '../../context';
import coverImg from "../../images/coverNoFound.png";
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import "./BookList.css";

const BookList = () => {
  const { books, videos, loading, resultTitle } = useGlobalContext();

  console.log("Books:", books);
  console.log("Videos:", videos);
  console.log("Loading:", loading);
  console.log("Result Title:", resultTitle);

  const booksWithCovers = Array.isArray(books)
    ? books.map((singleBook) => ({
        ...singleBook,
        // removing /works/ to get only id
        id: singleBook.id.replace("/works/", ""),
        cover_img: singleBook.cover_id
          ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
          : coverImg,
      }))
    : [];

  console.log("Books with Covers:", booksWithCovers);

  if (loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {booksWithCovers.slice(0, 30).map((item, index) => (
            <Book key={index} {...item} />
          ))}
        </div>
        <div className='video-list grid'>
          {videos.map((video, index) => (
            <div key={index} className='video-card'>
              <img src={video.thumbnail} alt={video.title} />
              <h3>{video.title}</h3>
              <p>Channel: {video.channelTitle}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='watch-btn'
              >
                Watch Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;