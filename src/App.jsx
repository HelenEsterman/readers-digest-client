import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./authorization/Login";
import { Register } from "./authorization/Register";
import { Authorized } from "./authorization/Authorized";
import { Home } from "./components/Home";
import { AllBooks } from "./components/AllBooks";
import { CreateBook } from "./components/CreateBook";
import { BookWReviews } from "./components/BookWReviews";
import { ReviewForm } from "./components/ReviewForm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        <Route path="/allBooks">
          <Route index element={<AllBooks />} />
          <Route path=":bookId" element={<BookWReviews />} />
        </Route>
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/review/:bookId" element={<ReviewForm />} />
      </Route>
    </Routes>
  );
}

export default App;
