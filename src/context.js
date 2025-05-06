import React, { useState, useContext, useEffect, useCallback } from 'react';

// const BOOKS_URL = "http://openlibrary.org/search.json?title=";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_API_KEY = "AIzaSyA95XOnZ-EKp906DjJTYLXKFj027HQx_Rg"; // YouTube API key
const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";
const GOOGLE_API_KEY = "AIzaSyBqj-6TXIvzD7K9hRjddL3sXGcuQs-CeOg"; 
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    
    // const fetchBooks = useCallback(async () => {
    //     try {
    //         const response = await fetch(`${BOOKS_URL}${searchTerm}`);
    //         const data = await response.json();
    //         const { docs } = data;

    //         if (docs) {
    //             const newBooks = docs.slice(0, 20).map((bookSingle) => {
    //                 const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;

    //                 return {
    //                     id: key,
    //                     author: author_name,
    //                     cover_id: cover_i,
    //                     edition_count: edition_count,
    //                     first_publish_year: first_publish_year,
    //                     title: title,
    //                 };
    //             });

    //             setBooks(newBooks);
    //             setResultTitle(newBooks.length > 0 ? "Your Search Results" : "No Results Found!");
    //         } else {
    //             setBooks([]);
    //             setResultTitle("No Results Found!");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching books:", error);
    //         setBooks([]);
    //         setResultTitle("No Results Found!");
    //     }
    // }, [searchTerm]);
    const fetchBooks = useCallback(async () => {
        try {
            const response = await fetch(
                `${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(searchTerm)}&maxResults=20&key=${GOOGLE_API_KEY}`
            );
            const data = await response.json();
            const { items } = data;
    
            if (items) {
                const newBooks = items.map((item) => {
                    const info = item.volumeInfo;
                    return {
                        id: item.id,
                        title: info.title || "No Title",
                        author: info.authors ? info.authors.join(", ") : "Unknown",
                        cover_img: info.imageLinks?.thumbnail || "https://via.placeholder.com/150x200?text=No+Image",
                        edition_count: info.printType || "N/A",
                        first_publish_year: info.publishedDate || "Unknown",
                        description: info.description || "", // <-- add this line here
                    };
                });
                setBooks(newBooks);
                setResultTitle(newBooks.length > 0 ? "Your Search Results" : "No Results Found!");
            } else {
                setBooks([]);
                setResultTitle("No Results Found!");
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
            setResultTitle("No Results Found!");
        }
    }, [searchTerm]);
    
 
    const fetchVideos = useCallback(async () => {
        try {
            console.log("Fetching videos for searchTerm:", searchTerm);
            const response = await fetch(
                `${YOUTUBE_URL}?part=snippet&q=${searchTerm}&type=video&key=${YOUTUBE_API_KEY}&maxResults=10`
            );
            const data = await response.json();
            console.log("YouTube API Response:", data); // Debugging
    
            if (data.items) {
                const newVideos = data.items.map((video) => {
                    const { id, snippet } = video;
                    return {
                        id: id.videoId,
                        title: snippet.title,
                        description: snippet.description,
                        thumbnail: snippet.thumbnails.high.url,
                        channelTitle: snippet.channelTitle,
                    };
                });
    
                setVideos(newVideos);
            } else {
                setVideos([]);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
            setVideos([]);
        }
    }, [searchTerm]);

    
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            await Promise.all([fetchBooks(), fetchVideos()]);
            setLoading(false);
        };
        fetchData();
    }, [searchTerm, fetchBooks, fetchVideos]);
    console.log("Videos state after fetching:", videos);
    return (
        <AppContext.Provider
            value={{
                loading,
                books,
                videos,
                setSearchTerm,
                resultTitle,
                setResultTitle,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};


export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };