import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReviewForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [reviewObj, setReviewObj] = useState({
    bookId: bookId,
    rating: 0,
    comment: "",
  });

  const postReview = (review) => {
    return fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("readers_digest_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
  };

  const handleStateChange = (event) => {
    const reviewObjCopy = { ...reviewObj };
    reviewObjCopy[event.target.id] = event.target.value;
    setReviewObj(reviewObjCopy);
  };

  const handleSavingReview = (event) => {
    event.preventDefault();
    const reviewObjCopy = { ...reviewObj };
    reviewObjCopy.rating = parseInt(reviewObjCopy.rating);
    reviewObjCopy.bookId = parseInt(reviewObjCopy.bookId);
    postReview(reviewObjCopy).then(navigate(`/allBooks/${bookId}`));
  };

  return (
    <div>
      <div>
        <form className="form--login">
          <h1 className="text-3xl">Leave Review</h1>
          <fieldset className="mt-4">
            <label htmlFor="comment">Comment:</label>
            {"   "}
            <textarea
              id="comment"
              type="text"
              className="form-control p-5"
              rows={4}
              cols={50}
              value={reviewObj.comment}
              onChange={handleStateChange}
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="rating">Rating (1-10):</label>
            {"   "}
            <input
              id="rating"
              type="number"
              min="1"
              max="10"
              className="form-control"
              value={reviewObj.rating}
              onChange={handleStateChange}
            />
          </fieldset>
          <fieldset>
            <button
              className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4"
              onClick={handleSavingReview}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
