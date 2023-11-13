import { useParams } from "react-router-dom";

export const BookWReviews = () => {
  const { bookId } = useParams();

  return <>Book # {bookId}</>;
};
