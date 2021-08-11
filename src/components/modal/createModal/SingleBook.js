import defaultImg from "../../../imgs/book-template.png";
import "./SingleBook.scss";
const CreateModalText = ({ data }) => {
  const {
    description,
    categories,
    authors,
    title,
    publisher,
    publishedDate,
    pageCount,
    imageLinks,
  } = data;
  const checkImg = (imgArr) => {
    if (imgArr) {
      if (imgArr.thumbnail) {
        return imgArr.thumbnail;
      } else {
        return defaultImg;
      }
    }
  };

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
        <div className="img__wrapper">
          <img className="modal__img" src={checkImg(imageLinks)} alt="cover" />
        </div>
        <div className="modal__other ">
          <h2 className="modal__title"> {title}</h2>
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
export default CreateModalText;
