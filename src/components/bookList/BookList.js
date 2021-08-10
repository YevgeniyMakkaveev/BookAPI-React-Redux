import { useSelector } from "react-redux";
import BookItem from "../bookItem/BookItem";
import { fetchMoreBooks } from "../../store/BookSlicer";
import { useDispatch } from "react-redux";
import "./BookList.scss";
import CustomSpinner from "../spinner";

const BookList = () => {
  const dispatch = useDispatch();
  let count = 1;
  const data = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const errorStatus = useSelector((state) => state.books.errorMsg);
  if (!data && !loading) {
    return null;
  } else if (loading && !data) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="wrapper">
      <p>Тест</p>
      <div className="nest__wrapper">
        {data.map((item) => (
          <BookItem
            key={count++}
            data={item ? item.volumeInfo : item}
            count={count++}
            getLink={item.selfLink}
          />
        ))}
      </div>
      <button className="btn__more" onClick={() => dispatch(fetchMoreBooks())}>
        {" "}
        MORE
      </button>
    </div>
  );
};

export default BookList;
