import { useSelector, useDispatch } from "react-redux";
import { removeSelecedBook } from "../../store/SingleBookSlice";
import CustomSpinner from "../spinner";
import CreateModalText from "./createModal";
import "./Modal.scss";

const Modal = () => {
  const data = useSelector((state) => state.singleBook.data);
  const loading = useSelector((state) => state.singleBook.loading);
  const error = useSelector((state) => state.singleBook.errorMsg);
  const dispatch = useDispatch();

  const errorStatus = error ? (
    <div className="modal__error">{error}</div>
  ) : null;
  const loadingStatus = loading ? <CustomSpinner /> : null;

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
      {data ? <CreateModalText data={data.volumeInfo} /> : null}
    </div>
  );
};
export default Modal;
