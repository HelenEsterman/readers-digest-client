import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BookWReviews = () => {
  const [reviewsOfBook, setReviewsOfBook] = useState([]);
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  const { bookId } = useParams();

  const getAllReviewsByBookId = () => {
    return fetch(`http://localhost:8000/reviews?book=${bookId}`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("readers_digest_token")).token
        }`,
      },
    }).then((res) => res.json());
  };

  const getBook = () => {
    return fetch(`http://localhost:8000/books/${bookId}`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("readers_digest_token")).token
        }`,
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    getAllReviewsByBookId().then((reviewArray) => {
      setReviewsOfBook(reviewArray);
    });
    getBook().then((bookObj) => {
      setBook(bookObj);
    });
  }, []);

  return (
    <div>
      <div className="book_card flex flex-col">
        <div className="book_title italic text-3xl text-teal-600">
          {book.title}
        </div>
        <img
          className="book_cover_img ml-auto mr-auto"
          src={book.cover_image}
          alt="Book Cover"
          height={200}
          width={200}
        />
      </div>
      <div>
        <h1 className="reviews-header text-2xl mt-5 mb-0">Reviews</h1>
        {reviewsOfBook.map((reviewObj) => {
          return (
            <div
              key={reviewObj.id}
              className="review_box border border-green-300 mb-10 mr-10 ml-10 mt-3"
            >
              {reviewObj.user.first_name} {reviewObj.user.last_name}:{" "}
              <div className="review-comment text-teal-600 italic">
                {reviewObj.comment}
              </div>{" "}
              {reviewObj.rating}/10
            </div>
          );
        })}
        <button
          className="review_btn bg-teal-600 border border-teal-600 rounded-md text-black p-2"
          onClick={() => navigate(`/review/${bookId}`)}
        >
          Leave Review
        </button>
      </div>
    </div>
  );
};
