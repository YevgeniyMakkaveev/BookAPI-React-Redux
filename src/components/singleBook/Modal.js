import { useSelector, useDispatch } from "react-redux";
import { removeSelecedBook } from "../../store/SingleBookSlice";
import defaultImg from "../../imgs/book-template.png";
import CustomSpinner from "../spinner";
import "./Modal.scss";

const Modal = () => {
  const data = useSelector((state) => state.singleBook.data);
  const loading = useSelector((state) => state.singleBook.loading);
  const error = useSelector((state) => state.singleBook.errorMsg);
  const dispatch = useDispatch();

  const checkImg = (imgArr) => {
    if (imgArr) {
      if (imgArr.extraLarge) {
        return imgArr.extraLarge;
      } else if (imgArr.large) {
        return imgArr.large;
      } else if (imgArr.medium) {
        return imgArr.medium;
      } else {
        return defaultImg;
      }
    }
  };

  const errorStatus = error ? <p>{error}</p> : null;
  const loadingStatus = loading ? <CustomSpinner /> : null;

  const createModalText = (data) => {
    const {
      description,
      categories,
      authors,
      title,
      publisher,
      publishedDate,
      pageCount,
      imageLinks,
    } = data.volumeInfo;
    const allCategories = categories ? categories.join() : "No info";
    const allAuthors = authors ? authors.join() : "No info";
    const descText = description ? (
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="modal__desc"
      />
    ) : (
      <div className="modal__desc">Description of the book is not found.</div>
    );

    return (
      <div className="modal__body">
        <div className="modal__category">
          <p>{allCategories}</p>
        </div>
        <div className="modal__upper">
          <div className="modal__img">
            <img src={checkImg(imageLinks)} alt="cover" />
          </div>
          <div className="modal__other modal__title">
            <h2> {title}</h2>
          </div>
          <div className="modal__other">
            <ul className="modal__list">
              <li>Authors: {allAuthors} </li>
              <li>Publisher:{publisher}</li>
              <li>Published date: {publishedDate}</li>
              <li>Pages: {pageCount} </li>
            </ul>
          </div>
        </div>
        <div>{descText}</div>
      </div>
    );
  };

  if (!data && !loading && !error) return <div></div>;

  return (
    <div
      className="modal__wrapper"
      onClick={() => {
        dispatch(removeSelecedBook());
      }}
    >
      {errorStatus}
      {loadingStatus}
      {data ? createModalText(data) : null}
    </div>
  );
};
export default Modal;
