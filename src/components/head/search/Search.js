const Search = ({ onSubmit, text, setText }) => {
  return (
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
  );
};
export default Search;
