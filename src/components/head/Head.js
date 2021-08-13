import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../store/BookSlicer";
import "./Head.scss";

const Head = () => {
  const [text, setText] = useState("");
  const [field, setField] = useState("all");
  const [priority, setPriority] = useState("relevance");
  const dispatch = useDispatch();

  const fieldParam = [
    "all",
    "art",
    "biography",
    "computers",
    "history",
    "medical",
    "poetry",
  ];
  const searchParams = ["relevance", "newest"];
  const mapFields = (arr) =>
    arr.map((field) => (
      <option key={field} value={field}>
        {field}
      </option>
    ));

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.length > 0) {
      dispatch(
        fetchBooks({
          title: text.toLowerCase(),
          field: field,
          priority: priority,
        })
      );
      setText("");
      setField("all");
      setPriority("relevance");
    }
  };

  return (
    <div className="head">
      <a
        rel="noreferrer"
        className="head__link"
        target="_blank"
        href="https://github.com/YevgeniyMakkaveev"
      >
        made by Yevgeny Makkaveev
      </a>
      <div className="head__title">
        <h1 className="brown"> BOOK-API 2.0</h1>
      </div>
      <div className="input__wrapper">
        <form className="input__form" onSubmit={onSubmit}>
          <input
            className="input__field"
            value={text}
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="What book do you need?"
          ></input>
          <button className="btn"> SEARCH</button>
        </form>
      </div>
      <div className="selectors">
        <div className="selector__group">
          <label className="selector__title">Choose field</label>
          <select
            id="field"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            {mapFields(fieldParam)}
          </select>
        </div>
        <div className="selector__group">
          <label className="selector__title">Search priority</label>
          <select
            id="params"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {mapFields(searchParams)}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Head;
