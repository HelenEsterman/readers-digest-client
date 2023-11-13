import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateBook = () => {
  const [categories, setCategories] = useState([]);
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn_number: "",
    cover_image: "",
  });
  const [chosenCategories, setChosenCategories] = useState(new Set());
  const navigate = useNavigate();

  const getAllCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("readers_digest_token")).token
        }`,
      },
    }).then((res) => res.json());
  };

  const postBook = (bookObj) => {
    return fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("readers_digest_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj),
    });
  };

  useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  const handleUpdatedState = (event) => {
    const bookCopy = { ...book };
    bookCopy[event.target.id] = event.target.value;
    setBook(bookCopy);
  };

  const handleChosenCategories = (category) => {
    const chosenCategoriesCopy = new Set(chosenCategories);
    chosenCategoriesCopy.has(category.id)
      ? chosenCategoriesCopy.delete(category.id)
      : chosenCategoriesCopy.add(category.id);
    setChosenCategories(chosenCategoriesCopy);
  };

  const handleSavingBook = (event) => {
    event.preventDefault();
    postBook({ ...book, categories: Array.from(chosenCategories) }).then(
      navigate("/allBooks")
    );
  };

  return (
    <div>
      <div>
        <form className="form--login">
          <h1 className="text-3xl">Add a Book</h1>
          <fieldset className="mt-4">
            <label htmlFor="title">Title:</label>
            {"   "}
            <input
              id="title"
              type="text"
              className="form-control"
              value={book.title}
              onChange={handleUpdatedState}
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="author">Author:</label>
            {"   "}
            <input
              id="author"
              type="text"
              className="form-control"
              value={book.author}
              onChange={handleUpdatedState}
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="ISBN">ISBN Number:</label>
            {"   "}
            <input
              id="isbn_number"
              type="text"
              className="form-control"
              value={book.isbn_number}
              onChange={handleUpdatedState}
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="cover_image">Book Cover URL:</label>
            {"   "}
            <input
              id="cover_image"
              type="URL"
              className="form-control"
              value={book.cover_image}
              onChange={handleUpdatedState}
            />
          </fieldset>
          <fieldset className="mt-4">
            <label htmlFor="categories"> Categories </label>
            {categories.map((category) => {
              return (
                <div key={category.id}>
                  <label> {category.name}</label>{" "}
                  <input
                    id="categories"
                    type="checkbox"
                    className="form-control"
                    checked={chosenCategories.has(category.id)}
                    onChange={() => handleChosenCategories(category)}
                  />
                </div>
              );
            })}
          </fieldset>

          <fieldset>
            <button
              className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4"
              onClick={handleSavingBook}
            >
              Save Book
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
