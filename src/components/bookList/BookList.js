import { useSelector, useDispatch } from "react-redux";
import BookItem from "../bookItem/BookItem";
import { fetchMoreBooks } from "../../store/BookSlicer";
import "./BookList.scss";
import CustomSpinner from "../spinner";

const BookList = () => {
  const dispatch = useDispatch();
  let count = 1;
  const data = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const errorStatus = useSelector((state) => state.books.errorMsg);
  const totalBooks = useSelector((state) => state.books.total);

  const counter =
    totalBooks > 0 ? (
      <p className="total__cards"> Found {totalBooks} books </p>
    ) : (
      <p> No books found </p>
    );

  const loader = loading ? (
    <div className="spinner__wrapper">
      <CustomSpinner />
    </div>
  ) : null;

  const cards = data ? (
    <>
      <div className="card__wrapper">
        {data.map((item) => (
          <BookItem
            key={count++}
            data={item ? item.volumeInfo : item}
            getLink={item.selfLink}
          />
        ))}
      </div>
      <button className="btn__more" onClick={() => dispatch(fetchMoreBooks())}>
        MORE
      </button>
    </>
  ) : null;

  const content =
    totalBooks !== null ? (
      <div className="content__wrapper">
        {counter}
        {loader}
        {cards}
      </div>
    ) : (
      <>{loader}</>
    );

  if (errorStatus) {
    return <div className="error__booklist">{errorStatus}</div>;
  }
  return <>{content}</>;
};

export default BookList;
