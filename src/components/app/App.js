import "./App.scss";
import Head from "../head";
import BookList from "../bookList/BookList";
import Modal from "../singleBook";

function App() {
  return (
    <div className="App">
      <Head />
      <BookList />
      <Modal />
    </div>
  );
}

export default App;
