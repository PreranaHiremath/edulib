// import React from 'react';
// import "./BookList.css";
// import coverImg from "../../images/coverNoFound.png"; // Import the fallback image

// const BookList = ({ results, type }) => {
//   return (
//     <section className='booklist'>
//       <div className='container'>
//         <div className='booklist-content grid'>
//           {type === "books" &&
//             results.map((book, index) => (
//               <div key={index} className='book-card'>
//                 <div className='img-container'>
//                 <img
//                   src={book.cover_img || coverImg} // Use fallback image if cover_img is missing
//                   alt={book.title}
//                   className='book-thumbnail'
//                 />
//                 </div>
//                 <h3 className='book-title'>{book.title}</h3>
//                 <p className='book-author'>Author: {book.author}</p>
//                 <p className='book-description'>
//                   Published: {book.first_publish_year || "Unknown"}
//                 </p>
//               </div>
//             ))}
//           {type === "videos" &&
//             results.map((video, index) => (
//               <div key={index} className='video-card'>
//                 <img src={video.thumbnail} alt={video.title} className='video-thumbnail' />
//                 <h3 className='video-title'>{video.title}</h3>
//                 <p className='video-channel'>Channel: {video.channelTitle}</p>
//                 <a
//                   href={`https://www.youtube.com/watch?v=${video.id}`}
//                   target='_blank'
//                   rel='noopener noreferrer'
//                   className='watch-btn'
//                 >
//                   Watch Now
//                 </a>
//               </div>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BookList;
import React from 'react';
import Book from './Book'; // Import the Book component
import "./BookList.css";
import coverImg from "../../images/coverNoFound.png";

const BookList = ({ results, type }) => {
  return (
    <section className='booklist'>
      <div className='container'>
        <div className='booklist-content grid'>
          {type === "books" &&
            results.map((book, index) => (
              <Book key={index} {...book} /> // Use Book component here
            ))}
          {type === "videos" &&
            results.map((video, index) => (
              <div key={index} className='video-card'>
                <img src={video.thumbnail} alt={video.title} className='video-thumbnail' />
                <h3 className='video-title'>{video.title}</h3>
                <p className='video-channel'>Channel: {video.channelTitle}</p>
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



// import React from 'react';
// import "./BookList.css";

// const BookList = ({ results, type }) => {
//   return (
//     <section className='booklist'>
//       <div className='container'>
//         <div className='booklist-content grid'>
//           {type === "books" &&
//             results.map((book, index) => (
//               <div key={index} className='book-card'>
//                 <img
//                   src={book.cover_img}
//                   alt={book.title}
//                   className='book-thumbnail'
//                 />
//                 <h3 className='book-title'>{book.title}</h3>
//                 <p className='book-author'>Author: {book.author}</p>
//                 <p className='book-description'>
//                   Published: {book.first_publish_year || "Unknown"}
//                 </p>
//               </div>
//             ))}
//           {type === "videos" &&
//             results.map((video, index) => (
//               <div key={index} className='video-card'>
//                 <img src={video.thumbnail} alt={video.title} className='video-thumbnail' />
//                 <h3 className='video-title'>{video.title}</h3>
//                 <p className='video-channel'>Channel: {video.channelTitle}</p>
//                 <a
//                   href={`https://www.youtube.com/watch?v=${video.id}`}
//                   target='_blank'
//                   rel='noopener noreferrer'
//                   className='watch-btn'
//                 >
//                   Watch Now
//                 </a>
//               </div>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BookList;



// // import React from 'react';
// // import { useGlobalContext } from '../../context';
// // import coverImg from "../../images/coverNoFound.png";
// // import Book from "../BookList/Book";
// // import Loading from "../Loader/Loader";
// // import "./BookList.css";

// // const BookList = () => {
// //   const { books, videos, loading, resultTitle } = useGlobalContext();

// //   console.log("Books:", books);
// //   console.log("Videos:", videos);
// //   console.log("Loading:", loading);
// //   console.log("Result Title:", resultTitle);

// //   const booksWithCovers = Array.isArray(books)
// //     ? books.map((singleBook) => ({
// //         ...singleBook,
// //         // removing /works/ to get only id
// //         id: singleBook.id.replace("/works/", ""),
// //         cover_img: singleBook.cover_id
// //           ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
// //           : coverImg,
// //       }))
// //     : [];

// //   console.log("Books with Covers:", booksWithCovers);

// //   if (loading) return <Loading />;

// //   return (
// //     <section className='booklist'>
// //       <div className='container'>
// //         <div className='section-title'>
// //           <h2>{resultTitle}</h2>
// //         </div>
// //         <div className='booklist-content grid'>
// //           {booksWithCovers.slice(0, 30).map((item, index) => (
// //             <Book key={index} {...item} />
// //           ))}
// //         </div>
// //         <div className='video-list grid'>
// //           {videos.map((video, index) => (
// //             <div key={index} className='video-card'>
// //               <img src={video.thumbnail} alt={video.title} />
// //               <h3>{video.title}</h3>
// //               <p>Channel: {video.channelTitle}</p>
// //               <a
// //                 href={`https://www.youtube.com/watch?v=${video.id}`}
// //                 target='_blank'
// //                 rel='noopener noreferrer'
// //                 className='watch-btn'
// //               >
// //                 Watch Now
// //               </a>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default BookList;