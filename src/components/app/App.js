import "./App.scss";
import Head from "../head";
import BookList from "../bookList/BookList";
import Modal from "../modal";
import ErrorBoundry from "../errorBoundry";

function App() {
  return (
    <div className="App">
      <ErrorBoundry>
        <Head />
        <BookList />
        <Modal />
      </ErrorBoundry>
    </div>
  );
}

export default App;
