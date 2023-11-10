import { useEffect, useState } from "react";

export const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  const getAllBooks = () => {
    return fetch("http://localhost:8000/books", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("readers_digest_token")).token
        }`,
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    getAllBooks().then((allBooksArray) => {
      setAllBooks(allBooksArray);
    });
  }, []);

  return (
    <div className="allBooks-container grid grid-cols-3 gap-4">
      {allBooks.map((book) => {
        return (
          <div key={book.id}>
            <img
              src={book.cover_image}
              alt="Book Cover"
              width={200}
              height={4}
            />
            <div className="mt-2 text-center italic">{book.title}</div>
          </div>
        );
      })}
    </div>
  );
};
