import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/coverNoFound.png";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${GOOGLE_BOOKS_URL}/${id}`);
        const data = await response.json();
        if (data) {
          const info = data.volumeInfo || {};
          setBook({
            title: info.title || "No Title",
            author: info.authors ? info.authors.join(", ") : "Unknown",
            cover_img: info.imageLinks?.thumbnail || coverImg,
            publishedDate: info.publishedDate || "Unknown",
            description: info.description || "No description found.",
            publisher: info.publisher || "Unknown",
            pageCount: info.pageCount || "Unknown",
            categories: info.categories ? info.categories.join(", ") : "Unknown",
            language: info.language || "Unknown",
          });
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        setBook(null);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>
        {book ? (
          <div className='book-details-content grid'>
            <div className='book-details-img'>
              <img src={book.cover_img} alt="cover img" />
            </div>
            <div className='book-details-info'>
              <div className='book-details-item title'>
                <span className='fw-6 fs-24'>{book.title}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Author: </span>
                <span>{book.author}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Published: </span>
                <span>{book.publishedDate}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Publisher: </span>
                <span>{book.publisher}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Page Count: </span>
                <span>{book.pageCount}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Categories: </span>
                <span>{book.categories}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Language: </span>
                <span>{book.language}</span>
              </div>
              <div className='book-details-item description'>
                <span>{book.description}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>No details found for this book.</p>
        )}
      </div>
    </section>
  );
};

export default BookDetails;





// import React, {useState, useEffect} from 'react';
// import { useParams } from 'react-router-dom';
// import Loading from "../Loader/Loader";
// import coverImg from "../../images/coverNoFound.png";
// import "./BookDetails.css";
// import {FaArrowLeft} from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// const URL = "https://openlibrary.org/works/";

// const BookDetails = () => {
//   const {id} = useParams();
//   const [loading, setLoading] = useState(false);
//   const [book, setBook] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     async function getBookDetails(){
//       try{
//         const response = await fetch(`${URL}${id}.json`);
//         const data = await response.json();
//         console.log(data);

//         if(data){
//           const {description, title, covers, subject_places, subject_times, subjects} = data;
//           const newBook = {
//             description: description ? description.value : "No description found",
//             title: title,
//             cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
//             subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
//             subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
//             subjects: subjects ? subjects.join(", ") : "No subjects found"
//           };
//           setBook(newBook);
//         } else {
//           setBook(null);
//         }
//         setLoading(false);
//       } catch(error){
//         console.log(error);
//         setLoading(false);
//       }
//     }
//     getBookDetails();
//   }, [id]);

//   if(loading) return <Loading />;

//   return (
//     <section className='book-details'>
//       <div className='container'>
//         <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
//           <FaArrowLeft size = {22} />
//           <span className='fs-18 fw-6'>Go Back</span>
//         </button>

//         <div className='book-details-content grid'>
//           <div className='book-details-img'>
//             <img src = {book?.cover_img} alt = "cover img" />
//           </div>
//           <div className='book-details-info'>
//             <div className='book-details-item title'>
//               <span className='fw-6 fs-24'>{book?.title}</span>
//             </div>
//             <div className='book-details-item description'>
//               <span>{book?.description}</span>
//             </div>
//             <div className='book-details-item'>
//               <span className='fw-6'>Subject Places: </span>
//               <span className='text-italic'>{book?.subject_places}</span>
//             </div>
//             <div className='book-details-item'>
//               <span className='fw-6'>Subject Times: </span>
//               <span className='text-italic'>{book?.subject_times}</span>
//             </div>
//             <div className='book-details-item'>
//               <span className='fw-6'>Subjects: </span>
//               <span>{book?.subjects}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default BookDetails