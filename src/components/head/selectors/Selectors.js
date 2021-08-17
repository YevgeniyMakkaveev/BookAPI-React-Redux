const Selectors = ({ name, value, setValue, data }) => {
  const mapFields = (arr) =>
    arr.map((field) => (
      <option key={field} value={field}>
        {field}
      </option>
    ));
  return (
    <div className="selector__group">
      <label className="selector__title">Choose {name}</label>
      <select
        id="field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {mapFields(data)}
      </select>
    </div>
  );
};
export default Selectors;
