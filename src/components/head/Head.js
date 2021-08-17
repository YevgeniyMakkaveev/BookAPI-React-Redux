import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../store/BookSlicer";
import "./Head.scss";
import Selectors from "./selectors";
import Search from "./search";
import { searchParams, fieldParam } from "./Fields";

const Head = () => {
  const [text, setText] = useState("");
  const [field, setField] = useState("all");
  const [priority, setPriority] = useState("relevance");
  const dispatch = useDispatch();

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
      <Search onSubmit={onSubmit} text={text} setText={setText} />
      <div className="selectors">
        <Selectors
          name="field"
          value={field}
          setValue={setField}
          data={fieldParam}
        />
        <Selectors
          name="prioriy"
          value={priority}
          setValue={setPriority}
          data={searchParams}
        />
      </div>
    </div>
  );
};
export default Head;
