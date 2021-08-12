import { fetchSingleBooks } from "../../store/SingleBookSlice";
import { useDispatch } from "react-redux";
import defaultImg from "../../imgs/book-template.png";
import "./BookItem.scss";
const BookItem = ({ data, getLink }) => {
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
  const notTooMuch = (str, limit) => {
    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    } else return str;
  };
  const getImg = (img) => {
    if (img) {
      if (img.thumbnail) return img.thumbnail;
      else if (img.smallThumbnail) return img.smallThumbnail;
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
          <img
            className="card__img"
            src={getImg(imageLinks)}
            alt="book_cover"
          />
        </div>
        <div className="card__right">
          <p className="card__category"> {getCategory(categories)}</p>
          <h3 className="card__title">{notTooMuch(title, 60)}</h3>
          <p className="card__authors"> {getAuthor(authors)}</p>
          <p className="card__publisher">
            {publisher} {publishedDate}
          </p>
        </div>
      </div>
      <div className="description">{description} </div>
    </div>
  );
};
export default BookItem;
