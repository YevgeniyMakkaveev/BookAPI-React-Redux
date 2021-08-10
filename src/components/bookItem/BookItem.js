import { fetchSingleBooks } from "../../store/SingleBookSlice";
import { useDispatch } from "react-redux";
import defaultImg from "../../imgs/book-template.png";
import "./BookItem.scss";
const BookItem = ({ data, count, getLink }) => {
  const {
    title,
    description,
    authors,
    publishedDate,
    publisher,
    imageLinks,
    categories,
  } = data;
  const dispatch = useDispatch();
  const getImg = (img) => {
    if (img) {
      return img.thumbnail ? img.thumbnail : img.smallThumbnail;
    } else {
      return defaultImg;
    }
  };
  const getAuthor = (authors) => {
    if (authors) {
      return authors[0] ? authors[0] : "No authors";
    } else {
      return "No authors";
    }
  };
  const getCategory = (categories) => {
    if (categories) {
      return categories[0] ? categories[0] : "No category";
    } else {
      return "No category";
    }
  };

  return (
    <div
      className="card"
      onClick={() => {
        dispatch(fetchSingleBooks(getLink));
      }}
    >
      <div className="card__wrapper">
        <div className="card__left">
          <img src={getImg(imageLinks)} alt="book_cover" />
        </div>
        <div className="card__right">
          <p className="card__category"> {getCategory(categories)}</p>
          <h3>{title}</h3>
          <p> {getAuthor(authors)}</p>
          <p>
            {publisher} {publishedDate}
          </p>
        </div>
      </div>
      <div className="description">{description} </div>
    </div>
  );
};
export default BookItem;
